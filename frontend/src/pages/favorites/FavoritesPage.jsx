import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const FavoriteAnimeCard = ({ anime, onUnfavorite }) => {
  const handleUnfavorite = () => {
    // Call the onUnfavorite function with the anime ID to remove it from favorites
    onUnfavorite(anime._id);
  };

  return (
    <div className="card card-compact w-96 shadow-x m-5 bg-slate-50">
      <figure><img src={`${anime.image}`}  alt="Movie" /></figure>
      <div className="card-body">
        <h2 className="card-title text-gray-900">{anime.name}</h2>
        <p>{anime.description.substring(0, 150)}</p>
        <div className="card-actions justify-end">
          <Link className="btn btn-primary" to={`/anime/${anime._id}`}>Watch</Link>
          <button className="btn btn-secondary" onClick={handleUnfavorite}>Unfavorite</button>
        </div>
      </div>
    </div>
  );
};

const FavoritesPage = () => {
  const [favoriteAnime, setFavoriteAnime] = useState([]);

  useEffect(() => {
    // Get all keys from localStorage
    const keys = Object.keys(localStorage);
    
    // Filter keys to get favorite anime keys whose values are true
    const favoriteKeys = keys.filter(key => key.startsWith('favorite_'));
    
    // Extract anime objects from favorite keys
    const animeObjects = favoriteKeys.map(key => JSON.parse(localStorage.getItem(key)));
    
    // Set favorite anime objects in state
    setFavoriteAnime(animeObjects);
  }, []);

  const handleUnfavorite = (animeId) => {
    // Remove the anime object from favorites
    const updatedFavorites = favoriteAnime.filter(anime => anime._id !== animeId);
    setFavoriteAnime(updatedFavorites);
    // Update localStorage to remove the favorite entry
    localStorage.removeItem(`favorite_${animeId}`);
  };

  return (
		<div className=" p-4 h-screen">  	  
      <div className="flex flex-wrap">
        {favoriteAnime.map(anime => (
          <FavoriteAnimeCard 
            key={anime._id} 
            anime={anime}
            onUnfavorite={handleUnfavorite} 
          />
        ))}
      </div>
    </div>
  
  );
};

export default FavoritesPage;