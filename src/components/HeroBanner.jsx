import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

function HeroBanner() {


const [currentBanner , setCurrentBanner] = useState(0)
   const bannerImages = [
    "https://i.pinimg.com/1200x/a0/0a/39/a00a3996dd716284d5cae1eacb0761f4.jpg",
    "https://i.pinimg.com/1200x/2a/b5/91/2ab5915b8d216b598c584f9a484bcee9.jpg",
  ];
   

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannerImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  
    
     

  return (
    <div className="relative w-full mb-4 h-[300px] sm:h-[400px] md:h-[450px] overflow-hidden rounded-lg shadow bg-gray-100">
        {bannerImages.map((src, index) => (
          <img
            key={index}
            src={src}
            alt="Brand banner"
            className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-1000 ${
              index === currentBanner ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
  );
}

export default HeroBanner;
