import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addItem } from '../redux/cartSlice';

const ProductDetails = () => {
  const { id } = useParams();
  const product = useSelector((state) =>
    state.products.find((p) => p.productId === Number(id))
  );
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    dispatch(addItem({ productId: product.productId, quantity }));
  };

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div className='container mt-4'>
      <div className='row'>
        <div className='col-md-6'>
          <img
            className='img-fluid'
            src={product.image}
            alt={product.productName}
          />
        </div>

        <div className='col-md-6'>
          <h2>{product.productName}</h2>
          <p className='price'>${product.productPrice}</p>
          <p>{product.description}</p>

          <div className='add-product'>
            <input
              type='number'
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className='form-control mb-2'
            />
            <button className='btn btn-primary' onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
