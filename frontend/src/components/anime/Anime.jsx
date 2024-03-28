import React from 'react'
import { Link } from 'react-router-dom';

import AnimeDetails from './AnimeDetails';

const Anime = ({anime}) => {
  return (
    <div className="card card-compact w-96  shadow-x m-5 bg-slate-50">
  <figure><img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" alt="Movie"/></figure>
  <div className="card-body">
    <h2 className="card-title text-gray-900">{anime.name}</h2>
    <p>{anime.description}</p>
    <div className="card-actions justify-end">
      <a className="btn btn-primary"><Link to={`/anime/${anime._id}`}>watch</Link></a>
    </div>
  </div>
    </div>
  )
}

export default Anime;