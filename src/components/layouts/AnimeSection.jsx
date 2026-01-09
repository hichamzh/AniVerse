import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';
import { FaHeart, FaRegHeart } from "react-icons/fa";

export const AnimeSection = ({ titleSection, data }) => {
  const skeletonCardNbr = 5;

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const toggleFavorite = (mal_id) => {
    setFavorites((prev) => {
      const newFav = prev.includes(mal_id)
        ? prev.filter((id) => id !== mal_id)
        : [...prev, mal_id];
      localStorage.setItem("favorites", JSON.stringify(newFav));
      return newFav;
    });
  };

  return (
    <section className="max-w-7xl mx-auto flex justify-center items-center">
      <div className="px-4 py-8 xl:px-0 text-white w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold border-l-4 border-indigo-500 pl-4">
            {titleSection}
          </h2>
        </div>

        <div className="flex overflow-x-auto xl:overflow-x-hidden gap-4 pb-6 scrollbar-hide snap-x snap-mandatory transition-all">
          {data.length > 0 ? (
            data.map((anime, index) => (
              <div
                key={index}
                className="relative flex-none w-40 md:w-60 snap-start group"
              >

                <button
                  onClick={() => toggleFavorite(anime.mal_id)}
                  className={`
                   absolute top-2 left-2 z-10 p-2 rounded-lg cursor-pointer
                   transition-all duration-300
                   ${favorites.includes(anime.mal_id) ? "bg-red-600" : "bg-indigo-600"}
                   group-hover:scale-110
                   hover:shadow-lg
                 `}
                >
                  {favorites.includes(anime.mal_id) ? (
                    <FaHeart className="text-white" />
                  ) : (
                    <FaRegHeart className="text-gray-200" />
                  )}
                </button>

                <Link
                  to={`/anime/${anime.mal_id}`}
                  className="relative aspect-2/3 rounded-lg overflow-hidden border border-slate-800 transition-transform duration-300 group-hover:scale-95 block"
                >
                  <img
                    src={anime.images.webp.image_url}
                    alt={anime.title}
                    className="w-full h-full object-cover"
                  />

                  {anime.score && (
                    <span className="absolute top-2 right-2 bg-indigo-600 text-white text-sm font-bold px-2 py-1 rounded-lg shadow-md flex items-center gap-1">
                      {anime.score.toFixed(1)}
                      <StarIcon fontSize="small" />
                    </span>
                  )}

                  <div className="hidden absolute inset-0 bg-linear-to-t from-slate-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 lg:flex items-end p-3">
                    <div className="w-full py-2 bg-indigo-600 text-xs text-center font-bold rounded hover:bg-indigo-500 transition-colors">
                      SEE MORE
                    </div>
                  </div>
                </Link>

                <h3 className="mt-3 text-sm font-medium leading-tight line-clamp-2 group-hover:text-indigo-400 transition-colors">
                  {anime.title}
                </h3>
              </div>
            ))
          ) : (
            <div className="flex items-center gap-5">
              {Array.from({ length: skeletonCardNbr }, (_, i) => (
                <div
                  key={i}
                  className="animate-pulse w-40 md:w-60 h-72 rounded-lg overflow-hidden bg-gray-400"
                ></div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
  