require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.log('Error connecting to DB:', err);
  } else {
    console.log('Database connected');
  }
});

// API for calculating calories and nutrients using Edamam API
app.post('/calculate', async (req, res) => {
  const { mealDescription } = req.body;

  if (!mealDescription) {
    return res.status(400).json({ error: 'Meal description is required' });
  }

  try {
    const response = await axios.get(
      `https://api.edamam.com/api/nutrition-data`,
      {
        params: {
          app_id: process.env.EDAMAM_APP_ID, // Replace with your app ID
          app_key: process.env.EDAMAM_APP_KEY, // Replace with your app key
          ingr: mealDescription, // Meal description passed here
        },
      }
    );

    const { calories, totalNutrients } = response.data;
    res.json({
      calories,
      nutrients: {
        protein: totalNutrients.PROCNT?.quantity || 0,
        carbs: totalNutrients.CHOCDF?.quantity || 0,
        fats: totalNutrients.FAT?.quantity || 0,
      },
    });
  } catch (error) {
    console.error('Error fetching nutrition data:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Error calculating nutrition data.' });
  }
});

// API to determine daily calorie limit based on age and gender
app.post('/calorie-limit', (req, res) => {
  const { age, gender } = req.body;

  if (!age || !gender) {
    return res.status(400).json({ error: 'Age and gender are required' });
  }

  let dailyCalorieLimit;

  if (gender === 'female') {
    if (age < 10) dailyCalorieLimit = 500;
    else if (age <= 18) dailyCalorieLimit = 1800;
    else if (age <= 30) dailyCalorieLimit = 2000;
    else dailyCalorieLimit = 1800;
  } else if (gender === 'male') {
    if (age < 10) dailyCalorieLimit = 700;
    else if (age <= 18) dailyCalorieLimit = 2500;
    else if (age <= 30) dailyCalorieLimit = 2700;
    else dailyCalorieLimit = 2500;
  } else {
    return res.status(400).json({ error: 'Invalid gender' });
  }

  res.json({ dailyCalorieLimit });
});

// API to save meal data
app.post('/meals', (req, res) => {
  const { meal, calories, protein, carbs, fats } = req.body;

  // Validate the input
  if (!meal || calories === undefined || protein === undefined || carbs === undefined || fats === undefined) {
    return res.status(400).json({ error: 'All meal data is required' });
  }

  // Adjust the query to exclude userId
  const query = 'INSERT INTO meals (meal, calories, protein, carbs, fats) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [meal, calories, protein, carbs, fats], (err, result) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'An error occurred while saving meal data' });
    }
    res.json({ message: 'Meal logged successfully', mealId: result.insertId });
  });
});

// API to fetch daily meal report
// API to fetch meal report by meal ID
app.get('/report/:mealId', (req, res) => {
  const { mealId } = req.params;
  const { age, gender } = req.query; // Fetch age and gender from query parameters

  // Check if all required parameters are provided
  if (!mealId || !age || !gender) {
    return res.status(400).json({ error: 'Meal ID, age, and gender are required' });
  }

  // First, get the daily calorie limit based on age and gender
  let dailyCalorieLimit;

  if (gender === 'female') {
    if (age < 10) dailyCalorieLimit = 500;
    else if (age <= 18) dailyCalorieLimit = 1800;
    else if (age <= 30) dailyCalorieLimit = 2000;
    else dailyCalorieLimit = 1800;
  } else if (gender === 'male') {
    if (age < 10) dailyCalorieLimit = 700;
    else if (age <= 18) dailyCalorieLimit = 2500;
    else if (age <= 30) dailyCalorieLimit = 2700;
    else dailyCalorieLimit = 2500;
  } else {
    return res.status(400).json({ error: 'Invalid gender' });
  }

  // Now fetch the meal data
  const query = `
    SELECT meal, calories, protein, carbs, fats, created_at
    FROM meals
    WHERE id = ?;
  `;

  db.query(query, [mealId], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'An error occurred while fetching the report' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Meal not found' });
    }

    const mealData = results[0];

    // Compare meal calories with the daily calorie limit
    let message;
    let suggestion;

    if (mealData.calories > dailyCalorieLimit) {
      message = `This meal exceeds the daily calorie limit.`;
      suggestion = 'Consider reducing portion sizes or opting for lower-calorie ingredients.';
    } else if (mealData.calories < dailyCalorieLimit) {
      message = `This meal is within the daily calorie limit, but you can add more protein or fiber for a more balanced meal.`;
      suggestion = 'Try adding more protein-rich ingredients or vegetables for a balanced meal.';
    } else {
      message = `This meal meets the daily calorie limit.`;
      suggestion = 'Great choice for a balanced meal!';
    }

    res.json({
      meal: mealData.meal,
      calories: mealData.calories,
      protein: mealData.protein,
      carbs: mealData.carbs,
      fats: mealData.fats,
      createdAt: mealData.created_at,
      message,
      suggestion,
    });
  });
});


// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
