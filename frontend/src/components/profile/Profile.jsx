import React, {useState, useEffect } from 'react'
import { useAuthContext } from '../../context/AuthContext';

const Profile = () => {
    const { authUser } = useAuthContext();
    const [orders, setOrders] = useState([]);
    const id = authUser._id;

    useEffect(() => {
        const getOrders = async () => {
            try {
                const response = await fetch(`http://localhost:5000/profile/orders/${id}`);
                const orders = await response.json();
                setOrders(orders);
                console.log(orders);
            } catch (error) {
                console.error(error);
            }
        }
        getOrders();


    }, []);

  return (
    <div className="w-full h-full">

        <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold">Profile</h1>
            <h2 className="text-xl font-semibold">Orders</h2>
            </div>
<div>
      <ul>
        {orders.map((order) => {
          return (
            <li key={order._id}>
              <h3>{order.name}</h3>
              <div>
                <h3>Ordered Items</h3>
                <ul>
                  {order.cartItems.map((item) => {
                    return (
                      <li className="grid h-10 w-full text-2xl bg-grey-300 rounded-md border border-lime-400 place-items-start" key={item._id}>
                        <p>{item.name}</p>
                        <p>{item.price}</p>
                        <p>{item.quantity}</p>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <p>{order.total}</p>
              <p>{order.price}</p>
            </li>
          );
        })}
      </ul>
  </div>

    </div>
    
  )
};

export default Profile;