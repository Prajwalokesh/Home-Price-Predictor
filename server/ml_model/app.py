import pickle
import numpy as np
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS

# Initialize app
app = Flask(__name__)
CORS(app, supports_credentials=True, origins=['http://localhost:5173'])

# Load model and label encoder
model = pickle.load(open('mlmodel.pkl', 'rb'))
location_encoder = pickle.load(open('location_label_encoder.pkl', 'rb'))

# Load location data and create case-insensitive lookup
data = pd.read_csv('Bengaluru_House_Data.csv')
locations_original = data['location'].dropna().unique()
location_lookup = {loc.lower(): loc for loc in locations_original}  # e.g., "whitefield" -> "Whitefield"

@app.route('/')
def home():
    return 'Flask ML API is running!'

@app.route('/predict', methods=['POST'])
def predict():
    data_in = request.get_json()
    print("Flask received:", data_in)

    try:
        location_input = data_in['location'].strip().lower()  # normalize input
        size = int(data_in['size'])
        sqft = float(data_in['sqft'])
        bath = int(data_in['bath'])
        balcony = int(data_in['balcony'])

        # Check and convert location to original case
        if location_input not in location_lookup:
            return jsonify({'error': f"Invalid location: '{data_in['location']}'"}), 400

        location_actual = location_lookup[location_input]
        location_encoded = location_encoder.transform([location_actual])[0]

        features = np.array([[location_encoded, size, sqft, bath, balcony]])
        predicted_price = model.predict(features)[0]

        return jsonify({'prediction': predicted_price})

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)
