import React, { useState, useEffect } from 'react'
import LogoutButton from '../sidebar/LogoutButton';
import { useAuthContext } from '../../context/AuthContext'; 
import { useCart } from '../../context/cartContext';
import { Link } from 'react-router-dom';


const Navbar = () => {
  const { authUser } = useAuthContext();
  const [cart, setCart] = useCart();
  const [unregisteredEventsCount, setUnregisteredEventsCount] = useState(0);

  useEffect(() => {
    // Fetch keys from local storage
    const keys = Object.keys(localStorage);

    // Count the number of unregistered events
    let count = 0;
    keys.forEach(key => {
      if (key.endsWith('-registered') && localStorage.getItem(key) === 'false') {
        count++;
        
      }
    });

    // Update the count state
    setUnregisteredEventsCount(count);
  }, []);

  return (
    <div className="navbar bg-base-100">
    <div className="flex-1">
      <a className="btn btn-ghost text-3xl font-mono text-red-500"><Link to="/">Vinland</Link></a>
    </div> 
    <div className="flex-none gap-2">
    <div>
      <button className="btn btn-ghost text-xl font-mono"><Link to="/favorites">Favorites</Link></button>
    </div>

        <div>
          <button className="btn btn-ghost text-xl font-mono"><Link to="/events">Events
            {unregisteredEventsCount > 0 && (
              <span className="badge bg-red-500 ml-1">{unregisteredEventsCount}</span>
            )}
          </Link></button>
          
        </div>
        <div>
      <a className="btn btn-ghost text-xl font-mono"><Link to="/store">Store</Link></a>
    </div>
    <div>
      <a className=" "><Link to="/store/cart"><button className="btn text-xl font-mono">
  Cart
  <div className="badge  badge-secondary">{cart.length}</div>
</button></Link></a>
    </div>
    <div className="form-control">
      <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
    </div>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img alt="Tailwind CSS Navbar component" src={authUser.profilePic} />
          </div>
        </div>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <button>
          <Link to="/profile">Profile</Link>
          <span className="badge">New</span>
          </button>
        
          
        </li>
        <li>
          <Link to="/chat">Chat</Link>
        </li>
        <li>
          <Link to="/store">Store</Link>
        </li>
        <li><Link to="/store/cart">Cart</Link></li>
        <li><LogoutButton /></li>
      </ul>
    </div>
  </div>
</div>
  )
}

export default Navbar;