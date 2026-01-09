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

  console.log(animeDetails);

  return (
    <main className="min-h-screen">
      <section className="relative h-105">
        <img
          src={
            animeDetails?.images.webp.large_image_url ||
            animeDetails?.images.jpg.large_image_url
          }
          alt={animeDetails?.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#0b0b0f] via-black/60 to-transparent" />
      </section>

      <section className="max-w-7xl mx-auto px-6 -mt-50 relative z-10">
        <div className="flex justify-center">
          <img
            src={animeDetails?.images.jpg.large_image_url}
            alt={animeDetails?.title}
            className="w-64 rounded-xl shadow-2xl"
          />
        </div>

        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold my-4">
            {animeDetails?.title}
          </h1>

          <div className="flex flex-wrap gap-3 mb-5 text-sm text-gray-300">
            <span className="font-semibold">{animeDetails?.year}</span>
            <span>-</span>
            <span className="font-semibold">
              {animeDetails?.episodes
                ? `${animeDetails?.episodes} episodes`
                : "in production"}{" "}
            </span>
            <span>-</span>
            <span className="flex items-center gap-2 font-semibold">
              <FaStar className="text-[#FFD700]" /> {animeDetails?.score}
            </span>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            {animeDetails?.genres.map((genre, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-indigo-600/90 rounded-lg text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>

          <div className="mt-5">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold my-4">
              Synopsis
            </h2>
            <p className="text-gray-300 leading-relaxed max-w-3xl my-5">
              {animeDetails?.synopsis?.replace("[Written by MAL Rewrite]", "")}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={animeDetails?.trailer.embed_url}
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
      </section>
    </main>
  );
};
