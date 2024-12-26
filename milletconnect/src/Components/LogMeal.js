import React, { useState } from "react";
import axios from "axios";

const LogMeal = () => {
  const [mealDescription, setMealDescription] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [calculatedData, setCalculatedData] = useState(null);
  const [report, setReport] = useState(null);
  const [dailyCalorieLimit, setDailyCalorieLimit] = useState(null);
  const [mealId, setMealId] = useState(null);
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

      const calorieResponse = await axios.post(
        "http://localhost:4000/calorie-limit",
        { age, gender }
      );
      setDailyCalorieLimit(calorieResponse.data.dailyCalorieLimit);
    } catch (error) {
      console.error("Error calculating nutrition or calorie limit:", error);
      alert("An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveMeal = async () => {
    if (!calculatedData) return alert("Please calculate the meal first.");
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:4000/meals", {
        meal: mealDescription,
        calories: calculatedData.calories,
        protein: calculatedData.nutrients.protein,
        carbs: calculatedData.nutrients.carbs,
        fats: calculatedData.nutrients.fats,
      });

      alert("Meal logged successfully!");
      setMealDescription("");
      setCalculatedData(null);
      setMealId(response.data.mealId);
      fetchReport(response.data.mealId, age, gender);
    } catch (error) {
      console.error("Error saving meal:", error);
      alert("An error occurred while saving the meal.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchReport = async (mealId, age, gender) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/report/${mealId}`,
        {
          params: {
            age: age,
            gender: gender,
          },
        }
      );
      setReport(response.data);
    } catch (error) {
      console.error("Error fetching report:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200">
      <h1 className="text-5xl font-extrabold text-orange-700 mb-8 drop-shadow-md text-center">
        Log Your Meal
      </h1>

      <div className="w-full max-w-md p-6 space-y-6 bg-white shadow-xl rounded-xl transform hover:scale-105 transition-transform duration-300">
        <input
          placeholder="Describe your meal"
          value={mealDescription}
          onChange={(e) => setMealDescription(e.target.value)}
          className="w-full border border-gray-300 p-4 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full border border-gray-300 p-4 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full border border-gray-300 p-4 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <button
          onClick={handleCalculate}
          disabled={isLoading}
          className={`w-full bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 shadow-lg transition-all duration-300 ${
            isLoading && "opacity-50 cursor-not-allowed"
          }`}
        >
          {isLoading ? "Calculating..." : "Calculate Nutrition"}
        </button>
      </div>

      {calculatedData && (
        <div className="mt-8 w-full max-w-md p-6 bg-white rounded-xl shadow-xl">
          <h2 className="text-2xl font-semibold mb-4 text-orange-600">
            Nutrition Data
          </h2>
          <p>Calories: {calculatedData.calories}</p>
          <p>Protein: {calculatedData.nutrients.protein.toFixed(2)}g</p>
          <p>Carbs: {calculatedData.nutrients.carbs.toFixed(2)}g</p>
          <p>Fats: {calculatedData.nutrients.fats.toFixed(2)}g</p>
          <button
            onClick={handleSaveMeal}
            disabled={isLoading}
            className={`mt-4 w-full bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 shadow-lg transition-all duration-300 ${
              isLoading && "opacity-50 cursor-not-allowed"
            }`}
          >
            {isLoading ? "Saving..." : "Save Meal"}
          </button>
        </div>
      )}

      {report && (
        <div className="mt-8 w-full max-w-md p-6 bg-white rounded-xl shadow-xl">
          <h2 className="text-2xl font-semibold mb-4 text-orange-600">
            Meal Report
          </h2>
          <p>Meal: {report.meal}</p>
          <p>Calories: {report.calories}</p>
          <p>Protein: {report.protein}g</p>
          <p>Carbs: {report.carbs}g</p>
          <p>Fats: {report.fats}g</p>
          <p>Date: {new Date(report.createdAt).toLocaleDateString()}</p>
          {report.message && <p>{report.message}</p>}
          {report.suggestion && (
            <p>
              <strong>Suggestion:</strong> {report.suggestion}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default LogMeal;
