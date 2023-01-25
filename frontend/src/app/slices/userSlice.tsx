import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: { token: null, user: null, newNotification: false },
	reducers: {
		setCredentials: (state, action) => {
			const { token, user } = action.payload;
			state.token = token;
			state.user = user;
		},
		removeCredentials: state => {
			state.token = null;
			state.user = null;
		},
		setNewNotification: (state, action) => {
			state.newNotification = action.payload;
		},
	},
});

export const { setCredentials, removeCredentials, setNewNotification } = userSlice.actions;
export default userSlice.reducer;
