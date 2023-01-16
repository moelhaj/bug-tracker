import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
	name: "theme",
	initialState: {
		darkMode: false,
	},
	reducers: {
		setDarkMode(state, action) {
			state.darkMode = !state.darkMode;
		},
	},
});

export const { setDarkMode } = themeSlice.actions;
export default themeSlice.reducer;
