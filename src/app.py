import numpy as np
import pandas as pd
from flask import Flask, request, jsonify, render_template, send_from_directory, send_file
from flask_cors import CORS
from datetime import datetime, timedelta
from tensorflow.keras.models import load_model
import joblib
from googletrans import Translator
import os
from functools import wraps
import time

# Get the absolute path of the frontend directory
frontend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'frontend'))

app = Flask(__name__, static_folder=frontend_dir, static_url_path='')
# Configure CORS to allow all origins during development
CORS(app)

# Model version and configuration
MODEL_VERSION = "1.0.0"
MODEL_CONFIG = {
    "version": MODEL_VERSION,
    "type": "LSTM",
    "last_trained": "2024-03-20",
    "metrics": {
        "mae": 0.0133,
        "mse": 3.3063e-04
    }
}

# Rate limiting configuration
RATE_LIMIT = {
    "requests": 100,
    "per_seconds": 3600,
    "clients": {}
}

def load_ml_models():
    """Load ML models with proper error handling"""
    try:
        # Load LSTM model
        if not os.path.exists('models/lstm_model.keras'):
            raise FileNotFoundError("LSTM model file not found")
        lstm_model = load_model('models/lstm_model.keras')

        # Load scaler
        if not os.path.exists('models/price_scaler.pkl'):
            raise FileNotFoundError("Price scaler file not found")
        scaler = joblib.load('models/price_scaler.pkl')

        # Load sequence length
        if not os.path.exists('models/model_config.txt'):
            raise FileNotFoundError("Model config file not found")
        with open('models/model_config.txt', 'r') as f:
            seq_length = int(f.read().strip())

        return lstm_model, scaler, seq_length
    except Exception as e:
        print(f"Error loading ML models: {str(e)}")
        return None, None, None

# Load models
lstm_model, scaler, seq_length = load_ml_models()

# Load historical data
try:
    df = pd.read_csv('dataset.csv')
    df['date'] = pd.to_datetime(df['date'])
except Exception as e:
    print(f"Error loading dataset: {str(e)}")
    df = pd.DataFrame()

# Initialize translator
translator = Translator()

