import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
	usersList: [], // Initialize with an empty array for user data
	authenticatedUserId: null,
};

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		addUser: (state, action) => {
			const newUser = { ...action.payload, id: uuidv4() };
			state.usersList.push(newUser);
		},
		setAuthenticatedUserId: (state, action) => {
			state.authenticatedUserId = action.payload;
		},
		clearAuthenticatedUserId: (state) => {
			state.authenticatedUserId = null;
		},
		setUser: (state, action) => action.payload,
		clearUser: () => [],
	},
});

export const {
	addUser,
	setUser,
	clearUser,
	setAuthenticatedUserId,
	clearAuthenticatedUserId,
} = usersSlice.actions;
export default usersSlice.reducer;
