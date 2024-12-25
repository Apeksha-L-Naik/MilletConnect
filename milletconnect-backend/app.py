from flask import Flask, request, jsonify, render_template
from flask_mysqldb import MySQL
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array
from PIL import Image
import numpy as np
import base64
import os

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Database Configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'kshama123'  # Replace with your MySQL password
app.config['MYSQL_DB'] = 'MILLET_CONNECT'

mysql = MySQL(app)

# Load the Pre-trained Model
model_path = r"C:\Users\Kshama\Downloads\millet_classifier_model.keras"
if not os.path.exists(model_path):
    raise FileNotFoundError(f"Model file not found at {model_path}")
model = load_model(model_path)

# Class Names Mapping
class_names = {
    0: 'Barnyard Millet',
    1: 'Browntop Millet',
    2: 'Finger Millet',
    3: 'Foxtail Millet',
    4: 'Kodo Millet',
    5: 'Little Millet',
    6: 'Pearl Millet',
    7: 'Proso Millet',
    8: 'Sorgham Millet'
}

@app.route('/')
def home():
    return render_template('index.html')  # Only needed if serving HTML directly

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Check if Image is Uploaded
        if 'image' not in request.files:
            return jsonify({'error': 'No image file uploaded.'}), 400

        file = request.files['image']
        if not file:
            return jsonify({'error': 'Invalid file.'}), 400

        # Preprocess the Image
        image = Image.open(file).resize((224, 224))  # Adjust size for your model
        image = img_to_array(image) / 255.0
        image = np.expand_dims(image, axis=0)

        # Make Prediction
        prediction = model.predict(image)
        predicted_class_index = np.argmax(prediction, axis=1)[0]

        # Map Predicted Index to Millet Type
        predicted_class_name = class_names.get(predicted_class_index, 'Unknown')
        if predicted_class_name == 'Unknown':
            return jsonify({'error': 'Could not classify the image.'}), 500

        # Query the Database for Details
        cursor = mysql.connection.cursor()
        query = """
            SELECT M.id, M.millet_type, 
                   M.description, M.health_benefits, 
                   M.protein_g_per_100g, M.fats_g_per_100g, 
                   M.dietary_fiber, M.minerals, M.carbohydrate_g_per_100g,
                   MI.image
            FROM Millets M
            LEFT JOIN Millets_image MI ON M.id = MI.millet_id
            WHERE M.millet_type = %s
        """
        cursor.execute(query, (predicted_class_name,))
        result = cursor.fetchone()

        if result:
            millet_id, millet_type, description, health_benefits, protein, fats, fiber, minerals, carbs, image_data = result
            
            # Convert image data to base64
            if image_data:
                image_base64 = base64.b64encode(image_data).decode('utf-8')
            else:
                image_base64 = None  # No image available for this millet
            
            response = {
                'millet_type': millet_type,
                'description': description,
                'health_benefits': health_benefits,
                'Protein': protein,
                'Fats': fats,
                'Dietary_Fiber': fiber,
                'Minerals': minerals,
                'Carbohydrates': carbs,
                'image': image_base64
            }
            return jsonify(response)
        else:
            return jsonify({'error': 'Millet information not found.'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)

