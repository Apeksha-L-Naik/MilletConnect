import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Card from "./Components/Card";  // Import the Card component
import ImageScan from "./Components/ImageScan";
import Upload from "./Components/Upload";  // Import the ImageScan component

function App() {
  return (
    <Router> {/* Wrap your routes in the Router */}
      <Routes>
        <Route path="/" element={<Card />} /> {/* Home page */}
        <Route path="/imagescan" element={<ImageScan />} />
         {/* Image scan page */}
         <Route path="/upload" element={<Upload />} />
      </Routes>
    </Router>
  );
}

export default App;







