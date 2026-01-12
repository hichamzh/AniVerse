import { createContext, useContext, useState } from 'react';
import LocalStorage from '../components/layouts/LocalStorage';
const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => LocalStorage.getFavorites());

  const toggleFavorite = (mal_id) => {
    const updatedFavorites = LocalStorage.toggleFavorite(mal_id);
    setFavorites(updatedFavorites);
  };

  const isFavorite = (mal_id) => {
    return favorites.includes(mal_id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
};