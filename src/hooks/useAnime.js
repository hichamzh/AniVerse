// src/hooks/useAnime.js
import { useEffect, useState } from 'react';
import {
  getTrendingAnime,
  getAnimeByGenre,
  getSeasonNow,
  getTopRatedAnime
} from '../services/jikanApi';

const cache = new Map();

export const useAnime = ({ type, genre, limit = 5 }) => {
  const key = `${type}-${genre || ''}-${limit}`;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    if (cache.has(key)) {
      setData(cache.get(key));
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        let res;
        if (type === 'trending') res = await getTrendingAnime(limit);
        else if (type === 'top') res = await getTopRatedAnime(limit);
        else if (type === 'season') res = await getSeasonNow(limit);
        else if (type === 'genre') res = await getAnimeByGenre(genre, limit);

        if (mounted) {
          cache.set(key, res.data || []);
          setData(res.data || []);
        }
      } catch (e) {
        console.error('useAnime error:', key, e);
        if (mounted) setData([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, [key, type, genre, limit]);

  return { data, loading };
};

// import React from 'react';

// const HeroAnimeCard = ({ anime }) => {
//   if (!anime) return null;

//   const imageUrl = anime.images?.jpg?.large_image_url || anime.image_url || '';
//   const title = anime.title || anime.name || 'Titre inconnu';
//   const score = anime.score ?? 'N/A';
//   const episodes = anime.episodes ?? 'À venir';

//   return (
//     <div
//       style={{
//         width: '100%',
//         borderRadius: '12px',
//         overflow: 'hidden',
//         marginBottom: '16px',
//         boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
//         backgroundColor: '#fff',
//       }}
//     >
//       <img
//         src={imageUrl}
//         alt={title}
//         style={{ width: '100%', height: '300px', objectFit: 'cover' }}
//       />
//       <div style={{ padding: '12px' }}>
//         <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '6px' }}>{title}</h2>
//         <p style={{ fontSize: '1rem', color: '#555' }}>Score: {score}</p>
//         <p style={{ fontSize: '1rem', color: '#555' }}>Épisodes: {episodes}</p>
//       </div>
//     </div>
//   );
// };

// export default HeroAnimeCard;
