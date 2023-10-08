import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
	name: 'cart',
	initialState: [],
	reducers: {
		addItem: (state, action) => {
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
		removeItem: (state, action) => {
			const productIdToRemove = action.payload;
			return state.filter((item) => item.productId !== productIdToRemove);
		},
		clearCart: () => [],
	},
});

export const { addItem, updateItemQuantity, removeItem, clearCart } =
	cartSlice.actions;

// Add the updateLocalStorage action
export const updateLocalStorage = () => (dispatch, getState) => {
	const cartItems = getState().cart;
	localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

export default cartSlice.reducer;
