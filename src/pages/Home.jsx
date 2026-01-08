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
        const topAnimesData = await getTopAnimes();
        setTopAnimes(topAnimesData)
        await delay(600);

        const popularAnimesData = await getPopularAnimes();
        setPopularAnimes(popularAnimesData);
        await delay(600);

        const seasonAnimesData = await getSeasonAnimes();
        setSeasonAnimes(seasonAnimesData);
        await delay(600);

        const actionAnimesData = await getActionAnimes();
        setActionAnimes(actionAnimesData);
        await delay(600);

        const romanceAnimesData = await getRomanceAnimes();
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

  // if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur API Jikan</p>;


  return (
    <>
      <HeroSlider animes={popularAnimes} />
      <AnimeSection titleSection="Les plus populaires" data={popularAnimes} />
      <AnimeSection titleSection="Top animes" data={topAnimes} />
      <AnimeSection titleSection="Action" data={actionAnimes} />
      <AnimeSection titleSection="Romance" data={romanceAnimes} />
      <AnimeSection titleSection="Comédie" data={comedyAnimes} />
      <AnimeSection titleSection="Nouveautés" data={seasonAnimes} />

    </>
  );
}
