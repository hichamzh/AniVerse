import React, { useEffect, useState } from 'react';
import { 
  getAnimeByGenre, 
  getSeasonNow, 
  getTopRatedAnime, 
  getTrendingAnime 
} from '../../services/jikanApi';
import AnimeCard from './AnimeCard';

const AnimeSection = ({ title, genre, type, limit = 5 }) => {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let data = null;

        if (type === 'season') {
          data = await getSeasonNow(limit);
        } else if (type === 'top') {
          data = await getTopRatedAnime(limit);
        } else if (type === 'trending') {
          data = await getTrendingAnime(limit);
        } else if (genre) {
          data = await getAnimeByGenre(genre, limit);
        }

        console.log(title, data); 

        
        setAnimes(data?.data?.slice(0, limit) || []);

      } catch (err) {
        console.error('Erreur fetch AnimeSection:', err);
        setAnimes([]);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchData();
    }, 200); 

    return () => clearTimeout(timer);
  }, [genre, type, limit, title]);

  if (loading) return <p>Loading {title}...</p>;
  if (!animes.length) return <p>Aucun anime trouvé pour {title}</p>;

  return (
    <div className="anime-section" style={{ marginBottom: '24px' }}>
      <h2 style={{ marginBottom: '8px', fontWeight: 'bold', fontSize: '1.2rem' }}>{title}</h2>
      <div style={{ display: 'flex', overflowX: 'auto', paddingBottom: '8px' }}>
        {animes.map(anime => (
          <AnimeCard key={anime.mal_id} anime={anime} />
        ))}
      </div>
    </div>
  );
};

export default AnimeSection;
