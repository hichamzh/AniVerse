import axios from "axios";

const URL_JIKAN = "https://api.jikan.moe/v4";

const jikanApi = axios.create({
  baseURL: URL_JIKAN,
  timeout: 10000,
});

const fecthApiJikan = async (endpoint) => {
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
export const getSeasonAnimes = () => {
  return fecthApiJikan("seasons/now?limit=5");
};
export const getPopularAnimes = () => {
  return fecthApiJikan("top/anime?limit=5");
};
