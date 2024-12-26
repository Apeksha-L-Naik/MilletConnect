// import React, { useState } from "react";

// const Disearch = () => {
//   const [searchQuery, setSearchQuery] = useState("");

//   const handleSearch = () => {
//     // Placeholder functionality
//     alert(`Searching for: ${searchQuery}`);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-100 to-yellow-50 p-6">
//       {/* Title */}
//       <h1 className="font-playfair text-4xl md:text-5xl font-bold text-[#226c3e] text-center mb-10">
//         🌾 Search Disease 🌾
//       </h1>

//       {/* Search Section */}
//       <div className="w-full max-w-lg">
//         <div className="relative flex items-center">
//           <input
//             type="text"
//             placeholder="Type a disease name..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full border-2 border-[#226c3e] rounded-full py-3 px-6 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-[#226c3e]"
//           />
//           <button
//             onClick={handleSearch}
//             className="absolute right-2 bg-[#226c3e] text-white rounded-full px-6 py-2 font-semibold text-sm hover:bg-[#2d904e] transition-colors"
//           >
//             Search
//           </button>
//         </div>
//       </div>

//       {/* Decorative Section */}
//       <div className="mt-10 text-center text-gray-500 text-sm">
//         <p>Type the name of a disease to find related millet information.</p>
//         <p className="italic mt-2">"Healthy living starts with millets!"</p>
//       </div>
//     </div>
//   );
// };

// export default Disearch;


import React, { useState } from "react";

const Disearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [millets, setMillets] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      // Clear previous results
      setMillets([]);
      setError("");

      if (!searchQuery.trim()) {
        setError("Please enter a disease name.");
        return;
      }

      // Fetch millets for the disease
      const response = await fetch(`http://localhost:5000/disease?disease=${searchQuery}`);

      const data = await response.json();

      if (response.ok) {
        setMillets(data.millets);
      } else {
        setError(data.error || "Failed to fetch millets.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
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

      {/* Error Message */}
      {error && (
        <div className="mt-5 text-red-500 text-sm font-semibold text-center">
          {error}
        </div>
      )}

      {/* Millets Display */}
      {millets.length > 0 && (
        <div className="mt-10 w-full max-w-lg space-y-4">
          <h2 className="text-2xl font-semibold text-[#226c3e] text-center">
            Millets for "{searchQuery}":
          </h2>
          {millets.map((millet, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 text-center text-[#226c3e] font-medium"
            >
              {millet}
            </div>
          ))}
        </div>
      )}

      {/* Decorative Section */}
      <div className="mt-10 text-center text-gray-500 text-sm">
        <p>Type the name of a disease to find related millet information.</p>
        <p className="italic mt-2">"Healthy living starts with millets!"</p>
      </div>
    </div>
  );
};

export default Disearch;

