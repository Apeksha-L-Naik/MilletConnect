import React from "react";
import { useNavigate } from "react-router-dom";

const ImageScan = () => {
  const navigate = useNavigate();

  const handleUploadClick = () => {
    navigate("/upload?mode=upload"); // Navigates to the /upload route with a query parameter
  };

  // Navigate to the Upload page for Search functionality
  const handleSearchClick = () => {
    navigate("/upload?mode=search"); // Navigates to the /upload route with a query parameter
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[url('https://i.pinimg.com/736x/07/c6/10/07c6104b6115d90a39b202c83aa168ce.jpg')] bg-cover bg-center p-6">
      {/* Header */}
      <h1 className="font-playfair text-4xl md:text-5xl font-bold text-[#a16207] text-center mb-8 drop-shadow-md animate-fade-in-down relative top-[-30px]">
        🌾 Welcome to Millet Explorer 🌾
      </h1>

      {/* Options Section */}
      <div className="flex flex-wrap gap-10 justify-center">
        {/* Search Through Text */}
        <OptionCard
          title="Search Through Text"
          description="Explore millet information by entering keywords in the search bar."
          imgSrc="https://cdn-icons-png.flaticon.com/512/151/151773.png"
          btnText="Explore Now"
          onClick={handleSearchClick}
        />

        {/* Upload Method */}
        <OptionCard
          title="Upload Method"
          description="Upload an image to scan and learn about millets."
          imgSrc="https://cdn-icons-png.flaticon.com/512/1043/1043489.png"
          btnText="Upload Image"
          onClick={handleUploadClick}
        />
      </div>
    </div>
  );
};

// Reusable OptionCard Component
const OptionCard = ({ title, description, imgSrc, btnText, onClick }) => (
  <div
    onClick={onClick}
    className="relative bg-white rounded-xl shadow-lg w-80 p-6 text-center cursor-pointer transform transition-transform hover:scale-105 hover:shadow-2xl overflow-hidden animate-bounce-on-hover border-2 border-transparent hover:border-[#d98f0c] hover:border-4"
  >
    <div className="flex flex-col items-center">
      <div className="relative">
        <img
          src={imgSrc}
          alt={title}
          className="w-24 h-24 mb-4 animate-rotate-in"
        />
        <div className="absolute top-[-10px] right-[-10px] rounded-full bg-[#fffae6] p-2 shadow">
          🌾
        </div>
      </div>
      <h2 className="text-2xl font-bold text-[#a16207] mb-2">{title}</h2>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <button className="bg-[#a16207] text-white rounded-full px-6 py-2 font-bold text-sm hover:bg-[#d98f0c] transition-colors">
        {btnText}
      </button>
    </div>
  </div>
);

export default ImageScan;


