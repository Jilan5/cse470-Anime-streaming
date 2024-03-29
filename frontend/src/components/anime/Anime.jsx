import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making HTTP requests
import AnimeDetails from './AnimeDetails';

const Anime = ({anime}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = async () => {
    try {
      const animeId = anime._id; // Get the anime ID from the props
      if (isFavorite) {
        // Remove anime from favorites
        await axios.post('/favorite/remove', { animeId });
        console.log('Anime removed from favorites');
      } else {
        // Add anime to favorites
        await axios.post('/favorite/add', { animeId });
        console.log('Anime added to favorites');
      }
      // Toggle the favorite state
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  console.log('isFavorite',isFavorite);
  return (
    <div className="card card-compact w-96  shadow-x m-5 bg-slate-50">
  <figure><img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" alt="Movie"/></figure>
  <div className="card-body">
    <h2 className="card-title text-gray-900">{anime.name}</h2>
    <p>{anime.description}</p>
    <div className="card-actions justify-end">
      <a className="btn btn-primary"><Link to={`/anime/${anime._id}`}>watch</Link></a>
      <button className="btn btn-primary" onClick={handleFavoriteClick}>
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  </div>
    </div>
  )
}

export default Anime;