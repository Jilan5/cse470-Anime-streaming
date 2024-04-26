import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthContext } from '../../context/AuthContext'; 

const AnimeDetails = () => {
    const { id } = useParams();
    const { authUser } = useAuthContext();

    const [anime, setAnime] = useState([]);
    const [episodes, setEpisodes] = useState([]);
    const [comments, setComments] = useState([]);

    const [text, setText] = useState('');
    const userid=authUser._id;
    const username=authUser.username;
    
    const handleSubmit = async (e) => {
       
        e.preventDefault();
        try {
        const response = await fetch(`/anime/${id}/comment`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },

            body: JSON.stringify({ userid, username, text, anime: id })
        });
        const data = await response.json();
        console.log(data);
        // Reset form field after successful submission
        setText('');
        } catch (error) {
        console.error(error);
        }
    };


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

    const getEpisodes = async () => {
        try {
            const response = await fetch(`http://localhost:5000/episodes/${id}`);
            const data = await response.json()
            console.log('data: ', data);
            if (data.error) {
                throw new Error(data.error);
            }
            setEpisodes(data);
        } catch (error) {
            console.error('Error fetching anime: ', error);
        }
    }

    getEpisodes();
    
    const getComments = async () => {
        try {
            const response = await fetch(`/anime/${id}/comment`);
            const data = await response.json()
            console.log('data: ', data);
            if (data.error) {
                throw new Error(data.error);
            }
            setComments(data);
        } catch (error) {
            console.error('Error fetching anime: ', error);
        }
    };
    getComments();
    
}, [ comments, episodes, id, text, userid, username]);

  return (
    <div className='w-full h-full'>

        <div className="flex w-full">
  <div className="grid h-full w-12 flex-grow card bg-base-300 rounded-box place-items-center">
    <h2 className=' text-lime-400 p-4 text-2xl'>Review and Description</h2>
    <img src={`${anime.image}`} alt="movie" />
    <h3><b>Name:</b> {anime.name}</h3>
    <h3><b>Genre:</b> {anime.genres}</h3>
    <h3><b>Rating:</b> {anime.rating}</h3>
    <h3><b>Release Date:</b> {anime.release_date}</h3>
    <h4 className='p-2'><b>Description:</b> {anime.description} </h4>
  </div>


  <div className="grid h-full flex-grow card bg-base-300 mx-1 rounded-box place-items-center">
  <h2 className=' text-lime-400 p-4 text-2xl'>Episodes</h2>
  <ul>
      {episodes.map((episode) => (
          <li className='text-blue-500' key={episode._id}><a href={`${episode.video_link}`}>{episode.number}- <u>{episode.name}</u></a></li>
      ))}
  </ul>
  </div>


  <div className="grid h-full  card bg-base-300 rounded-box place-items-center">
  <h2 className=' text-lime-400 p-4 text-2xl'>Comments</h2>
      <div className='flex items-center'>
      <form onSubmit={handleSubmit}>
      <input placeholder="Comment" value={text} onChange={(e) => setText(e.target.value)} />
      <button className='btn-ghost bg-lime-400 rounded-md text-black mx-2 my-3' type="submit">Submit</button>
    </form>
      </div>

      <div className="flex flex-col w-full">
        <div className="divider divider-info">All Comments</div>
    </div>

      <ul>
        {comments.map((comment) => (
            <li className='text-blue-500' key={comment._id}>
            <div className="flex flex-col w-full m-2">
  <div className="grid h-10 w-full text-2xl bg-grey-300 rounded-md border border-lime-400 place-items-start"><p><b>{comment.username}:</b> {comment.text}</p>
                    </div>
                </div>
                
            </li>
        ))}
      </ul>
  </div>
        </div>
    </div>
  )
}

export default AnimeDetails;