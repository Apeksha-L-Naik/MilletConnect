import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';

const Upload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  // Get the query parameter from the URL to determine the mode
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const mode = params.get("mode");

    // Set the mode based on the query parameter
    if (mode === "search") {
      setIsSearchMode(true);
    } else {
      setIsSearchMode(false);
    }
  }, [location]);

  // Handle image selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file); // Save the file directly, not URL.createObjectURL(file)
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

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    alert(`Searching for: ${e.target.searchTerm.value}`);
    // You can replace this with actual search logic (e.g., API call)
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-4xl font-bold text-[#a16207] mb-8">
        {isSearchMode ? "Search for Millet Information" : "Upload Your Millet Image"}
      </h1>

      {isSearchMode ? (
        // Search Form
        <form onSubmit={handleSearchSubmit} className="flex flex-col items-center">
          <input
            type="text"
            name="searchTerm"
            placeholder="Enter search term"
            className="border-2 border-[#a16207] p-2 mb-4 rounded"
          />
          <button
            type="submit"
            className="bg-[#a16207] text-white rounded-full px-6 py-2 font-bold text-sm hover:bg-[#d98f0c] transition-colors"
          >
            Search
          </button>
        </form>
      ) : (
        // Image Upload Form
        <div className="flex flex-col items-center gap-4">
          {/* Image upload input */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-4"
          />

          {/* Display selected image */}
          {selectedImage && (
            <img src={URL.createObjectURL(selectedImage)} alt="Selected" className="w-80 h-80 object-cover mb-4" />
          )}

          {/* Upload button */}
          <button
            onClick={handleUploadClick}
            className="bg-[#a16207] text-white rounded-full px-6 py-2 font-bold text-sm hover:bg-[#d98f0c] transition-colors"
          >
            {loading ? "Uploading..." : "Upload Image"}
          </button>

          {/* Display prediction result */}
          {prediction && !loading && (
            <div className="mt-6">
              <h2 className="text-2xl font-semibold text-[#a16207]">{prediction.millet_type}</h2>
              <p><strong>Description:</strong> {prediction.description}</p>
              <p><strong>Health Benefits:</strong> {prediction.health_benefits}</p>
              <p><strong>Protein:</strong> {prediction.Protein} g per 100g</p>
              <p><strong>Fats:</strong> {prediction.Fats} g per 100g</p>
              <p><strong>Dietary Fiber:</strong> {prediction.Dietary_Fiber} g per 100g</p>
              <p><strong>Minerals:</strong> {prediction.Minerals}</p>
              <p><strong>Carbohydrates:</strong> {prediction.Carbohydrates} g per 100g</p>

              {prediction.image && (
                <div>
                  <h3>Millet Image:</h3>
                  <img src={`data:image/png;base64,${prediction.image}`} alt="Millet" className="w-80 h-80 object-cover" />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Upload;


