
import React from "react";
import { useNavigate } from "react-router-dom";

const Disease = () => {
    const navigate = useNavigate();

    const handleDiseaseInfoClick = () => {
        navigate("/info"); // Navigate to the /upload route
      };
    
      const handleExploreNowClick = () => {
        navigate("/disearch"); // Navigate to the /upload route
      };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-yellow-50 via-green-100 to-yellow-50 p-8">
      {/* Title Section */}
      <h1 className="font-playfair text-4xl md:text-5xl font-bold text-[#226c3e] text-center mb-10">
        🌾 Millets for Disease Cure 🌾
      </h1>

      {/* Cards Container */}
      <div className="flex flex-wrap justify-center gap-12">
        {/* Card 1: Disease Information */}
        <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-6 text-center transform transition-transform hover:scale-105 hover:shadow-2xl relative border-l-8 border-[#226c3e]">
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-[#fef9c3] p-4 rounded-full shadow-lg">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2913/2913465.png"
              alt="Disease Info"
              className="w-16 h-16"
              onClick={handleDiseaseInfoClick}
            />
          </div>
          <h2 className="text-2xl font-extrabold text-[#226c3e] mt-12 mb-4">
            Disease Information
          </h2>
          <button
            onClick={handleDiseaseInfoClick}
            className="bg-[#226c3e] text-white rounded-full px-6 py-3 font-bold text-lg hover:bg-[#1a5031] transition-colors"
          >
            Disease Info
          </button>
        </div>

        {/* Card 2: Explore Now */}
        <div className="bg-gradient-to-r from-[#d4f5e1] to-[#fef9c3] rounded-3xl shadow-xl w-full max-w-md p-6 text-center transform transition-transform hover:scale-105 hover:shadow-2xl relative border-r-8 border-[#f4aa02]">
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-full shadow-lg">
            <img
              
              description="Explore millet information by entering keywords in the search bar."
              src="https://cdn-icons-png.flaticon.com/512/151/151773.png"
              alt="Search Diseases"
              className="w-16 h-16"
              onClick={handleExploreNowClick}
            />
          </div>
          <h2 className="text-2xl font-extrabold text-[#226c3e] mt-12 mb-4">
          Search Through Text
          </h2>
          <button
        onClick={handleExploreNowClick}
            className="bg-[#f4aa02] text-white rounded-full px-6 py-3 font-bold text-lg hover:bg-[#d98f0c] transition-colors"
          >
            Explore Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Disease;
