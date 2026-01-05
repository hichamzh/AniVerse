// src/services/apiClient.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.jikan.moe/v4',
  timeout: 10000,
});

// ⏳ File d’attente simple
let queue = Promise.resolve();

api.interceptors.request.use(config => {
  queue = queue.then(() => new Promise(res => setTimeout(res, 800)));
  return queue.then(() => config);
});

api.interceptors.response.use(
  res => res,
  async err => {
    const { config, response } = err;
    if (response?.status === 429 && !config._retry) {
      config._retry = true;
      await new Promise(r => setTimeout(r, 1500));
      return api(config);
    }
    return Promise.reject(err);
  }
);

export default api;
