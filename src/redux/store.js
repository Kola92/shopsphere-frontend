import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './categoriesSlice';
import productsReducer from './productsSlice';
import cartReducer from './cartSlice';
import usersReducer from './usersSlice'

// Retrieve cart items from localStorage
const storedCartItems = localStorage.getItem('cartItems');
const initialCartItems = storedCartItems ? JSON.parse(storedCartItems) : [];

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
    cart: cartReducer,
    users: usersReducer,
  },
  preloadedState: {
    cart: initialCartItems, // Initialize cart state with persisted items
  },
});

export default store;
