import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full h-screen relative">
      {/* Background Image */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-center bg-contain animate-image-fade"
        style={{
          backgroundImage:
            "url('https://www.isaaa.org/kc/cropbiotechupdate/files/images/1127202453907AM.jpg ')",
          backgroundSize: "cover", // This will prevent the image from being too zoomed
        }}
      ></div>

      {/* Text Section on the Image */}
      <div className="absolute top-0 left-1/4 w-3/4 h-full flex flex-col justify-center items-start text-white p-8 animate-fade-in-up">
        <h1 className="text-5xl font-bold mb-6 animate-fade-in-up">
          Welcome to the World of Millets
        </h1>
        <p className="text-lg mb-6 animate-fade-in-up delay-100">
          Discover the health secrets of millets. Let's transform the way we eat and live with nature’s superfood.
        </p>

        {/* Explore Button */}
        <Link to="/card">
          <button className="bg-white text-custom py-3 px-8 rounded-full font-semibold hover:bg-gray-200 transition animate-bounce-in">
            Explore Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;




