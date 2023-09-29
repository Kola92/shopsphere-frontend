import React from 'react';
import '../assets/styles/Cart.css'; // Stylesheet for Cart
import { useSelector, useDispatch } from 'react-redux';
import {
  updateItemQuantity,
  removeItem,
  clearCart,
  updateLocalStorage, // Import the updateLocalStorage action
} from '../redux/cartSlice';
import { Link } from 'react-router-dom';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleUpdateQuantity = (productId, quantity) => {
    if (quantity > 0) {
      dispatch(updateItemQuantity({ productId, quantity }));
    } else {
      dispatch(removeItem(productId));
    }

    dispatch(updateLocalStorage()); // Update local storage
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeItem(productId));
    dispatch(updateLocalStorage()); // Update local storage
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    dispatch(updateLocalStorage()); // Update local storage
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.productPrice * item.quantity,
      0
    );
  };

  return (
    <div className='cart container mt-4'>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className='empty-cart-message'>Your cart is empty</p>
      ) : (
        <div className='cart-items'>
          {cartItems.map((item) => (
            <div
              key={item.productId}
              className='cart-item row border-bottom mb-2 pb-2'
            >
              <div className='col-md-6'>
                <img
                  src={item.image}
                  alt={item.productName}
                  className='img-thumbnail'
                />
                <h3>{item.productName}</h3>
                <p className='price'>Price: ${item.productPrice}</p>
                <div className='input-group'>
                  <input
                    className='me-3'
                    type='number'
                    value={item.quantity}
                    onChange={(e) =>
                      handleUpdateQuantity(
                        item.productId,
                        Number(e.target.value)
                      )
                    }
                  />

                  <div className='input-group-append'>
                    <button
                      className='remove-item-button btn btn-outline-danger'
                      onClick={() => handleRemoveItem(item.productId)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>

              <div className='col-md-6 '>
                <p className=''>Total: $ {item.productPrice * item.quantity}</p>
              </div>
            </div>
          ))}

          <div className='cart-total d-flex justify-content-between align-items-center mt-3'>
            <p className='fw-bolder mb-0'>Total: ${calculateTotal()}</p>
            <Link to='/checkout' className='checkout-button btn btn-success'>
              Proceed to Checkout
            </Link>
          </div>

          <div className='text-center mt-4'>
            <button className='btn btn-danger' onClick={handleClearCart}>
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
