import { useEffect, useState } from "react";
import { IoAlbums } from "react-icons/io5";
import { VscSettings } from "react-icons/vsc";
import {
  FaHeart,
  FaRegHeart,
  FaStar,
  FaChevronDown,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { getAllGenres, getAnimeByGenre, getTopAnimes } from "../services/api";
import { useFavorites } from "../hooks/useFavorites";
import { Link } from "react-router-dom";

export default function Catalogue() {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [animes, setAnimes] = useState([]);
  const [animesDefault, setAnimesDefault] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const [pagePagination, setPagePagination] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  const { toggleFavorite, isFavorite } = useFavorites();

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const fetchData = async () => {
      const genres = await getAllGenres();
      setGenres(genres);
      await delay(200);
      const topAnime = await getTopAnimes();
      setAnimesDefault(topAnime);
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
      if (selectedGenre.length === 0) {
        setAnimes([]);
        return;
      }

      setLoading(true);
      try {
        const response = await getAnimeByGenre(
          selectedGenre.join(","),
          pagePagination
        );
        setAnimes(response.data ?? response);
        setHasNextPage(response.pagination?.has_next_page);
      } catch (error) {
        console.error(error);
        setAnimes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeGenre();
  }, [selectedGenre, pagePagination]);

  return (
    <>
      <main className="min-h-screen max-w-7xl px-4 xl:px-0 mx-auto py-40">
        <h1 className="flex gap-2 items-center text-4xl lg:text-5xl uppercase font-bold mb-10">
          <IoAlbums />
          <span>Catalog</span>
        </h1>

        <section className="flex flex-col lg:flex-row gap-10 items-start">
          <aside className="w-full lg:w-72 shrink-0 flex flex-col">
            <button
              className="flex justify-between items-center  mb-5 text-sm uppercase font-bold border border-indigo-600 bg-indigo-600/20 rounded-lg px-6 py-4"
              onClick={() => setIsVisible((prev) => !prev)}
            >
              <div className="flex items-center gap-2">
                <VscSettings size={15} />
                <h2>Genres</h2>
              </div>
              <FaChevronDown className={`${!isVisible && "rotate-180"}`} />
            </button>
            {isVisible && (
              <div className="container-genres w-full flex flex-wrap lg:flex-col gap-3 px-6 py-4 border border-indigo-600 bg-indigo-600/20 rounded-lg">
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
            )}
          </aside>
          <section className="contenu w-full">
            <div className="flex flex-wrap justify-center gap-5">
              {loading && (
                <div className="w-full flex items-center justify-center py-20">
                  <div className="flex items-center gap-3 text-indigo-400">
                    <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm font-medium">
                      Chargement des animés...
                    </span>
                  </div>
                </div>
              )}{" "}
              {animes.length > 0
                ? animes.map((anime) => (
                    <div
                      key={anime.mal_id}
                      className="relative flex-none w-40 md:w-60 snap-start group"
                    >
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
                  ))
                : selectedGenre.length <= 0
                ? animesDefault.map((anime) => (
                    <div
                      key={anime.mal_id}
                      className="relative flex-none w-40 md:w-60 snap-start group"
                    >
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
                  ))
                : !loading && (
                    <div className="w-full flex justify-center items-center">
                      <div className="flex flex-col items-center gap-2 px-6 py-5 rounded-xl border border-indigo-600/40 bg-indigo-600/10 text-slate-300 text-sm">
                        <span className="font-semibold text-indigo-400">
                          Aucun résultat trouvé
                        </span>
                        <span className="text-slate-400">
                          Essayez de modifier ou supprimer certains filtres
                        </span>
                      </div>
                    </div>
                  )}
            </div>
            {selectedGenre.length > 0 && animes.length > 0 && (
              <div className="flex items-center gap-3 my-10 w-full justify-center">
                <button
                  disabled={pagePagination === 1}
                  onClick={() => setPagePagination((p) => p - 1)}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600/20 border border-indigo-600 rounded-lg cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <FaArrowLeft />
                  Previous
                </button>
                <span className="px-4 py-2 rounded-md bg-slate-900 border border-slate-700 font-bold text-indigo-400">
                  {pagePagination}
                </span>
                <button
                  disabled={!hasNextPage}
                  onClick={() => setPagePagination((p) => p + 1)}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600/20 border border-indigo-600 rounded-lg cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Following
                  <FaArrowRight />
                </button>
              </div>
            )}
          </section>
        </section>
      </main>
    </>
  );
}
