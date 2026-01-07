import { useState, useEffect, useRef } from "react";
import {
  getActionAnimes,
  getActionAnimes,
  getComedyAnimes,
  getPopularAnimes,
  getRomanceAnimes,
  getSeasonAnimes,
  getTopAnimes,
} from "../services/api";
import { AnimeSection } from "../components/layouts/AnimeSection";
import HeroSlider from "../components/layouts/HeroSlider";

export default function Home() {
  const [topAnimes, setTopAnimes] = useState([]);
  const [seasonAnimes, setSeasonAnimes] = useState([]);
  const [popularAnimes, setPopularAnimes] = useState([]);
  const [actionAnimes, setActionAnimes] = useState([]);
  const [romanceAnimes, setRomanceAnimes] = useState([]);
  const [comedyAnimes, setComedyAnimes] = useState([]);
  const [actionAnimes, setActionAnimes] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const hasFetched = useRef(false);

  useEffect(() => {
        

    if (hasFetched.current) return;
    hasFetched.current = true;

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const fetchDataApi = async () => {
      try {
        const topAnimesData = await getTopAnimes();
        await delay(600);

        const seasonAnimesData = await getSeasonAnimes();
        await delay(600);

        const popularAnimesData = await getPopularAnimes();
        await delay(600);

        const actionAnimesData = await getActionAnimes();
        await delay(600);

        const romanceAnimesData = await getRomanceAnimes();
        await delay(600);

        const comedyAnimesData = await getComedyAnimes();


        setTopAnimes(topAnimesData);
        setSeasonAnimes(seasonAnimesData);
        setPopularAnimes(popularAnimesData);
        setActionAnimes(actionAnimesData);
        setRomanceAnimes(romanceAnimesData);
        setComedyAnimes(comedyAnimesData);
        setActionAnimes(actionAnimesData);
      } catch (error) {
        console.error("Erreur lors du chargement des animes:", error);
        console.error("Erreur lors du chargement des animes:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchDataApi();
  }, []);

  //   console.log(topAnimes);

  //   console.log(topAnimes);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur API Jikan</p>;


  return (
    <>
      <HeroSlider animes={popularAnimes} />
      <AnimeSection titleSection="Top animes" data={topAnimes} />
      <AnimeSection titleSection="Action" data={actionAnimes} />
      <AnimeSection titleSection="Romance" data={romanceAnimes}/>
      <AnimeSection titleSection="Comédie" data={comedyAnimes}/>
      <AnimeSection titleSection="Nouveautés" data={seasonAnimes} />
      <AnimeSection titleSection="Les plus populaires" data={popularAnimes} />

    </>
  );
}
