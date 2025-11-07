import React, { useState, useEffect, useContext } from "react";
import { IconContext } from "react-icons";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { staticContext } from "../contexts/staticContext";

const Hero = () => {
  const { heroContent } = useContext(staticContext);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!heroContent || heroContent.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === heroContent.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Auto-slide every 5 seconds

    return () => clearInterval(interval);
  }, [heroContent]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? heroContent.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === heroContent.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (!heroContent || heroContent.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <IconContext.Provider
      value={{ size: "1.5rem", color: "#fff", className: "react-icon" }}
    >
      <div className="relative w-full h-96 md:h-[500px] lg:h-[600px] overflow-hidden bg-gray-900">
        {/* Hero Images */}
        <div className="relative w-full h-full">
          {heroContent.map((imagePath, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={imagePath}
                alt={`Hero ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <button
            onClick={goToPrevious}
            aria-label="Previous"
            className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all z-10"
          >
            <FaArrowCircleLeft />
          </button>
          <button
            onClick={goToNext}
            aria-label="Next"
            className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all z-10"
          >
            <FaArrowCircleRight />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {heroContent.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </IconContext.Provider>
  );
};

export default Hero;
