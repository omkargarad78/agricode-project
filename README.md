# Onion Price Prediction Web Application

This web application predicts future onion prices using LSTM (Long Short-Term Memory) machine learning model based on historical price data. The application features a user-friendly interface with multi-language support (English, Hindi, and Marathi).

## Features

- LSTM-based price prediction model
- Interactive web interface
- Multi-language support (English, Hindi, Marathi)
- Date-based price predictions
- Responsive design
- Beautiful UI with hover effects

## Prerequisites

- Python 3.8 or higher
- Virtual Environment (recommended)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/omkargarad78/agricode-project.git
cd agricode-project
```

2. Create and activate a virtual environment:

```bash
python -m venv .venv
# On Windows
.venv\Scripts\activate
# On Unix or MacOS
source .venv/bin/activate
```

3. Install the required packages:

```bash
pip install -r requirements.txt
```

## Usage

1. Make sure your virtual environment is activated

2. Run the Flask application:

```bash
python app.py
```

3. Open your web browser and navigate to:

```
http://localhost:5000
```

4. Select a future date and click "Predict Price" to see the predicted onion prices

## Project Structure

- `app.py` - Main Flask application with LSTM model implementation
- `dataset.csv` - Historical onion price data
- `templates/index.html` - Frontend web interface
- `requirements.txt` - Python package dependencies

## Model Details

The application uses an LSTM (Long Short-Term Memory) neural network to predict future onion prices. The model:

- Uses 60 days of historical data to predict future prices
- Is trained on daily price data
- Updates predictions in real-time
- Normalizes data for better prediction accuracy

## Translation Support

The application supports three languages:

- English (default)
- Hindi
- Marathi

Users can switch between languages using the language selector in the top-right corner of the page.
