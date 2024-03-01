
import React, { useState, useEffect } from 'react';
import Product from './Product';
import { useCart } from '../../context/cartContext';


function AllProducts() {
  

  const [cart, setCart] = useCart();

  const handleAddToCart = (product) => {
    const existingItem = cart.find(item => item._id === product._id);
    if (existingItem) {
      const updatedCart = cart.map(item => {
        if (item._id === product._id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });

      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));


    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
      localStorage.setItem('cart', JSON.stringify([...cart, { ...product, quantity: 1 }]));
    }

  };

  



  return (
    
    <div className=" px-6 m-2 py-8 bg-slate-400">
        <div className='flex justify-between border border-lime-400 px-2 py-2'>
        <h1 className="text-3xl font-semibold text-black">Our Products</h1>

        <input
        className='border border-lime-400 px-2 py-2 rounded-md w-1/4'
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        />
        
        
        </div>
      

      
    </div>
    
  );
}

export default AllProducts;
