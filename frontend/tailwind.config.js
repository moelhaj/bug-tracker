/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
	darkMode: "class",
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontSize: {
				xs: "0.65rem",
				sm: "0.75rem",
				base: "0.85rem",
				lg: "1rem",
				xl: "1.5rem",
			},
			animation: {
				loading: "loading 3s infinite",
			},
			keyframes: {
				loading: {
					"0%": { transform: "translateY(250px)", opacity: 0, scale: "0.7" },
					"40%": { transform: "translateY(0)", opacity: 1, scale: "1" },
					"60%": { transform: "translateY(0)", scale: "1" },
					"100%": { transform: "translateY(-250px)", opacity: 0.3, scale: "0.7" },
				},
			},
		},
	},
	plugins: [require("@tailwindcss/forms")],
};
