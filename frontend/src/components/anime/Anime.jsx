import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Anime = ({ anime }) => {
  const [favorited, setFavorited] = useState(() => {
    // Get favorite status from localStorage
    const favoriteStatus = localStorage.getItem(`favorite_${anime._id}`);
    // If favorite status is stored, parse it to boolean, otherwise default to false
    return favoriteStatus ? JSON.parse(favoriteStatus) : false;
  });

  const handleFavorite = async () => {
    try {
      // Toggle favorite status
      const newFavoriteStatus = !favorited;
      // Update local state
      setFavorited(newFavoriteStatus);
      // Update favorite status in localStorage
      const storageKey = `favorite_${anime._id}`;
      if (newFavoriteStatus) {
        localStorage.setItem(storageKey, JSON.stringify({ ...anime, favorited: newFavoriteStatus }));
      } else {
        localStorage.removeItem(storageKey);
      }
      // Send request to backend to favorite/unfavorite anime
      const response = await fetch(`/anime/${anime._id}/${newFavoriteStatus ? 'favorite' : 'unfavorite'}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });
  
      if (!response.ok) {
        throw new Error('Failed to toggle favorite state');
      }
    } catch (error) {
      console.error('Error toggling favorite state:', error);
      // Handle error as needed
    }
  };

  return (
    <div className="card card-compact w-96  shadow-x m-5 bg-slate-50">
     <figure><img src={`${anime.image}`} alt="Movie"/></figure>
      <div className="card-body">
        <h2 className="card-title text-gray-900">{anime.name}</h2>
        <p>{anime.description.substring(0, 150)}</p>
        <div className="card-actions justify-end">
          <a className="btn btn-primary"><Link to={`/anime/${anime._id}`}>Watch</Link></a>
          <button className="btn btn-secondary" onClick={handleFavorite}>
            {favorited ? "Unfavorite" : "Favorite"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Anime;