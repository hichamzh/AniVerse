import { useState, useEffect, useRef } from "react";
import {
  getPopularAnimes,
  getSeasonAnimes,
  getTopAnimes,
} from "../services/api";
import { AnimeSection } from "../components/layouts/AnimeSection";
import HeroSlider from "../components/layouts/HeroSlider";

export default function Home() {
  const [topAnimes, setTopAnimes] = useState([]);
  const [seasonAnimes, setSeasonAnimes] = useState([]);
  const [popularAnimes, setPopularAnimes] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchDataApi = async () => {
      try {
        const [topAnimesData, seasonAnimesData, popularAnimesData] =
          await Promise.all([
            getTopAnimes(),
            getSeasonAnimes(),
            getPopularAnimes(),
          ]);

        setTopAnimes(topAnimesData);
        setSeasonAnimes(seasonAnimesData);
        setPopularAnimes(popularAnimesData);
      } catch (error) {
        console.error(error);
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
        <HeroSlider anime={popularAnimes[0]} />
        <AnimeSection titleSection="Top animes" data={topAnimes}/>
        <AnimeSection titleSection="Saison" data={seasonAnimes}/>
        <AnimeSection titleSection="Les plus populaires" data={popularAnimes}/>

    </>
  );
}
