import React, { useState, useEffect } from 'react';
import { useAnime } from '../../hooks/useAnime';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

const HeroSlider = () => {
  const { data: animes, loading } = useAnime({ type: 'trending', limit: 5 });
  const [current, setCurrent] = useState(0);

  // Slide automatique toutes les 5 secondes
  useEffect(() => {
    if (!animes || animes.length === 0) return;

    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % animes.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [animes]);

  const anime = animes && animes[current];

  if (loading || !anime) {
    return (
      <div className="w-72 h-96 bg-gray-300 animate-pulse rounded-xl mx-auto my-4" />
    );
  }

  return (
    <div className="relative w-72 h-96 rounded-xl overflow-hidden shadow-lg mx-auto my-4">
      <img
        src={anime.images?.jpg?.large_image_url || anime.image_url}
        alt={anime.title}
        className="w-full h-full object-cover"
        loading="lazy"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

      <div className="absolute bottom-4 left-4 text-white max-w-xs">
        <h2 className="text-lg font-bold mb-1">{anime.title}</h2>
        <p className="text-sm line-clamp-3">{anime.synopsis || 'Aucune description disponible'}</p>
      </div>

      <button
        className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white text-2xl bg-black bg-opacity-50 p-1 rounded-full"
        onClick={() => setCurrent((current - 1 + animes.length) % animes.length)}
      >
        <AiOutlineLeft />
      </button>
      <button
        className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white text-2xl bg-black bg-opacity-50 p-1 rounded-full"
        onClick={() => setCurrent((current + 1) % animes.length)}
      >
        <AiOutlineRight />
      </button>
    </div>
  );
};

export default HeroSlider;
