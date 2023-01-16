import { useEffect, useState } from "react";
import classNames from "../../utilities/ClassNames";
import TextInput from "./TextInput";
import { TbX, TbChevronDown, TbChevronUp } from "react-icons/tb";
import { motion } from "framer-motion";

export default function UserSelect(props: any) {
	const [keyword, setKeyword] = useState("");
	const [users, setUsers] = useState(props.users);
	const [showMenu, setShowMenu] = useState(false);

	useEffect(() => {
		if (keyword !== "") {
			setUsers(
				props.users.filter((x: any) =>
					x.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
				)
			);
		} else {
			setUsers(props.users);
		}
	}, [keyword]);

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
		<div className="relative z-10 w-full">
			<div
				className={classNames(
					showMenu
						? "-top-5 text-indigo-600 dark:text-indigo-100"
						: props.user?.assigneeName !== ""
						? "-top-5 text-gray-500 dark:text-indigo-100"
						: "top-2.5 text-gray-500 dark:text-gray-100",
					"absolute z-20 pl-2 text-sm duration-300"
				)}
			>
				{props.label}
			</div>
			<div
				onClick={() => setShowMenu(prev => !prev)}
				className={classNames(
					showMenu ? "border-indigo-600" : "border-gray-300 dark:border-none",
					"relative z-10 flex h-9 w-full cursor-pointer items-center gap-2 overflow-hidden overflow-x-scroll rounded-md border bg-white pr-4 dark:bg-slate-800"
				)}
			>
				<div className="absolute right-1 top-1.5 z-10 rounded-md p-1">
					{!showMenu && <TbChevronDown />}
					{showMenu && <TbChevronUp />}
				</div>
				{props.user?.assigneeName !== "" && (
					<div className="pl-2">{props.user?.assigneeName}</div>
				)}
			</div>
			{showMenu && (
				<div
					className="fixed inset-0 bg-transparent"
					onClick={() => setShowMenu(false)}
				></div>
			)}
			<motion.div
				initial="exit"
				animate={showMenu ? "enter" : "exit"}
				variants={slideAnimation}
				className="y-scroll absolute top-10 z-20 flex h-40 w-full flex-col gap-3 overflow-hidden overflow-y-scroll rounded-md border border-gray-300 bg-white px-1 pt-3 pl-3 pb-3 shadow-sm dark:border-slate-700 dark:bg-slate-900"
			>
				<div>
					<input
						type="text"
						value={keyword}
						className="input"
						onChange={(e: any) => setKeyword(e.target.value)}
						placeholder="Search"
					/>
				</div>
				<div className="grid grid-cols-1 gap-2 md:grid-cols-2">
					{users?.map((user: any) => (
						<div
							onClick={() => {
								setShowMenu(false);
								setKeyword("");
								props.setUser(user);
							}}
							className={classNames(
								props.user.id === user.id
									? "bg-indigo-600 text-white"
									: "bg-gray-100 dark:bg-slate-800",
								"flex cursor-pointer items-center gap-3 rounded-md py-2 px-3 text-sm"
							)}
							key={user.id}
						>
							<img
								className="h-7 w-7 rounded-full object-contain"
								src={`http://localhost:3500/${user?.id}.png`}
								crossOrigin="anonymous"
								alt="avatar"
							/>
							<div className="flex flex-col leading-3">
								<p>{user.name}</p>
								<p className="text-xs">{user.title}</p>
							</div>
						</div>
					))}
				</div>
			</motion.div>
		</div>
	);
}
