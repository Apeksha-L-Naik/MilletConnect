import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Upload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSearchMode, setIsSearchMode] = useState(false);

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
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  // Handle image upload
  const handleUploadClick = () => {
    if (selectedImage) {
      alert("Image uploaded successfully!");
      // Replace this with actual upload logic (e.g., API call)
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
            <img src={selectedImage} alt="Selected" className="w-80 h-80 object-cover mb-4" />
          )}

          {/* Upload button */}
          <button
            onClick={handleUploadClick}
            className="bg-[#a16207] text-white rounded-full px-6 py-2 font-bold text-sm hover:bg-[#d98f0c] transition-colors"
          >
            Upload Image
          </button>
        </div>
      )}
    </div>
  );
};

export default Upload;
