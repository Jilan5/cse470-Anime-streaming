import React, { useState, useEffect } from 'react';
import Event from '../../components/event/event';


function AllEvent() {
 
  const [events,setEvents]=useState([]);
  useEffect(() => {
    // Fetch events data from backend API
    const getEvents = async () => {
        try {
            const response = await fetch('http://localhost:5000/event');
            //console.log(response)
           
            const data = await response.json()
            console.log('data: ', data);
            if (data.error) {
                throw new Error(data.error);
            }
            setEvents(data);
        } catch (error) {
            console.error('Error fetching event: ', error);
        }
    };

    getEvents();

    

   
  }, []);


 
  return (
    
    <div className=" px-6 m-2 py-8 bg-slate-400">
        <div className='flex justify-between border border-lime-400 px-2 py-2'>
        <h1 className="text-3xl font-semibold text-black     ">Events</h1>

       
        
        </div>
        

       
        <div className="flex flex-wrap -mx-4">
        {events.map(event => (
          <Event key={event._id} event={event} />
        ))}
      
      </div>
      
    </div>
    
  );
}

export default AllEvent;