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
    <div className='w-full h-full'>
        <h1>Anime detaits {id}</h1>
        <div className="flex w-full">
  <div className="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center">Review and Description</div>


  <div className="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center">Episodes</div>


  <div className="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center">Comments</div>
        </div>
    </div>
  )
}

export default AnimeDetails;