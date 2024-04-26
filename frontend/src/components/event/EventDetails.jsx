import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthContext } from '../../context/AuthContext'; 

const EventDetails = () => {
    const { id } = useParams();
    const { authUser } = useAuthContext();

    const [event, setEvent] = useState([]);
    const [reviews, setReviews] = useState([]);

    const [text, setText] = useState('');
    const userid=authUser._id;
    const username=authUser.username;
    
    const handleSubmit = async (e) => {
       
        e.preventDefault();
        try {
        const response = await fetch(`http://localhost:5000/event/review/${id}`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },

            body: JSON.stringify({ userid, username, text, event: id })
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
    const getEvent = async () => {
        try {
            const response = await fetch(`http://localhost:5000/event/review/${id}`);
            const data = await response.json()
            console.log('data: ', data);
            if (data.error) {
                throw new Error(data.error);
            }
            setEvent(data);
        } catch (error) {
            console.error('Error fetching event: ', error);
        }
    };

    getEvent();

    
    const getReviews = async () => {
        try {
            const response = await fetch(`http://localhost:5000/event/review/${id}`);
            const data = await response.json()
            console.log('data: ', data);
            if (data.error) {
                throw new Error(data.error);
            }
            setReviews(data);
        } catch (error) {
            console.error('Error fetching event: ', error);
        }
    };
    getReviews();
    
}, [ reviews, id, text, userid, username]);

  return (
    

        <div className="w-full h-full">


  <div className="grid  card bg-base-300 rounded-box place-items-center">
  <h2 className=' text-lime-400 p-4 text-2xl'>Reviews</h2>
      <div className='flex items-center'>
      <form onSubmit={handleSubmit}>
      <input placeholder="Review" value={text} onChange={(e) => setText(e.target.value)} />
      <button className='btn-ghost bg-lime-400 rounded-md text-black mx-2 my-3' type="submit">Submit</button>
    </form>
      </div>

      <div className="flex flex-col w-full">
        <div className="divider divider-info">All Reviews</div>
    </div>

      <ul>
        {reviews.map((review) => (
            <li className='text-blue-500' key={review._id}>
            <div className="flex flex-col w-full m-2">
  <div className="grid h-10 w-full text-2xl bg-grey-300 rounded-md border border-lime-400 place-items-start"><p><b>{review.username}:</b> {review.text}</p>
                    </div>
                </div>
                
            </li>
        ))}
      </ul>
  </div>
        </div>
  )
}

export default EventDetails;