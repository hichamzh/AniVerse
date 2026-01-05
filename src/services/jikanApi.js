const BASE_URL = 'https://api.jikan.moe/v4';

const fetchWithRetry = async (url, retries = 2) => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    return res.json();
  } catch (err) {
    if (retries > 0) {
      await new Promise(r => setTimeout(r, 1000));
      return fetchWithRetry(url, retries - 1);
    } else {
      console.error('API fetch failed:', err);
      return null;
    }
  }
};

export const getTrendingAnime = (limit = 5) =>
  fetchWithRetry(`${BASE_URL}/top/anime?filter=bypopularity&limit=${limit}`);

export const getAnimeByGenre = (genreId, limit = 5) =>
  fetchWithRetry(`${BASE_URL}/anime?genres=${genreId}&limit=${limit}`);

export const getSeasonNow = (limit = 5) =>
  fetchWithRetry(`${BASE_URL}/seasons/now?limit=${limit}`);

export const getTopRatedAnime = (limit = 5) =>
  fetchWithRetry(`${BASE_URL}/top/anime?limit=${limit}`);
