import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAnimeDetails } from "../../services/api";
import { FaYoutube } from "react-icons/fa6";

export const AnimeDetails = () => {
  const { id } = useParams();
  const [animeDetails, setAnimeDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAnimeDetails(id);
      setAnimeDetails(response);
    };

    fetchData();
  }, [id]);

  console.log(animeDetails);

  return (
    <main className="min-h-screen pt-20">
      <section className="max-w-7xl px-4">
        <div className="img w-full ">
          <img
            src={animeDetails?.images.webp.image_url || animeDetails?.images.jpg.image_url}
            alt={animeDetails?.title}
            className="w-full h-96 rounded-lg"
          />
        </div>
        <div className="container-text">
          <h1 className="text-left text-3xl font-bold my-5">
            {animeDetails?.title}
          </h1>
          <div className="">
            <h2 className="text-2xl font-semibold my-3">Genres</h2>
            <div className="flex flex-wrap gap-3">
              {animeDetails?.genres.map((genre, index) => (
                <div key={index} className="bg-indigo-600 px-3 py-1 rounded-lg">
                  {genre.name}
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-5 items-center my-3">
            <span className="inline-block bg-[#FF9F1C] text-white font-bold rounded-lg px-4 py-2">
              {animeDetails?.episodes} episodes
            </span>
            <button className="bg-indigo-600 rounded-lg px-4 py-2">+</button>
          </div>
          <p className="my-5">{animeDetails?.synopsis}</p>
        </div>
        <a
          href={animeDetails?.trailer.embed_url}
          target="_blank"
          aria-label="Watch the trailer"
          className="flex gap-3 justify-center items-center px-4 py-2 bg-[#FF0034] rounded-lg w-2/3"
        >
          <FaYoutube size={25} />
          <span>Watch the trailer</span>
        </a>
      </section>
    </main>
  );
};
