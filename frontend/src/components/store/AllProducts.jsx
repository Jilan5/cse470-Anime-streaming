

import React, { useState, useEffect } from 'react';
import Product from './Product';
import Cart from './Cart';
import CartButton from './CartButton';

function AllProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products data from backend API
    const getProducts = async () => {
        try {
            const response = await fetch('/store/products');
            const data = await response.json()
            console.log('data: ', data);
            if (data.error) {
                throw new Error(data.error);
            }
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products: ', error);
        }
    };

    getProducts();

   
  }, []);

  const [cart, setCart] = useState([]);

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

    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    const updatedCart = cart.map(item => {
      if (item._id === productId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.filter(item => item._id !== productId);
    setCart(updatedCart);
  };

  return (
    
    <div className=" px-6 m-2 py-8 bg-slate-400">
        <div className='flex justify-between border border-lime-400 px-2 py-2'>
        <h1 className="text-3xl font-semibold text-black">Our Products</h1>
        <CartButton />
        
        
        </div>
      
      <div className="flex flex-wrap -mx-4">
        {products.map(product => (
          <Product key={product._id} product={product} onAddToCart={handleAddToCart}/>
        ))}
      </div>
      <div>
      <Cart cart={cart} onUpdateQuantity={handleUpdateQuantity} onRemoveFromCart={handleRemoveFromCart} />
      </div>
    </div>
    
  );
}

export default AllProducts;
