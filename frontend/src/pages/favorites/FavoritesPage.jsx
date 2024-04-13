import React, { useState, useEffect } from 'react';

const FavoritesPage = () => {
  const [favoriteAnime, setFavoriteAnime] = useState([]);

  useEffect(() => {
    // Fetch favorite anime from the backend when the component mounts
    const fetchFavoriteAnime = async () => {
      try {
        const response = await fetch('/anime/favorites'); // Assuming this endpoint fetches the list of favorite anime
        if (!response.ok) {
          throw new Error('Failed to fetch favorite anime');
        }
        const data = await response.json();
        setFavoriteAnime(data); // Update state with the fetched favorite anime
      } catch (error) {
        console.error('Error fetching favorite anime:', error);
        // Handle error as needed
      }
    };

    fetchFavoriteAnime();
  }, []);

  return (
    <div>
      <h1>Favorites</h1>
      <ul>
        {favoriteAnime.map((anime) => (
          <li key={anime._id}>
            <h2>{anime.name}</h2>
            <p>{anime.description}</p>
            {/* Add more details or actions as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesPage;