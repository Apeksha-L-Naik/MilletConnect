require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const axios = require('axios');
const session = require('express-session'); // Add session management

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Session setup
app.use(session({
  secret: 'aSjd82hfsJHQwe23jsdfH9asjkYJqwe1!',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true in production if using https
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

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

// Sign Up Route
app.post('/sign_up', async (req, res) => {
  const { Name, Password, Email } = req.body;

  if (!Name || !Password || !Email) {
    return res.status(400).json({ error: 'Name, Password, and Email are required' });
  }

  const query = 'INSERT INTO USER_DETAILS (USERNAME, USERPASSWORD, USEREMAIL) VALUES (?, ?, ?)';
  db.query(query, [Name, Password, Email], (err, result) => {
    if (err) {
      console.error('Error during registration:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    req.session.userId = result.insertId; // Store userId in session
    res.status(201).json({ message: 'Account created successfully', userId: result.insertId });
  });
});

// Sign In Route
app.post('/sign_in', async (req, res) => {
  const { Name, Password } = req.body;

  if (!Name || !Password) {
    return res.status(400).json({ error: 'Name and Password are required' });
  }

  const query = 'SELECT USERID, USERNAME, USERPASSWORD FROM USER_DETAILS WHERE USERNAME = ?';
  db.query(query, [Name], (err, result) => {
    if (err) {
      console.error('Error during login:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: 'Invalid Username' });
    }

    const user = result[0];
    if (user.USERPASSWORD !== Password) {
      return res.status(401).json({ error: 'Invalid Password' });
    }

    req.session.userId = user.USERID; // Store userId in session
    res.status(200).json({ message: 'Login successful', userId: user.USERID });
  });
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
          app_id: process.env.EDAMAM_APP_ID,
          app_key: process.env.EDAMAM_APP_KEY,
          ingr: mealDescription,
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

// API to save meal data (requires user to be logged in)
app.post('/meals', (req, res) => {
  const { meal, calories, protein, carbs, fats } = req.body;
  const userId = req.session.userId;

  if (!userId) {
    return res.status(401).json({ error: 'User not logged in' });
  }

  if (!meal || calories === undefined || protein === undefined || carbs === undefined || fats === undefined) {
    return res.status(400).json({ error: 'All meal data is required' });
  }

  const query = 'INSERT INTO meals (meal, calories, protein, carbs, fats, userId) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [meal, calories, protein, carbs, fats, userId], (err, result) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'An error occurred while saving meal data' });
    }
    res.json({ message: 'Meal logged successfully', mealId: result.insertId });
  });
});

// API to fetch daily meal report (requires user to be logged in)
app.get('/report/:mealId', (req, res) => {
  const { mealId } = req.params;
  const userId = req.session.userId;

  if (!userId) {
    return res.status(401).json({ error: 'User not logged in' });
  }

  const query = `SELECT meal, calories, protein, carbs, fats, created_at FROM meals WHERE id = ? AND userId = ?`;
  db.query(query, [mealId, userId], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'An error occurred while fetching the report' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Meal not found' });
    }

    const mealData = results[0];
    res.json({
      meal: mealData.meal,
      calories: mealData.calories,
      protein: mealData.protein,
      carbs: mealData.carbs,
      fats: mealData.fats,
      createdAt: mealData.created_at,
    });
  });
});

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