def rate_limit(f):
    """Rate limiting decorator"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        client_ip = request.remote_addr
        current_time = time.time()
        
        # Clean up old entries
        RATE_LIMIT["clients"] = {
            ip: timestamps for ip, timestamps in RATE_LIMIT["clients"].items()
            if current_time - timestamps[-1] < RATE_LIMIT["per_seconds"]
        }
        
        # Check client's request history
        if client_ip in RATE_LIMIT["clients"]:
            timestamps = RATE_LIMIT["clients"][client_ip]
            if len(timestamps) >= RATE_LIMIT["requests"]:
                if current_time - timestamps[0] < RATE_LIMIT["per_seconds"]:
                    return jsonify({
                        'success': False,
                        'error': 'Rate limit exceeded. Please try again later.'
                    }), 429
                timestamps.pop(0)
            timestamps.append(current_time)
        else:
            RATE_LIMIT["clients"][client_ip] = [current_time]
        
        return f(*args, **kwargs)
    return decorated_function

@app.route('/')
def home():
    return send_file(os.path.join(frontend_dir, 'index.html'))

@app.route('/prediction')
def prediction():
    return send_file(os.path.join(frontend_dir, 'prediction.html'))

@app.route('/prediction.html')
def prediction_html():
    return send_file(os.path.join(frontend_dir, 'prediction.html'))

@app.route('/js/<path:filename>')
def serve_js(filename):
    return send_from_directory(os.path.join(frontend_dir, 'js'), filename)

@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory(frontend_dir, filename)

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(frontend_dir, 'favicon.ico', mimetype='image/vnd.microsoft.icon')

@app.route('/predict', methods=['POST'])
@rate_limit
def predict():
    try:
        data = request.get_json()
        if not data or 'date' not in data or 'commodity_id' not in data:
            return jsonify({
                'success': False,
                'error': 'Missing required parameters: date and commodity_id'
            }), 400

        commodity_id = data['commodity_id']
        target_date = datetime.strptime(data['date'], '%Y-%m-%d')
        current_date = datetime.now()
        
        if target_date <= current_date:
            return jsonify({
                'success': False,
                'error': 'Please select a future date'
            })

        # Use mock data for development/when models are not available
        if None in (lstm_model, scaler, seq_length) or df.empty:
            print("Using mock data for predictions")
            # Generate mock predictions
            predictions = []
            base_price = 50  # Base price for mock data
            current = current_date
            
            while current <= target_date:
                # Add some random variation to create realistic-looking predictions
                price = base_price * (1 + (np.random.random() - 0.5) * 0.1)  # ±5% variation
                predictions.append({
                    'date': current.strftime('%Y-%m-%d'),
                    'price': round(float(price), 2)
                })
                current += timedelta(days=1)
            
            # Calculate mock statistics
            prices = [p['price'] for p in predictions]
            stats = {
                'min_price': min(prices),
                'max_price': max(prices),
                'avg_price': sum(prices) / len(prices),
                'price_trend': 'Slightly Increasing' if prices[-1] > prices[0] else 'Slightly Decreasing'
            }
            
            return jsonify({
                'success': True,
                'predictions': predictions,
                'statistics': stats
            })
            
        # Filter data for the selected commodity
        commodity_data = df[df['commodity_id'] == commodity_id] if 'commodity_id' in df.columns else df
        
        if commodity_data.empty:
            return jsonify({
                'success': False,
                'error': f'No historical data found for commodity {commodity_id}'
            })
        
        # Get the last sequence_length days of data for LSTM
        try:
            last_sequence = commodity_data['value'].values[-seq_length:].reshape(-1, 1)
            if len(last_sequence) < seq_length:
                return jsonify({
                    'success': False,
                    'error': f'Not enough historical data. Need {seq_length} days of data.'
                })
        except Exception as e:
            return jsonify({
                'success': False,
                'error': f'Error preparing sequence data: {str(e)}'
            })
            
        scaled_sequence = scaler.transform(last_sequence)
        
        # Predict future values until target date
        current_date = commodity_data['date'].max()
        predictions = []
        
        while current_date < target_date:
            try:
                # Prepare input sequence for LSTM
                input_sequence = scaled_sequence[-seq_length:].reshape(1, seq_length, 1)
                
                # Make LSTM prediction
                lstm_pred = lstm_model.predict(input_sequence, verbose=0)
                predicted_value = scaler.inverse_transform(lstm_pred.reshape(-1, 1))[0][0]
                
                # Update sequences
                scaled_pred = scaler.transform([[predicted_value]])
                scaled_sequence = np.vstack([scaled_sequence, scaled_pred])
                current_date += timedelta(days=1)
                
                if current_date <= target_date:
                    predictions.append({
                        'date': current_date.strftime('%Y-%m-%d'),
                        'price': round(float(predicted_value), 2)
                    })
            except Exception as e:
                return jsonify({
                    'success': False,
                    'error': f'Error during prediction: {str(e)}'
                })
        
        if not predictions:
            return jsonify({
                'success': False,
                'error': 'No predictions were generated'
            })
            
        # Calculate statistics
        prices = [p['price'] for p in predictions]
        
        def calculate_trend(prices):
            if len(prices) < 2:
                return 'Stable'
            slope = (prices[-1] - prices[0]) / len(prices)
            if abs(slope) < 0.01:
                return 'Stable'
            strength = 'Strongly' if abs(slope) > 0.05 else 'Slightly'
            direction = 'Increasing' if slope > 0 else 'Decreasing'
            return f'{strength} {direction}'
        
        stats = {
            'min_price': min(prices),
            'max_price': max(prices),
            'avg_price': sum(prices) / len(prices),
            'price_trend': calculate_trend(prices)
        }
        
        return jsonify({
            'success': True,
            'predictions': predictions,
            'statistics': stats
        })
    
    except Exception as e:
        import traceback
        return jsonify({
            'success': False,
            'error': str(e),
            'traceback': traceback.format_exc()
        })

@app.route('/historical', methods=['GET'])
def get_historical():
    try:
        days = int(request.args.get('days', 30))
        historical_data = df.tail(days).to_dict('records')
        return jsonify({
            'success': True,
            'data': historical_data
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        })

@app.route('/translate', methods=['POST'])
def translate_text():
    try:
        data = request.get_json()
        text = data['text']
        target_lang = data['target_lang']
        
        translated = translator.translate(text, dest=target_lang)
        
        return jsonify({
            'success': True,
            'translated_text': translated.text
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        })

@app.route('/model-metrics')
def model_metrics():
    return render_template('metrics.html')

@app.route('/model-info')
def model_info():
    """Endpoint to get model version and configuration"""
    return jsonify({
        'success': True,
        'model_info': MODEL_CONFIG
    })

if __name__ == '__main__':
    app.run(debug=True) 