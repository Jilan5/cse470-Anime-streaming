import React from 'react'
import Cart from '../../components/store/Cart'
import { useCart } from '../../context/cartContext'

const CartPage = () => {
    const [ cart, setCart ] = useCart()


    const handleUpdateQuantity = (productId, newQuantity) => {
        const updatedCart = cart.map(item => {
          if (item._id === productId) {
            return { ...item, quantity: newQuantity };
          }
          return item;
        });
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      };
    
      const handleRemoveFromCart = (productId) => {
        const updatedCart = cart.filter(item => item._id !== productId);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      };
    
  return (
    <div className='bg-slate-200 border border-lime-400 px-2 py-2 rounded-md'>
        <h1
        className='text-slate-800 font-mono text-3xl font-semibold items-center justify-center flex'
        >Cart Page</h1>
        <Cart cart={cart} onUpdateQuantity={handleUpdateQuantity} onRemoveFromCart={handleRemoveFromCart} />
    </div>
  )
}

export default CartPage;