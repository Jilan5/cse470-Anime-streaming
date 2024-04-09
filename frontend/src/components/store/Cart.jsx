// Cart.js

import React from 'react';

const Cart = ({ cart, onUpdateQuantity, onRemoveFromCart }) => {
  const handleChangeQuantity = (productId, newQuantity) => {
    onUpdateQuantity(productId, newQuantity);
  };

  const handleRemoveFromCart = (productId) => {
    onRemoveFromCart(productId);
  };

  return (

    <div className="text-black">
 
        {cart.length === 0 ? <p>Your cart is empty</p>: <p>You have {cart.length} items in your cart</p>}
    <div>
      <div className="overflow-x-auto ">
        <table className="table">
        {/* head */}
        <thead className='text-black text-xl'>
        <tr>
            <th>Name</th>
            <th>Price-individual</th>
            <th>Quantity</th>
            <th></th>
        </tr>
        </thead>
        <tbody>
        {/* row 1 */}
        {cart.map(item => (
        <tr key={item._id} className="cart-item">
            <td>
            <div className="flex items-center gap-3">
                <div className="avatar">
                <div className="mask mask-squircle w-12 h-12">
                    <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                </div>
                </div>
                <div>
                <div className="font-bold">{item.name}</div>
  
                </div>
            </div>
            </td>
            <td>
                <p>Price: ${item.price}</p>
            </td>
            <td>
            <input
                className='border border-lime-400 px-2 py-2 rounded-md w-1/4 text-black'
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => handleChangeQuantity(item._id, parseInt(e.target.value))}
            />
            </td>
            <th>
            <button className='btn hover:bg-red-600 hover:text-black border border-lime-400' onClick={() => handleRemoveFromCart(item._id)}>Remove</button>
            </th>
        </tr>
        ))}
        </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default Cart;
