import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axiosConfig";

const FavouritesContext = createContext();

export function FavouritesProvider({ children }) {
  const [liked, setLiked] = useState({});

  const loadFavourites = () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    api.get("/api/favourites")
      .then(res => {
        const likedMap = {};
        res.data.forEach(fav => {
          likedMap[fav.product.id] = true;
        });
        setLiked(likedMap);
      })
      .catch(() => {});
  };

  useEffect(() => {
    loadFavourites();
  }, []);

  const toggleFavourite = (productId) => {
    if (liked[productId]) {
      api.delete(`/api/favourites/${productId}`)
        .then(() => setLiked(prev => ({ ...prev, [productId]: false })))
        .catch(console.error);
    } else {
      api.post(`/api/favourites/${productId}`)
        .then(() => setLiked(prev => ({ ...prev, [productId]: true })))
        .catch(console.error);
    }
  };

  const clearFavourites = () => setLiked({});

  return (
    <FavouritesContext.Provider value={{ liked, toggleFavourite, clearFavourites, loadFavourites }}>
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavourites() {
  return useContext(FavouritesContext);
}