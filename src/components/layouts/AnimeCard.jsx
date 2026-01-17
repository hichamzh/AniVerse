import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
export const AnimeCard = ({ anime, isFavorite, toggleFavorite }) => {
  return (
    <div className="relative flex-none w-40 md:w-60 snap-start group">
      <button
        onClick={() => toggleFavorite(anime.mal_id)}
        className={`  
                        absolute top-2 left-2 z-10 p-2 rounded-lg cursor-pointer
                        transition-all duration-300
                        ${
                          isFavorite(anime.mal_id)
                            ? "bg-red-600"
                            : "bg-indigo-600"
                        }
                        group-hover:scale-110
                        hover:shadow-lg
                        `}
        aria-label="Add to favorites"
      >
        {isFavorite(anime.mal_id) ? (
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
            <FaStar className="text-yellow-400" size={20} />
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
  );
};
