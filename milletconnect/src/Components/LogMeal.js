import React, { useState } from 'react';
import axios from 'axios';

const LogMeal = () => {
  const [mealDescription, setMealDescription] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [calculatedData, setCalculatedData] = useState(null);
  const [report, setReport] = useState(null);
  const [dailyCalorieLimit, setDailyCalorieLimit] = useState(null);
  const [mealId, setMealId] = useState(null);

  const handleCalculate = async () => {
    if (!mealDescription || !age || !gender) {
      alert('Please fill out meal description, age, and gender.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/calculate', { mealDescription });
      setCalculatedData(response.data);

      // Fetch the daily calorie limit based on age and gender
      const calorieResponse = await axios.post('http://localhost:4000/calorie-limit', { age, gender });
      setDailyCalorieLimit(calorieResponse.data.dailyCalorieLimit);
    } catch (error) {
      console.error('Error calculating nutrition or calorie limit:', error);
      alert('An error occurred.');
    }
  };

  const handleSaveMeal = async () => {
    if (!calculatedData) return alert('Please calculate the meal first.');
  
    try {
      const response = await axios.post('http://localhost:4000/meals', {
        meal: mealDescription,
        calories: calculatedData.calories,
        protein: calculatedData.nutrients.protein,
        carbs: calculatedData.nutrients.carbs,
        fats: calculatedData.nutrients.fats,
      });
  
      alert('Meal logged successfully!');
      setMealDescription('');
      setCalculatedData(null);
  
      // Save the meal ID for fetching the report
      setMealId(response.data.mealId);
  
      // Fetch the report immediately after saving, passing age and gender as well
      fetchReport(response.data.mealId, age, gender);  // Pass age and gender here
    } catch (error) {
      console.error('Error saving meal:', error);
      alert('An error occurred while saving the meal.');
    }
  };
  
  const fetchReport = async (mealId, age, gender) => {
    try {
      const response = await axios.get(`http://localhost:4000/report/${mealId}`, {
        params: {
          age: age,
          gender: gender,
        },
      });
      console.log(response.data); 
      setReport(response.data);  
    } catch (error) {
      console.error('Error fetching report:', error);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <h1 className="text-3xl font-bold text-amber-700 mb-6">Log Your Meal</h1>
      
      <div className="w-full max-w-md p-4 space-y-4 bg-white shadow-lg rounded-lg">
        <input
          placeholder="Describe your meal"
          value={mealDescription}
          onChange={(e) => setMealDescription(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-amber-500"
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-amber-500"
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-amber-500"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <button
          onClick={handleCalculate}
          className="w-full bg-amber-700 text-white py-2 px-4 rounded-md hover:bg-amber-800"
        >
          Calculate Nutrition
        </button>
      </div>

      {calculatedData && (
        <div className="mt-6 w-full max-w-md p-4 border rounded-md bg-white shadow-md">
          <h2 className="text-lg font-semibold mb-2">Nutrition Data</h2>
          <p>Calories: {calculatedData.calories}</p>
          <p>Protein: {calculatedData.nutrients.protein.toFixed(2)}g</p>
          <p>Carbs: {calculatedData.nutrients.carbs.toFixed(2)}g</p>
          <p>Fats: {calculatedData.nutrients.fats.toFixed(2)}g</p>
          <button
            onClick={handleSaveMeal}
            className="mt-4 bg-amber-700 text-white py-2 px-4 rounded-md hover:bg-amber-800"
          >
            Save Meal
          </button>
        </div>
      )}

      {report && (
        <div className="mt-6 w-full max-w-md p-4 border rounded-md bg-white shadow-md">
          <h2 className="text-lg font-semibold mb-2">Meal Report</h2>
          <p>Meal: {report.meal}</p>
          <p>Calories: {report.calories}</p>
          <p>Protein: {report.protein}g</p>
          <p>Carbs: {report.carbs}g</p>
          <p>Fats: {report.fats}g</p>
          <p>Date: {new Date(report.createdAt).toLocaleDateString()}</p>
          {report.message && <p>{report.message}</p>}
          {report.suggestion && <p><strong>Suggestion:</strong> {report.suggestion}</p>}
        </div>
      )}
    </div>
  );
};

export default LogMeal;
