import { useEffect, useState } from "react";
import { IoAlbums } from "react-icons/io5";
import { VscSettings } from "react-icons/vsc";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { getAllGenres, getAnimeByGenre } from "../services/api";
import { useFavorites } from "../hooks/useFavorites";
import { Link } from "react-router-dom";


export default function Catalogue() {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [animes, setAnimes] = useState([]);

    const { toggleFavorite, isFavorite } = useFavorites();
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllGenres();
      setGenres(response);
    };

    fetchData();
  }, []);

  const handleCheckbox = (id) => {
    if (selectedGenre.includes(id)) {
      setSelectedGenre(selectedGenre.filter((genre) => genre !== id));
    } else {
      setSelectedGenre([...selectedGenre, id]);
    }
  };

  useEffect(() => {
    const fetchAnimeGenre = async () => {
      if (selectedGenre.length > 0) {
        const response = await getAnimeByGenre(selectedGenre.join(","));
        setAnimes(response);
      } else {
        setAnimes([]);
      }
    };
    fetchAnimeGenre();
    console.log(selectedGenre.join(","));
  }, [selectedGenre]);

  return (
    <>
      <main className="min-h-screen max-w-7xl mx-auto pt-20">
        <h1 className="flex gap-2 items-center text-4xl lg:text-5xl uppercase font-bold mb-10">
          <IoAlbums />
          <span>Catalog</span>
        </h1>

        <section className="flex gap-10">
          <aside className="min-w-1/4">
            <h2 className="flex items-center gap-2 mb-5 text-sm uppercase font-bold border border-indigo-600 bg-indigo-600/20 rounded-lg pl-6 py-4">
              <VscSettings size={15} />
              <span>Genres</span>
            </h2>
            <div className="container-genres w-full flex flex-col gap-3 px-6 py-4 border border-indigo-600 bg-indigo-600/20 rounded-lg">
              {genres.map((genre) => (
                <label
                  key={genre.mal_id}
                  className="flex items-center gap-2 border text-sm rounded-md border-indigo-600 bg-indigo-600/20 px-2 py-2"
                >
                  <input
                    type="checkbox"
                    value={genre.mal_id}
                    checked={selectedGenre.includes(genre.mal_id)}
                    onChange={() => handleCheckbox(genre.mal_id)}
                  />
                  {genre.name}
                </label>
              ))}
            </div>
          </aside>

          <div className="flex flex-wrap gap-5">
            {animes.length > 0 ? (
              animes.map((anime) => (
                <div
                  key={anime.mal_id}
                  className="relative flex-none w-40 md:w-60 snap-start group"
                >
                  <button
                    onClick={() => toggleFavorite(anime.mal_id)}
                    className={`  
                   absolute top-2 left-2 z-10 p-2 rounded-lg cursor-pointer
                   transition-all duration-300
                   ${isFavorite(anime.mal_id) ? "bg-red-600" : "bg-indigo-600"}
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
              ))
            ) : (
              <>
                <p>rien</p>
              </>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
