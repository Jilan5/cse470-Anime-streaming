import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';


const AnimeDetails = () => {
    const { id } = useParams();

    const [anime, setAnime] = useState([]);

    useEffect(() => {
    // Fetch animes data from backend API
    const getAnime = async () => {
        try {
            const response = await fetch(`/anime/${id}`);
            const data = await response.json()
            console.log('data: ', data);
            if (data.error) {
                throw new Error(data.error);
            }
            setAnime(data);
        } catch (error) {
            console.error('Error fetching anime: ', error);
        }
    };

    getAnime();
}, []);

  return (
    <div>
        <h1>Anime detaits {id}</h1>
        <h2>{anime.name}</h2>
    </div>
  )
}

export default AnimeDetails;