import { useState } from "react";
import { motion } from "framer-motion";

export default function Tooltip(props: any) {
	const [show, setShow] = useState(false);

	const hSlideAnimation = {
		enter: {
			opacity: 1,
			x: 0,
			transition: {
				duration: 0.3,
			},
			display: "flex",
		},
		exit: {
			opacity: 0,
			x: -10,
			transition: {
				duration: 0.1,
			},
			transitionEnd: {
				display: "none",
			},
		},
	};

	const vSlideAnimation = {
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

	return (
		<div
			className="relative"
			onMouseEnter={() => setShow(true)}
			onMouseLeave={() => setShow(false)}
		>
			{props.children}
			<motion.div
				className={`${props.styles} absolute z-50 flex items-center whitespace-nowrap rounded bg-indigo-600 py-1 px-2 text-xs text-white`}
				initial="exit"
				animate={show ? "enter" : "exit"}
				variants={props.placement === "x" ? hSlideAnimation : vSlideAnimation}
			>
				{props.text}
			</motion.div>
		</div>
	);
}
