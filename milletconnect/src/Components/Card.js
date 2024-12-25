import React from "react";
import { BrowserRouter as  Router, Routes, Route ,useNavigate } from "react-router-dom";

const Card = () => {
  const navigate = useNavigate();  // Get the navigate function from useNavigate

  const handleGetStartedClick = () => {
    navigate("/imagescan");  // Navigate to the /imagescan route
  };
  const handleLearnMoreClick = () => {
    navigate("/disease"); // Navigate to the /disease route
  };
  
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-8 h-screen py-12 px-6 bg-[url('https://i.pinimg.com/736x/68/a7/03/68a7032db26b1cc0f5cc04631e784f13.jpg')] bg-cover bg-center"
    
    >
      {/* Card 1: Image Scan */}
      <div className="bg-white rounded-2xl shadow-lg transform hover:scale-105 transition duration-300 w-80 p-6 border-t-4 border-yellow-500  flex flex-col">
        <div className="bg-yellow-100 rounded-t-xl flex justify-center items-center p-4 ">
          <img
            src="https://interactive.co.id/product/images/assets/myorder-apps/1-qr.png"
            alt="Image Scanner"
            className="h-40"
          />
        </div>
        <h2 className="font-playfair text-2xl font-extrabold text-yellow-700 mt-6 text-center">Image Scanner</h2>
        <p className="text-gray-700 mt-3 leading-relaxed flex-grow">
          Scan the image of millets or search through text to explore
          information and details about their benefits.
        </p>
        
        <button
          onClick={handleGetStartedClick}  // Add the onClick event here
          className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-5 rounded-full shadow-md"
        >
          Get Started
        </button>
      </div>

      {/* Card 2: Millets for Disease Cure */}
      <div className="bg-white rounded-2xl shadow-lg transform hover:scale-105 transition duration-300 w-80 p-6 border-t-4 border-green-500 flex flex-col">
        <div className="bg-green-100 rounded-t-xl flex justify-center items-center p-4">
          <img
            src="https://media.istockphoto.com/illustrations/the-cure-illustration-id92712775?k=6&m=92712775&s=612x612&w=0&h=c4uDVu1h900M7xRg4AU1IvlhM5_i6rdrXErGk5LIJYc="
            alt="Millets for Disease Cure"
            className="h-40"
          />
        </div>
        <h2 className="font-playfair text-2xl font-extrabold text-green-700 mt-6 text-center">
          Millets for Disease Cure
        </h2>
        <p className="text-gray-700 mt-3 leading-relaxed">
          Discover how millets can effectively manage diabetes, obesity, and
          improve heart health for a better lifestyle.
        </p>
        <button 
         onClick={handleLearnMoreClick} // Add the onClick event here
        className="mt-6 bg-green-500 hover:bg-green-600 text-white py-2 px-5 rounded-full shadow-md">
          Learn More
        </button>
      </div>

      {/* Card 3: Nutritional Tracker */}
      <div className="bg-white rounded-2xl shadow-lg transform hover:scale-105 transition duration-300 w-80 p-6 border-t-4 border-red-500 flex flex-col">
        <div className="bg-red-100 rounded-t-xl flex justify-center items-center p-4">
          <img
            src="https://www.pantechsolutions.net/wp-content/uploads/2021/09/food_calorie_measurement_using_matlab_1_.jpg"
            alt="Nutritional Tracker"
            className="h-40 object-contain"
          />
        </div>
        <h2 className="font-playfair text-2xl font-extrabold text-red-700 mt-6 text-center">
          Nutritional Tracker
        </h2>
        <p className="text-gray-700 mt-3 leading-relaxed flex-grow">
          Keep track of your daily nutritional intake with our
          user-friendly and personalized tracker for optimal health.
        </p>
        <button className="mt-6 bg-red-500 hover:bg-red-600 text-white py-2 px-5 rounded-full shadow-md">
          Track Now
        </button>
      </div>
    </div>
  );
};

export default Card;