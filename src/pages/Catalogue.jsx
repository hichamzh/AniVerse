import { useEffect, useState } from "react";
import { IoAlbums } from "react-icons/io5";
import { VscSettings } from "react-icons/vsc";
import { getAllGenres } from "../services/api";

export default function Catalogue() {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllGenres();
      setGenres(response);
    };

    fetchData();
  }, []);

  return (
    <>
      <main className="min-h-screen max-w-7xl mx-auto pt-20">
        <h1 className="flex gap-2 items-center text-4xl lg:text-5xl uppercase font-bold mb-10">
          <IoAlbums />
          <span>Catalog</span>
        </h1>

        <section>
          <aside className="w-1/4">
            <h2 className="flex items-center gap-2 mb-5 text-sm uppercase font-bold border border-indigo-600 bg-indigo-600/20 rounded-lg pl-6 py-4">
              <VscSettings size={15} />
              <span>Genres</span>
            </h2>
            <div className="container-genres w-full flex flex-col gap-3 px-6 py-4 border border-indigo-600 bg-indigo-600/20 rounded-lg">
              {genres.map((genre, index) => (
                <div key={index} className="border text-sm rounded-md border-indigo-600 bg-indigo-600/20 px-2 py-2">{genre.name}</div>
              ))}
            </div>
          </aside>
        </section>
      </main>
    </>
  );
}
