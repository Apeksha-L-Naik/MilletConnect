import React, { useState } from "react";

const Disearch = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    // Placeholder functionality
    alert(`Searching for: ${searchQuery}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-100 to-yellow-50 p-6">
      {/* Title */}
      <h1 className="font-playfair text-4xl md:text-5xl font-bold text-[#226c3e] text-center mb-10">
        🌾 Search Disease 🌾
      </h1>

      {/* Search Section */}
      <div className="w-full max-w-lg">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Type a disease name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border-2 border-[#226c3e] rounded-full py-3 px-6 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-[#226c3e]"
          />
          <button
            onClick={handleSearch}
            className="absolute right-2 bg-[#226c3e] text-white rounded-full px-6 py-2 font-semibold text-sm hover:bg-[#2d904e] transition-colors"
          >
            Search
          </button>
        </div>
      </div>

      {/* Decorative Section */}
      <div className="mt-10 text-center text-gray-500 text-sm">
        <p>Type the name of a disease to find related millet information.</p>
        <p className="italic mt-2">"Healthy living starts with millets!"</p>
      </div>
    </div>
  );
};

export default Disearch;
