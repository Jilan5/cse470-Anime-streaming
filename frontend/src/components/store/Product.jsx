// Product.js

import React from 'react';

const Product = ({ product, onAddToCart }) => {
  const handleClick = () => {
    onAddToCart(product);
  };

  return (
<div className="card card-compact w-96  shadow-x m-5 bg-slate-50">
  <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
  <div className="card-body">
    <div className='flex justify-between'>
    <h2 className="card-title text-blue-600">{product.name}</h2>
    <h2 className="card-title text-slate-700">Price: ${product.price}</h2>
    </div>
    <p className='text-slate-500'>{product.description}</p>
    <div className="card-actions justify-end">
      <button onClick={handleClick} className="btn btn-primary">Add to Cart</button>  
    </div>
  </div>
</div>

  
  );
}

export default Product;
