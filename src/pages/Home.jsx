import { useState, useEffect, useRef } from "react";
import {
  getActionAnimes,
  getPopularAnimes,
  getSeasonAnimes,
  getTopAnimes,
} from "../services/api";
import { AnimeSection } from "../components/layouts/AnimeSection";

export default function Home() {
  const [topAnimes, setTopAnimes] = useState([]);
  const [seasonAnimes, setSeasonAnimes] = useState([]);
  const [popularAnimes, setPopularAnimes] = useState([]);
  const [actionAnimes, setActionAnimes] = useState([]);

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
        await delay(600);

        const seasonAnimesData = await getSeasonAnimes();
        await delay(600);

        const popularAnimesData = await getPopularAnimes();
        await delay(600);

        const actionAnimesData = await getActionAnimes();

        setTopAnimes(topAnimesData);
        setSeasonAnimes(seasonAnimesData);
        setPopularAnimes(popularAnimesData);
        setActionAnimes(actionAnimesData);
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

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur API Jikan</p>;

  return (
    <>
      {/* <HeroSlider anime={popularAnimes[0]} /> */}
      <AnimeSection titleSection="Top animes" data={topAnimes} />
      <AnimeSection titleSection="Saison" data={seasonAnimes} />
      <AnimeSection titleSection="Les plus populaires" data={popularAnimes} />
      <AnimeSection titleSection="Action" data={actionAnimes} />
    </>
  );
}
