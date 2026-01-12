import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAnimeDetails } from "../../services/api";
import { FaYoutube } from "react-icons/fa6";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";

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

  // console.log(animeDetails);

  return (
    <main className="min-h-screen pt-16">
      <section className="relative h-105">
        <img
          src={
            animeDetails?.images?.webp?.large_image_url ||
            animeDetails?.images?.jpg?.large_image_url
          }
          alt={animeDetails?.title_english || animeDetails?.title_synonyms?.[0] || "Image du manga"}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#0b0b0f] via-black/60 to-transparent" />
      </section>

      <section className="max-w-7xl mx-auto px-6 -mt-50 relative z-10 ">
        <div className="flex flex-col sm:flex-row gap-8 lg:gap-10 w-full">
          <div className="flex justify-center -mt-20">
            <img
              src={
                animeDetails?.images?.webp?.large_image_url ||
                animeDetails?.images?.jpg?.large_image_url
              }
              alt={
                animeDetails?.title_synonyms?.[0] || animeDetails?.title_english || "Image from the manga"
              }
              className="max-w-80 rounded-xl shadow-2xl shadow-indigo-600"
            />
          </div>
          <div className="flex flex-col sm:gap-5 w-full sm:w-auto items-center sm:items-start">
            <h1 className="text-4xl lg:text-6xl font-black text-white my-4 tracking-tight">
              {animeDetails?.title}
            </h1>
            {animeDetails?.title_japanese && (
              <h2 className="text-xl lg:text-2xl text-indigo-300 font-light">
                {animeDetails?.title_japanese}
              </h2>
            )}

            <div className="flex items-center flex-wrap gap-3 mb-5 text-base lg:text-lg font-semibold">
              <span className="">
                {animeDetails?.year ||
                  animeDetails?.aired?.prop?.from?.year ||
                  "TBA"}
              </span>{" "}
              <span>-</span>
              <span>
                {animeDetails?.episodes
                  ? `${animeDetails?.episodes} Episodes`
                  : "In Production"}
              </span>
              <span>-</span>
              <span className="flex items-center gap-2">
                <FaStar className="text-yellow-400" size={20} />
                <span className=" font-bold text-white">
                  {animeDetails?.score || "No notes found"}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              {animeDetails?.genres.map((genre, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-indigo-600/20 backdrop-blur-sm border border-indigo-500/30 rounded-full text-sm font-medium text-indigo-200 hover:bg-indigo-600/30 transition-colors cursor-pointer"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-3 my-4">
              <a
                href={animeDetails?.trailer?.embed_url}
                target="_blank"
                className="flex w-fit items-center gap-2 px-5 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition"
              >
                <FaYoutube size={20} />
                Watch Trailer
              </a>
              <button className="flex items-center gap-2 px-5 py-4 bg-white/10 hover:bg-white/20 rounded-lg transition">
                <FaHeart />
              </button>
            </div>
          </div>
        </div>

        <div className="py-12 lg:py-16">
          <h2 className="text-2xl lg:text-3xl font-bold mb-6 text-white flex items-center gap-3">
            <div className="h-8 w-1 bg-indigo-500 rounded-full" />
            Synopsis
          </h2>
          <p className="text-gray-300 leading-relaxed text-base lg:text-lg">
            {animeDetails?.synopsis?.replace("[Written by MAL Rewrite]", "") ||
              "No synopsis available."}
          </p>
        </div>
      </section>
    </main>
  );
};
