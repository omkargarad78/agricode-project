import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import train_test_split
from tensorflow.keras.models import Sequential, save_model
from tensorflow.keras.layers import LSTM, Dense, Dropout
from tensorflow.keras.callbacks import EarlyStopping
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime
import joblib
from statsmodels.tsa.arima.model import ARIMA
from statsmodels.tsa.stattools import adfuller

def load_and_preprocess_data(file_path):
    # Load data
    df = pd.read_csv(file_path)
    df['date'] = pd.to_datetime(df['date'])
    df = df.sort_values('date')
    
    # Create sequences for LSTM
    def create_sequences(data, seq_length):
        X, y = [], []
        values = data['value'].values
        for i in range(len(values) - seq_length):
            X.append(values[i:(i + seq_length)])
            y.append(values[i + seq_length])
        return np.array(X), np.array(y)
    
    # Scale data
    scaler = MinMaxScaler(feature_range=(0, 1))
    scaled_values = scaler.fit_transform(df['value'].values.reshape(-1, 1))
    
    # Create sequences for LSTM
    seq_length = 60
    X, y = create_sequences(pd.DataFrame({'value': scaled_values.flatten()}), seq_length)
    
    # Split data for LSTM
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, shuffle=False)
    
    # Prepare data for ARIMA
    train_size = int(len(df) * 0.8)
    train_data = df['value'][:train_size]
    test_data = df['value'][train_size:]
    
    return X_train, X_test, y_train, y_test, scaler, seq_length, train_data, test_data

def create_lstm_model(seq_length):
    model = Sequential([
        LSTM(100, activation='relu', input_shape=(seq_length, 1), return_sequences=True),
        Dropout(0.2),
        LSTM(100, activation='relu'),
        Dropout(0.2),
        Dense(50, activation='relu'),
        Dense(1)
    ])
    model.compile(optimizer='adam', loss='mse', metrics=['mae'])
    return model

def train_arima_model(train_data):
    # Simple ARIMA model with fixed parameters
    model = ARIMA(train_data, order=(1, 1, 1))
    arima_model = model.fit()
    return arima_model

def plot_metrics(history, save_path):
    plt.figure(figsize=(12, 4))
    
    # Plot loss
    plt.subplot(1, 2, 1)
    plt.plot(history.history['loss'], label='Training Loss')
    plt.plot(history.history['val_loss'], label='Validation Loss')
    plt.title('Model Loss')
    plt.xlabel('Epoch')
    plt.ylabel('Loss')
    plt.legend()
    
    # Plot MAE
    plt.subplot(1, 2, 2)
    plt.plot(history.history['mae'], label='Training MAE')
    plt.plot(history.history['val_mae'], label='Validation MAE')
    plt.title('Model MAE')
    plt.xlabel('Epoch')
    plt.ylabel('MAE')
    plt.legend()
    
    plt.tight_layout()
    plt.savefig(save_path)
    plt.close()

def evaluate_predictions(lstm_model, arima_model, X_test, y_test, scaler, test_data, save_path):
    # LSTM predictions
    lstm_pred = lstm_model.predict(X_test)
    lstm_pred = scaler.inverse_transform(lstm_pred)
    y_test_inv = scaler.inverse_transform(y_test.reshape(-1, 1))
    
    # ARIMA predictions
    arima_pred = arima_model.forecast(len(y_test))
    arima_pred = arima_pred.values.reshape(-1, 1)
    
    # Ensure both predictions have the same length
    min_len = min(len(lstm_pred), len(arima_pred))
    lstm_pred = lstm_pred[:min_len]
    arima_pred = arima_pred[:min_len]
    y_test_inv = y_test_inv[:min_len]
    
    # Combine predictions (simple average)
    combined_pred = (lstm_pred + arima_pred) / 2
    
    # Calculate metrics for combined predictions
    mse = np.mean((y_test_inv - combined_pred) ** 2)
    rmse = np.sqrt(mse)
    mae = np.mean(np.abs(y_test_inv - combined_pred))
    mape = np.mean(np.abs((y_test_inv - combined_pred) / y_test_inv)) * 100
    
    # Plot actual vs predicted
    plt.figure(figsize=(12, 6))
    plt.plot(y_test_inv, label='Actual')
    plt.plot(lstm_pred, label='LSTM Predictions', alpha=0.7)
    plt.plot(arima_pred, label='ARIMA Predictions', alpha=0.7)
    plt.plot(combined_pred, label='Combined Predictions', linewidth=2)
    plt.title('Actual vs Predicted Onion Prices')
    plt.xlabel('Time')
    plt.ylabel('Price (₹/kg)')
    plt.legend()
    plt.savefig(save_path)
    plt.close()
    
    return {
        'MSE': mse,
        'RMSE': rmse,
        'MAE': mae,
        'MAPE': mape
    }

def train():
    # Load and preprocess data
    X_train, X_test, y_train, y_test, scaler, seq_length, train_data, test_data = load_and_preprocess_data('dataset.csv')
    
    # Train LSTM model
    print("Training LSTM model...")
    X_train = X_train.reshape((X_train.shape[0], X_train.shape[1], 1))
    X_test = X_test.reshape((X_test.shape[0], X_test.shape[1], 1))
    
    lstm_model = create_lstm_model(seq_length)
    early_stopping = EarlyStopping(monitor='val_loss', patience=10, restore_best_weights=True)
    
    history = lstm_model.fit(
        X_train, y_train,
        epochs=10,
        batch_size=32,
        validation_split=0.2,
        callbacks=[early_stopping],
        verbose=1
    )
    
    # Train ARIMA model
    print("\nTraining ARIMA model...")
    arima_model = train_arima_model(train_data)
    
    # Plot training metrics
    plot_metrics(history, 'static/training_metrics.png')
    
    # Evaluate models
    print("\nEvaluating models...")
    metrics = evaluate_predictions(lstm_model, arima_model, X_test, y_test, scaler, test_data, 'static/prediction_comparison.png')
    
    # Save models and parameters
    save_model(lstm_model, 'models/lstm_model.keras')
    joblib.dump(scaler, 'models/price_scaler.pkl')
    joblib.dump(arima_model, 'models/arima_model.pkl')
    
    # Save sequence length
    with open('models/model_config.txt', 'w') as f:
        f.write(str(seq_length))
    
    return metrics

if __name__ == '__main__':
    metrics = train()
    print("\nModel Evaluation Metrics:")
    for metric, value in metrics.items():
        print(f"{metric}: {value:.2f}") 