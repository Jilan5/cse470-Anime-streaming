import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
// import unregisteredEventsCount from './UnregisteredEvents';
// let unregisteredEventsCount = 1;
const Event = ({ event }) => {
      <div className="card-body">
        <h2 className="card-title text-gray-900">{event.name}</h2>
        <p>{event.description}</p>
        <p>Date: {event.date}</p>
        <p>Fee: {event.fee}TK</p>
        <p>Date: {event.event_date}</p>
        <p className='text-xl text-slate-600 '>Fee: {event.fee}TK</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={handleRegisterClick}>
            {isRegistered ? 'Unregister' : 'Register'}
          </button>
          <a className="btn btn-primary"><Link to={`/event/review/${event._id}`}>Review</Link></a>
        </div>
      </div>
    

};

export default Event;