import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      // const newItem = action.payload;
      const { productId, productName, productPrice, image } = action.payload;
      const existingItem = state.find((item) => item.productId === productId);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({
          productId,
          productName,
          productPrice,
          image,
          quantity: 1,
          addedToCart: true,
        });
      }
    },
    updateItemQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const existingItem = state.find((item) => item.productId === productId);

      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },
    // Reducer to update the cart items in local storage
    updateLocalStorage: (state) => {
      localStorage.setItem('cartItems', JSON.stringify(state));
    },
    removeItem: (state, action) => {
      const productIdToRemove = action.payload;
      return state.filter((item) => item.productId !== productIdToRemove);
    },
    clearCart: () => [],
  },
});

export const {
  addItem,
  updateItemQuantity,
  removeItem,
  clearCart,
  updateLocalStorage,
} = cartSlice.actions;
export default cartSlice.reducer;
