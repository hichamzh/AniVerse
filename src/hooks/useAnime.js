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