import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making HTTP requests


const Event = ({event}) => {
  
const handleRegisterClick= () => {
    console.log("Register Button Click")
} 
  return (
    <div className="card card-compact w-96  shadow-x m-5 bg-slate-50">
  <figure><img src={event.image} alt="Event"/></figure>
  <div className="card-body">
    <h2 className="card-title text-gray-900">{event.name}</h2>
    <p>{event.description}</p>
    <p>{event.date}</p>
    <div className="card-actions justify-end">

      <button className="btn btn-primary" onClick={handleRegisterClick}>
            Register
      </button>
    </div>
  </div>
    </div>
  )
}

export default Event;