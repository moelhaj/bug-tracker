export const modal = {
	enter: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.3,
		},
		display: "flex",
	},
	exit: {
		opacity: 0,
		y: 10,
		transition: {
			duration: 0.1,
		},
		transitionEnd: {
			display: "none",
		},
	},
};
