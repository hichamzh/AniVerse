import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import axios from "axios";
import { useFavorites } from "../hooks/useFavorites";

const Favoris = () => {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const skeletonSize = 5; 
        setAnimes(Array(favorites.length).fill(null)); 

        for (let i = 0; i < favorites.length; i += skeletonSize) {
          const skeleton = favorites.slice(i, i + skeletonSize);
          
          const results = await Promise.all(
            skeleton.map(async (id) => {
              const { data } = await axios.get(`https://api.jikan.moe/v4/anime/${id}`);
              return data.data;
            })
          );

          setAnimes((prev) => {
            const newArr = [...prev];
            results.forEach((anime, index) => {
              newArr[i + index] = anime;
            });
            return newArr;
          });

          await delay(1000);
        }
      } catch (error) {
        console.error("Erreur chargement favoris :", error);
      } finally {
        setLoading(false);
      }
    };

    if (favorites.length === 0) {
      setAnimes([]);
      setLoading(false);
    } else {
      fetchFavorites();
    }
  }, [favorites]);

  const handleToggleFavorite = (mal_id) => {
    toggleFavorite(mal_id);
    setAnimes((prev) => prev.filter((a) => a?.mal_id !== mal_id));
  };

  return (
    <section className="min-h-screen max-w-7xl mx-auto px-4 py-8 pt-20 text-white">
      <div className="flex items-center justify-between bg-indigo-600 rounded-lg px-6 py-4 mb-6 shadow-md">
        <h1 className="text-2xl md:text-3xl font-bold">Your favorites</h1>
        <span className="bg-white text-indigo-600 font-bold px-3 py-1 rounded-full shadow">
          {favorites.length} {favorites.length === 1 ? "favori" : "favoris"}
        </span>
      </div>

      {animes.length === 0 ? (
        <p className="text-gray-400 text-center">You don't have favorite yet</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {animes.map((anime, index) =>
            anime ? (
              <div key={anime.mal_id} className="relative group">
                <button
                  onClick={() => handleToggleFavorite(anime.mal_id)}
                  className={`absolute top-2 left-2 z-10 p-2 rounded-lg cursor-pointer
                    transition-all duration-300
                    ${isFavorite(anime.mal_id) ? "bg-red-600" : "bg-indigo-600"}
                    group-hover:scale-110`}
                >
                  {isFavorite(anime.mal_id) ? (
                    <FaHeart className="text-white" />
                  ) : (
                    <FaRegHeart className="text-gray-200" />
                  )}
                </button>

                <Link
                  to={`/anime/${anime.mal_id}`}
                  className="block aspect-2/3 rounded-lg overflow-hidden border border-slate-800 group-hover:scale-95 transition-transform"
                >
                  <img
                    src={anime.images.webp.image_url}
                    alt={anime.title}
                    className="w-full h-full object-cover"
                  />

                  {anime.score && (
                    <span className="absolute top-2 right-2 bg-indigo-600 text-white text-sm px-2 py-1 rounded-lg flex items-center gap-1">
                      {anime.score.toFixed(1)}
                      <FaStar className="text-yellow-400" />
                    </span>
                  )}
                </Link>

                <h3 className="mt-3 text-sm font-medium line-clamp-2 group-hover:text-indigo-400">
                  {anime.title}
                </h3>
              </div>
            ) : (
              <div
                key={index}
                className="animate-pulse w-40 md:w-60 h-72 rounded-lg bg-gray-700"
              ></div>
            )
          )}
        </div>
      )}
    </section>
  );
};

export default Favoris;
