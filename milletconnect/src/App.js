import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Card from "./Components/Card";  // Import the Card component
import ImageScan from "./Components/ImageScan";
import Upload from "./Components/Upload";
import Search from "./Components/Search";  // Import the ImageScan component
import LogMeal from "./Components/LogMeal";
import Disease from "./Components/Disease";
import Info from "./Components/Info";
import Disearch from "./Components/Disearch";

function App() {
  return (
    <Router> {/* Wrap your routes in the Router */}
      <Routes>
        <Route path="/" element={<Card />} /> {/* Home page */}
        <Route path="/imagescan" element={<ImageScan />} />
         {/* Image scan page */}
         <Route path="/upload" element={<Upload />} />
         <Route path="/Search" element={<Search />}/>
         <Route path="/logmeal" element={<LogMeal/>}/>
         <Route path="/disease" element={<Disease/>}/>
         <Route path="/info" element={<Info/>}/>
         <Route path="/disearch" element={<Disearch/>}/>
      </Routes>
    </Router>
  );
}

export default App;