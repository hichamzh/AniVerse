import { useState, useEffect, useRef } from "react";
import {
  getActionAnimes,
  getComedyAnimes,
  getPopularAnimes,
  getRomanceAnimes,
  getSeasonAnimes,
  getTopAnimes,
} from "../services/api";
import { AnimeSection } from "../components/layouts/AnimeSection";
import HeroSlider from "../components/layouts/HeroSlider";
import { Link } from "react-router-dom";

export default function Home() {
  
  const [topAnimes, setTopAnimes] = useState([]);
  const [seasonAnimes, setSeasonAnimes] = useState([]);
  const [popularAnimes, setPopularAnimes] = useState([]);
  const [actionAnimes, setActionAnimes] = useState([]);
  const [romanceAnimes, setRomanceAnimes] = useState([]);
  const [comedyAnimes, setComedyAnimes] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const fetchDataApi = async () => {

      try {
        const popularAnimesData = await getPopularAnimes();
        setPopularAnimes(popularAnimesData);
        await delay(600);

        const topAnimesData = await getTopAnimes();
        setTopAnimes(topAnimesData);
        await delay(600);

        const seasonAnimesData = await getSeasonAnimes();
        setSeasonAnimes(seasonAnimesData);
        await delay(600);

        const actionAnimesData = await getActionAnimes();
        setActionAnimes(actionAnimesData);
        setActionAnimes(actionAnimesData);
        await delay(600);

        const romanceAnimesData = await getRomanceAnimes();
        setRomanceAnimes(romanceAnimesData);
        setRomanceAnimes(romanceAnimesData);
        await delay(600);

        const comedyAnimesData = await getComedyAnimes();
        setComedyAnimes(comedyAnimesData);

      } catch (error) {
        console.error("Erreur lors du chargement des animes:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchDataApi();
  }, []);

  //   console.log(topAnimes);

  if (error) return <p>Erreur API Jikan</p>;

  return (
    <main className="min-h-screen pt-20">
      <section className="max-w-7xl mx-auto min-h-[80vh] flex items-center justify-center px-4 py-8">
        <div className="w-full flex flex-col lg:flex-row lg:justify-between items-center gap-8 lg:gap-12">
          <div className="w-full lg:w-1/2 space-y-10 text-white">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black border-l-4 border-indigo-500 pl-4 uppercase tracking-tighter">
              Aniverse
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl text-slate-400 leading-relaxed max-w-xl">
              The simple tool to explore the world of animation. Discover,
              learn, and find your next favorite series.
            </p>

            <Link to={"/catalog"} className="group px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg shadow-lg shadow-indigo-500/20 transition-all duration-300 uppercase text-sm lg:text-lg tracking-widest hover:scale-105 active:scale-95">
              Explore the catalog{" "}
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          </div>

          {/* Bloc slider */}
          <div className="w-full lg:w-auto">
            {popularAnimes.length > 0 ? (
              <HeroSlider animes={popularAnimes} />
            ) : (
              <div className="w-full h-64 lg:h-96 bg-slate-800 animate-pulse rounded-lg"></div>
            )}
          </div>
        </div>
      </section>

      <AnimeSection titleSection="Most popular" data={popularAnimes} />
      <AnimeSection titleSection="Top anime" data={topAnimes} />
      <AnimeSection titleSection="Action" data={actionAnimes} />
      <AnimeSection titleSection="Romance" data={romanceAnimes} />
      <AnimeSection titleSection="Comedy" data={comedyAnimes} />
      <AnimeSection titleSection="New Releases" data={seasonAnimes} />
    </main>
  );
}
