import { useEffect, useState } from "react";
import { IoAlbums } from "react-icons/io5";
import { VscSettings } from "react-icons/vsc";
import { getAllGenres, getAnimeByGenre } from "../services/api";

export default function Catalogue() {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [animes, setAnimes] = useState([]);

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

        <section className="flex">
          <aside className="w-1/4">
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

          <div>
            {animes.length > 0 ? (
              animes.map((anime) => (
                <div key={anime.mal_id}>{anime.title}</div>
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
