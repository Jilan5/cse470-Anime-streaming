import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
// import unregisteredEventsCount from './UnregisteredEvents';
// let unregisteredEventsCount = 1;

const Event = ({ event }) => {
  const [isRegistered, setIsRegistered] = useState(false); // State to track registration status

  useEffect(() => {
    // Check if the event is initially registered
    const storedStatus = localStorage.getItem(`${event._id}-registered`);
    setIsRegistered(storedStatus === 'true'); // Convert string to boolean
  }, [event]);

  const handleRegisterClick = async () => {
    try {
      const method = isRegistered ? 'DELETE' : 'POST';
      const url = isRegistered
        ? `http://localhost:5000/event/${event._id}/unregister`
        : `http://localhost:5000/event/${event._id}/register`;
  
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        
        },
      });
  
      if (response.ok) {
        setIsRegistered(!isRegistered); // Toggle registration status
  
        // Update local storage with the new registration status
        localStorage.setItem(`${event._id}-registered`, `${!isRegistered}`);
  
        console.log(`User ${isRegistered ? 'unregistered' : 'registered'} successfully for event`);
    
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    // <div><Navbar unregisteredEventsCount={unregisteredEventsCount} />
    <div className="card card-compact w-96 shadow-x m-5 bg-slate-50">
      
      <figure><img src={event.image} alt="Event"/></figure>
      <div className="card-body">
        <h2 className="card-title text-gray-900">{event.name}</h2>
        <p>{event.description}</p>
        <p>Date: {event.event_date}</p>
        <p className='text-xl text-slate-600 '>Fee: {event.fee}TK</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={handleRegisterClick}>
            {isRegistered ? 'Unregister' : 'Register'}
          </button>
          <a className="btn btn-primary"><Link to={`/event/review/${event._id}`}>Review</Link></a>
        </div>
      </div>
    </div>
    // </div>
  );
};


export default Event;
