import React, { useState } from "react";
import axios from "axios";

const LogMeal = () => {
  const [mealDescription, setMealDescription] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [calculatedData, setCalculatedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCalculate = async () => {
    if (!mealDescription || !age || !gender) {
      alert("Please fill out meal description, age, and gender.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:4000/calculate", {
        mealDescription,
      });
      setCalculatedData(response.data);
    } catch (error) {
      console.error("Error calculating nutrition:", error);
      alert("An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6 bg-[url('https://img.freepik.com/premium-photo/foods-top-view-copy-space-background_333547-19104.jpg?w=1380')] bg-cover bg-center">
      {/* Header */}
      <h1 className="font-playfair text-5xl font-extrabold bg-gradient-to-r from-orange-600 to-red-600 text-transparent bg-clip-text mb-8 drop-shadow-md text-center animate-fade-in-down">
        🍁 Log Your Meal 🍁
      </h1>

      {/* Glassmorphism Card Layout */}
      <div className="relative bg-white/30 backdrop-blur-lg w-full max-w-lg p-8 rounded-3xl shadow-xl border-t-[6px] border-orange-500 flex flex-col gap-6">
        {/* Decorative Border */}
        <div className="absolute inset-0 border-[3px] border-dashed border-orange-300 rounded-3xl -z-10"></div>

        {/* Form Fields */}
        <input
          type="text"
          placeholder="Describe your meal"
          value={mealDescription}
          onChange={(e) => setMealDescription(e.target.value)}
          className="w-full bg-white/40 border border-gray-300 p-4 rounded-lg shadow-md hover:shadow-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all duration-200 ease-in-out"
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full bg-white/40 border border-gray-300 p-4 rounded-lg shadow-md hover:shadow-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all duration-200 ease-in-out"
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full bg-white/40 border border-gray-300 p-4 rounded-lg shadow-md hover:shadow-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all duration-200 ease-in-out"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        {/* Center Button */}
        <div className="w-full flex justify-center mt-4">
          <button
            onClick={handleCalculate}
            disabled={isLoading}
            className={`w-72 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-transform transform ${
              isLoading
                ? "opacity-50 cursor-not-allowed"
                : "hover:scale-105 active:scale-95"
            }`}
          >
            {isLoading ? "Calculating..." : "Calculate Nutrition"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogMeal;
