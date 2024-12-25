import React, { useState } from "react";

const Search = () => {
  const [query, setQuery] = useState("");

  // Handle the search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    alert(`Searching for: ${query}`);
    // Replace this with actual search logic (e.g., API call)
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
              placeholder="e.g., Millet varieties"
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

        <div className="mt-8 text-center text-sm text-gray-600">
          <p className="italic">
            Tip: Try searching for different millet types or their health benefits!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Search;
