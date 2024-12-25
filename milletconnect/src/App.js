import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Card from "./Components/Card";  
import ImageScan from "./Components/ImageScan";
import Upload from "./Components/Upload";
import Search from "./Components/Search"; 
import Disease from "./Components/Disease";

function App() {
  return (
    <Router> {/* Wrap your routes in the Router */}
      <Routes>
        <Route path="/" element={<Card />} /> {/* Home page */}
        <Route path="/imagescan" element={<ImageScan />} />
         {/* Image scan page */}
         <Route path="/upload" element={<Upload />} />
         <Route path="/Search" element={<Search />}/>
         <Route path="/disease" element={<Disease />}/>
      </Routes>
    </Router>
  );
}

export default App;







