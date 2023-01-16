import { motion } from "framer-motion";

export default function DropDown(props: any) {
	const slideAnimation = {
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
			y: -10,
			transition: {
				duration: 0.1,
			},
			transitionEnd: {
				display: "none",
			},
		},
	};
	return (
		<motion.div
			initial="exit"
			animate={props.trigger ? "enter" : "exit"}
			variants={slideAnimation}
			className={props.styles}
		>
			{props.children}
		</motion.div>
	);
}
