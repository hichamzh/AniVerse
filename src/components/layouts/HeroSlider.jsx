import React from "react";

const HeroSlider = ({ anime }) => {
  if (!anime) {
    return (
      <div className="w-72 h-96 bg-gray-300 animate-pulse rounded-xl mx-auto my-4" />
    );
  }

  return (
    <div className="relative w-72 h-96 rounded-xl overflow-hidden shadow-lg mx-auto my-4">
      {/* Image */}
      <img
        src={anime.images?.jpg?.large_image_url || anime.image_url}
        alt={anime.title}
        className="w-full h-full object-cover"
        loading="lazy"
      />

      {/* Overlay sombre */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

      {/* Titre + synopsis */}
      <div className="absolute bottom-4 left-4 text-white max-w-xs">
        <h2 className="text-lg font-bold mb-1">{anime.title}</h2>
        <p className="text-sm line-clamp-3">
          {anime.synopsis || "Aucune description disponible"}
        </p>
      </div>
    </div>
  );
};

export default HeroSlider;
