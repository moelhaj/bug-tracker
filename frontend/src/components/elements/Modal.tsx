import { motion } from "framer-motion";
import { forwardRef, useState, useImperativeHandle } from "react";

const Modal = (props: any, ref: any) => {
	const [isOpen, setIsOpen] = useState(false);

	useImperativeHandle(ref, () => ({
		openModal: (): any => setIsOpen(true),
		closeModal: (): any => setIsOpen(false),
	}));

	const appearAnimation = {
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
	if (!isOpen) return null;
	return (
		<div className="fixed inset-0 z-10">
			{isOpen && <div className="fixed inset-0 bg-black bg-opacity-70"></div>}
			<motion.div
				className="relative inset-0 z-30 flex h-full w-full items-center justify-center p-3"
				initial="exit"
				animate={isOpen ? "enter" : "exit"}
				variants={appearAnimation}
			>
				<div className="w-11/12 max-w-full rounded-md bg-white dark:bg-slate-900 md:w-10/12 lg:w-8/12 xl:w-6/12">
					{props.children}
				</div>
			</motion.div>
		</div>
	);
};

export default forwardRef(Modal);
