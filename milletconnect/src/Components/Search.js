import React, { useState } from "react";
import axios from "axios";

const Search = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      setResult(null);

      // Make an API call to search for millet information
      const response = await axios.get("http://127.0.0.1:5000/search", {
        params: { name: query },
      });

      setResult(response.data);
    } catch (err) {
      if (err.response) {
        // API returned an error response
        setError(err.response.data.error || "An error occurred.");
      } else {
        // Network or other error
        setError("Failed to fetch millet details. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-[url('https://i.pinimg.com/736x/c5/bb/8c/c5bb8c74c051f20e76ec26e18bee8056.jpg')] bg-cover bg-center">
      <h1 className="font-playfair text-4xl font-bold text-[#a16207] mb-8 text-shadow-md animate-fade-in relative top-[-60px]">
        Search for Millet Information 🌾
      </h1>

      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-xl">
        <form onSubmit={handleSearchSubmit} className="flex flex-col items-center">
          <div className="mb-6">
            <label
              htmlFor="search-input"
              className="block text-xl text-center font-semibold text-[#a16207] mb-2"
            >
              Enter search term
            </label>
            <input
              id="search-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., Pearl Millet"
              className="border-2 border-[#a16207] p-3 rounded-lg w-full text-lg focus:outline-none focus:ring-2 focus:ring-[#a16207] transition-all"
            />
          </div>

          <button
            type="submit"
            className="bg-[#a16207] text-white rounded-full px-8 py-3 font-semibold text-lg hover:bg-[#d98f0c] transition-colors transform hover:scale-105 mt-4"
          >
            Search
          </button>
        </form>

        {error && (
          <div className="mt-6 text-red-500 text-center">
            <p>{error}</p>
          </div>
        )}

        {result && (
          <div className="mt-6 text-center">
            <h2 className="text-xl font-bold text-[#a16207]">
              {result.millet_type}
            </h2>
            <img
              src={`data:image/jpeg;base64,${result.image}`}
              alt={result.millet_type}
              className="w-full h-64 object-cover rounded-lg mt-4"
            />
            <p className="mt-4 text-gray-700"><strong>Description: </strong>{result.description}</p>
            <p className="mt-4 text-gray-700"><strong>Health Benefits: </strong>{result.health_benefits}</p>
            <ul className="mt-4 text-gray-700 text-left">
              <li><strong>Protein: </strong> {result.Protein}</li>
              <li><strong>Fats: </strong> {result.Fats}</li>
              <li><strong>Dietary Fiber: </strong> {result.Dietary_Fiber}</li>
              <li><strong>Minerals: </strong> {result.Minerals}</li>
              <li><strong>Carbohydrates: </strong> {result.Carbohydrates}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
