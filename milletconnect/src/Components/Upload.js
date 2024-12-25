import React, { useState } from "react";

import axios from 'axios';

const Upload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  

  // Handle image selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file); // Save the file directly, not URL.createObjectURL(file)
    }
  };
// Handle drag over event
const handleDragOver = (event) => {
  event.preventDefault();
  event.stopPropagation();
  event.target.classList.add("drag-over");
};

// Handle drag leave event
const handleDragLeave = (event) => {
  event.preventDefault();
  event.stopPropagation();
  event.target.classList.remove("drag-over");
};

// Handle drop event
const handleDrop = (event) => {
  event.preventDefault();
  event.stopPropagation();
  event.target.classList.remove("drag-over");

  const file = event.dataTransfer.files[0];
  if (file) {
    setSelectedImage(file); // Save the dropped file
  }
};
  // Handle image upload
  const handleUploadClick = async () => {
    if (selectedImage) {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", selectedImage);  // Send the actual file object

      try {
        const response = await axios.post("http://localhost:5000/predict", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // Handle response from Flask backend
        setPrediction(response.data);
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Error uploading image.");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please select an image to upload.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6  bg-[url('https://i.pinimg.com/736x/4e/ef/4a/4eef4a44c8743163fb44673ac3b90f78.jpg')] bg-cover bg-center">
      <h1 className="font-playfair text-4xl font-bold text-[#a16207] mb-8 text-shadow-md animate-fade-in">
      🌾 Upload Your Millet Image 🌾
      </h1>

      <div className="flex flex-col items-center gap-6 p-8 bg-white rounded-xl shadow-2xl w-full max-w-xl">
        <div className="text-center mb-4">
          <p className="text-xl text-[#a16207]">Select or drag an image to upload and get millet details!</p>
        </div>
         {/* Drag-and-drop area */}
         <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className="w-full h-64 bg-[#f4f4f4] border-2 border-dashed border-[#a16207] rounded-lg flex justify-center items-center cursor-pointer transition-all duration-300 hover:bg-[#e8e8e8]"
        >
          <p className="text-[#a16207] font-semibold">Drag & Drop Your Image Here</p>
        </div>

        {/* Custom file input */}
        <label
          htmlFor="file-upload"
          className="cursor-pointer bg-[#a16207] text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-[#d98f0c] transition-colors transform hover:scale-105"
        >
         Or Choose Image
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />

        {/* Display selected image */}
        {selectedImage && (
          <div className="mt-4">
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected"
              className="w-80 h-80 object-cover rounded-lg shadow-xl transform transition duration-500 hover:scale-105"
            />
          </div>
        )}

        {/* Upload button */}
        <button
          onClick={handleUploadClick}
          className="mt-6 bg-[#a16207] text-white rounded-full px-8 py-3 font-bold text-lg hover:bg-[#d98f0c] transition-colors w-full"
        >
          {loading ? "Uploading..." : "Upload Image"}
        </button>

        {/* Display prediction result */}
        {prediction && !loading && (
          <div className="mt-8 bg-[#f2f2f2] p-6 rounded-lg shadow-lg w-full">
            <h2 className="text-2xl font-semibold text-[#a16207]">{prediction.millet_type}</h2>
            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <p>
                <strong>Description:</strong> {prediction.description}
              </p>
              <p>
                <strong>Health Benefits:</strong> {prediction.health_benefits}
              </p>
              <p>
                <strong>Protein:</strong> {prediction.Protein} g per 100g
              </p>
              <p>
                <strong>Fats:</strong> {prediction.Fats} g per 100g
              </p>
              <p>
                <strong>Dietary Fiber:</strong> {prediction.Dietary_Fiber} g per 100g
              </p>
              <p>
                <strong>Minerals:</strong> {prediction.Minerals}
              </p>
              <p>
                <strong>Carbohydrates:</strong> {prediction.Carbohydrates} g per 100g
              </p>
            </div>

            {prediction.image && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-[#a16207]">Millet Image:</h3>
                <img
                  src={`data:image/png;base64,${prediction.image}`}
                  alt="Millet"
                  className="w-80 h-80 object-cover rounded-lg shadow-md"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;

  