const Fav = "favorites"

const LocalStorage = {
    getFavorites() {
        const data = localStorage.getItem(Fav);
        return data ? JSON.parse(data) : [];
    },

    setFavorites(favorites) {
        localStorage.setItem(Fav, JSON.stringify(favorites));
    },

    toggleFavorite(mal_id) {
        const favorites = this.getFavorites();
        const updatedFavorites = favorites.includes(mal_id)
        ? favorites.filter((id) => id !== mal_id)
        : [...favorites, mal_id];

        this.setFavorites(updatedFavorites);
        return updatedFavorites;
    },

    isFavorite(mal_id) {
        const favorites = this.getFavorites();
        return favorites.includes(mal_id);
    },
};

export default LocalStorage; 