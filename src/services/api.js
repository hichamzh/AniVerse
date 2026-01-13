import axios from "axios";

const URL_JIKAN = "https://api.jikan.moe/v4";

const jikanApi = axios.create({
  baseURL: URL_JIKAN,
  timeout: 10000,
});

export const fecthApiJikan = async (endpoint) => {
  try {
    const res = await jikanApi.get(endpoint);
    return res.data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getTopAnimes = () => {
  return fecthApiJikan("top/anime?limit=5");
};

export const getActionAnimes = () => {
  return fecthApiJikan("anime?genres=1&limit=5")
};

export const getRomanceAnimes = () => {
  return fecthApiJikan("anime?genres=22&limit=5")
};

export const getComedyAnimes = () => {
  return fecthApiJikan("anime?genres=4&limit=5")
};

export const getSeasonAnimes = () => {
  return fecthApiJikan("seasons/now?limit=5");
};
export const getPopularAnimes = () => {
  return fecthApiJikan("top/anime?limit=5&filter=bypopularity");
};

export const getAnimeDetails = (id) => {
  return fecthApiJikan(`anime/${id}`)
};

export const getAllGenres = () => {
  return fecthApiJikan('genres/anime')
}

export const getAnimeByGenre = async (id, page) => {
  const res = await jikanApi.get(`anime?genres=${id}&page=${page}`);

  return {
    data: res.data.data,
    pagination: res.data.pagination,
  };
};


