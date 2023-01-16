import { motion } from "framer-motion";
import { useState } from "react";
import classNames from "../../utilities/ClassNames";

export default function Menu(props: any) {
	const slideAnimation = {
		enter: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.2,
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
		<div className="relative">
			{props.button}
			{props.isOpen && (
				<div className="fixed inset-0 z-10 bg-transparent" onClick={props.hide}></div>
			)}
			<motion.div
				initial="exit"
				animate={props.isOpen ? "enter" : "exit"}
				variants={slideAnimation}
				className={classNames(
					props.styles ? props.styles : "",
					"absolute z-10 rounded-md border bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800"
				)}
			>
				{props.children}
			</motion.div>
		</div>
	);
}
