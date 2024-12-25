import React from "react";
import { useNavigate } from "react-router-dom";

const ImageScan = () => {
  const navigate = useNavigate();

  const handleUploadClick = () => {
    navigate("/upload"); // Navigate to the /upload route
  };

  const handleSearchClick = () => {
    navigate("/search"); // Navigate to the /search route
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[url('https://i.pinimg.com/736x/07/c6/10/07c6104b6115d90a39b202c83aa168ce.jpg')] bg-cover bg-center p-6">
      {/* Header */}
      <h1 className="font-playfair text-4xl md:text-5xl font-bold text-[#a16207] text-center mb-12 drop-shadow-md animate-fade-in-down">
        🌾 Welcome to Millet Explorer 🌾
      </h1>

      {/* Options Section */}
      <div className="flex flex-wrap gap-12 justify-center">
        {/* Search Through Text */}
        <OptionCard
          title="Search Through Text"
          description="Explore millet information by entering keywords in the search bar."
          imgSrc="https://cdn-icons-png.flaticon.com/512/151/151773.png"
          btnText="Explore Now"
          onClick={handleSearchClick}
          borderColor="#f59e0b"
        />

        {/* Upload Method */}
        <OptionCard
          title="Upload Method"
          description="Upload an image to scan and learn about millets."
          imgSrc="https://cdn-icons-png.flaticon.com/512/1043/1043489.png"
          btnText="Upload Image"
          onClick={handleUploadClick}
          borderColor="#a16207"
         
        />
      </div>
    </div>
  );
};

// Reusable OptionCard Component
const OptionCard = ({ title, description, imgSrc, btnText, onClick, borderColor,className }) => (
  <div
    onClick={onClick}
    className="relative bg-white rounded-3xl shadow-xl w-[350px] h-[450px] flex flex-col justify-between p-8 text-center cursor-pointer transform transition-transform hover:scale-105 overflow-hidden"
    style={{
      borderLeft: `8px solid ${borderColor}`, // Left border with color
      borderRadius: "25px",
    }}
  >
    <div className="flex flex-col items-center">
      {/* Icon Section */}
      <div className="relative mb-6">
        <img
          src={imgSrc}
          alt={title}
          className="w-28 h-28 mb-4 animate-rotate-in"
        />
        <div
          className="absolute top-[-15px] right-[-15px] rounded-full bg-[#fffae6] p-3 shadow-lg"
          style={{
            border: `3px solid ${borderColor}`, // Icon border matches card border
          }}
        >
          🌾
        </div>
      </div>
      {/* Title and Description */}
      <h2 className="text-3xl font-bold text-[#374151] mb-4">{title}</h2>
      <p className="text-base text-gray-600 leading-6">{description}</p>
    </div>
    {/* Button Section */}
    <button
      className="rounded-full px-8 py-3 font-bold text-lg shadow-md transition-all mt-4"
      style={{
        backgroundColor: borderColor,
        color: "white",
      }}
    >
      {btnText}
    </button>
  </div>
);

export default ImageScan;



