import React, { useState, useEffect } from "react";

const HeroSlider = ({ animes }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!animes || animes.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % animes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [animes]);

  if (!animes || animes.length === 0) return null;

  return (
    <div className="relative w-72 h-96 mx-auto my-4 rounded-xl overflow-hidden">
      {animes.map((anime, index) => (
        <img
          key={anime.mal_id || index}
          src={anime.images?.jpg?.large_image_url || anime.image_url}
          alt={anime.title}
          className={`
            absolute inset-0 w-full h-full object-cover
            transition-opacity duration-700 ease-in-out
            ${index === currentIndex ? "opacity-100" : "opacity-0"}
          `}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

      <div className="absolute bottom-4 left-4 text-white max-w-xs">
        <h2 className="text-lg font-bold mb-1">
          {animes[currentIndex].title}
        </h2>
        <p className="text-sm line-clamp-3">
          {animes[currentIndex].synopsis || "Aucune description disponible"}
        </p>
      </div>
    </div>
  );
};

export default HeroSlider;
