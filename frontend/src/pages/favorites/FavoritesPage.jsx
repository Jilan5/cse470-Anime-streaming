import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    // Fetch user's favorite animes from backend
    const fetchFavorites = async () => {
      try {
        const response = await axios.get('/favorites');
        setFavorites(response.data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div>
      <h1>Favorite Animes</h1>
      <ul>
        {favorites.map((anime) => (
          <li key={anime._id}>{anime.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesPage;