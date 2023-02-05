import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
	name: "app",
	initialState: {
		darkMode: false,
		currentProject: null,
	},
	reducers: {
		setDarkMode(state, action) {
			state.darkMode = !state.darkMode;
		},
		setCurrentProject(state, action) {
			state.currentProject = action.payload;
		},
	},
});

export const { setDarkMode, setCurrentProject } = appSlice.actions;
export default appSlice.reducer;
