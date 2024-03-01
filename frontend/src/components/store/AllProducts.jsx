
import React, { useState, useEffect } from 'react';
import Product from './Product';
import { useCart } from '../../context/cartContext';


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

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(products);

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredData(filtered);
  }

  



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
      
        <div className="flex flex-wrap -mx-4">
        {searchTerm === '' ? products.map(product => (
          <Product key={product._id} product={product} onAddToCart={handleAddToCart}/>
        )): filteredData.map((product) => (
          <Product key={product._id} product={product} onAddToCart={handleAddToCart}/>
        ))}
      </div>
      
    </div>
    
  );
}

export default AllProducts;
