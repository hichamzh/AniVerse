// src/services/jikanApi.js
import api from './apiClient';

export const getTrendingAnime = (limit = 5) =>
  api.get('/top/anime', {
    params: { filter: 'bypopularity', limit }
  }).then(res => res.data);

export const getAnimeByGenre = (genreId, limit = 5) =>
  api.get('/anime', {
    params: { genres: genreId, limit }
  }).then(res => res.data);

export const getSeasonNow = (limit = 5) =>
  api.get('/seasons/now', {
    params: { limit }
  }).then(res => res.data);

export const getTopRatedAnime = (limit = 5) =>
  api.get('/top/anime', {
    params: { limit }
  }).then(res => res.data);
