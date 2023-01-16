import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
	name: "auth",
	initialState: { token: null, user: null },
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
	},
});

export const { setCredentials, removeCredentials } = authSlice.actions;
export default authSlice.reducer;
