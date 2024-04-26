import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';


const OrderInfo = () => {
  const location = useLocation();
  const cart = location.state?.cart; // Retrieve cart from navigation state
  const navigate = useNavigate();
  const { authUser } = useAuthContext();
  const userid = authUser._id;

  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    address: '',
  });
  const [message, setMessage] = useState('');

  // Handles form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Simulates order submission
  const handleSubmit = (e) => {
    e.preventDefault();
    placeOrder(formData)
      .then(() => {
        setMessage('Order placed successfully!');
        // Optional: Redirect to a success page
        // navigate('/success-page');
      })
      .catch((error) => {
        setMessage(`Error placing order. Please try again. ${error.message}`);
      });
  };

  // Placeholder for an actual API call to place the order
  const placeOrder = async (orderData) => {
    // Specify the backend server URL and endpoint
    const totalprice = calculateSubtotal().toFixed(2);
    try {
      fetch('http://localhost:5000/store/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userid: userid,
          name: orderData.name,
          phoneNumber: orderData.phoneNumber,
          address: orderData.address,
          cartItems: cart,
          total: totalprice // Assuming 'cart' is in scope and contains your cart items
        }),
        
    })
      .then(res => res.json())
      .then((result) => {
          window.location.replace(result.url)
          console.log(result);
        });

  

    } catch (error) {
      setMessage(`Error placing order. Please try again. ${error.message}`);
    }
  };

  // Calculate the subtotal of the cart
  const calculateSubtotal = () => {
    return cart?.reduce((total, item) => total + item.quantity * item.price, 0) || 0;
  };



  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-2xl font-bold mb-4 text-white'>Order Information</h2>
      {message && <p className="text-white">{message}</p>}

      {/* Display Cart Items and Subtotal */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-2">Items in Cart</h3>
        <ul>
          {cart?.map(item => (
            <li key={item._id} className="text-white">{item.name} - Quantity: {item.quantity}</li>
          ))}
        </ul>
        <p className="text-lg font-bold text-white">Subtotal: ${calculateSubtotal().toFixed(2)}</p>
      </div>

      {/* Form for submitting order */}
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label htmlFor='name' className='block text-lg font-medium text-white'>Name</label>
          <input
            type='text'
            id='name'
            name='name'
            value={formData.name}
            onChange={handleChange}
            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
            required
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='phoneNumber' className='block text-lg font-medium text-white'>Phone Number</label>
          <input
            type='text'
            id='phoneNumber'
            name='phoneNumber'
            value={formData.phoneNumber}
            onChange={handleChange}
            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
            required
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='address' className='block text-lg font-medium text-white'>Address</label>
          <textarea
            id='address'
            name='address'
            value={formData.address}
            onChange={handleChange}
            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
            required
          />
        </div>
        <button
          type='submit'
          className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default OrderInfo;

