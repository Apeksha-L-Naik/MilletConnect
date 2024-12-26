import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home"; // Home component
import Card from "./Components/Card"; // Card component
import ImageScan from "./Components/ImageScan"; // ImageScan component
import Upload from "./Components/Upload"; // Upload component
import Search from "./Components/Search"; // Search component
import LogMeal from "./Components/LogMeal"; // LogMeal component
import AuthForm from "./Components/AuthForm"; // AuthForm component

function App() {
  return (
    <Router> {/* Wrap your routes in the Router */}
      <Routes>
        <Route path="/" element={<AuthForm />} /> {/* Show AuthForm initially */}
        <Route path="/home" element={<Home />} /> {/* Redirect to Home after login/signup */}
        <Route path="/card" element={<Card />} /> {/* Card page */}
        <Route path="/imagescan" element={<ImageScan />} /> {/* Image scan page */}
        <Route path="/upload" element={<Upload />} /> {/* Upload page */}
        <Route path="/search" element={<Search />} /> {/* Search page */}
        <Route path="/logmeal" element={<LogMeal />} /> {/* LogMeal page */}
      </Routes>
    </Router>
  );
}

export default App;
