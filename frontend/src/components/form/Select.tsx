import { useEffect, useState } from "react";
import classNames from "../../utilities/ClassNames";
import TextInput from "../form/TextInput";
import { TbX, TbChevronDown, TbChevronUp } from "react-icons/tb";
import DropDown from "../elements/DropDown";

export default function Select(props: any) {
	const [showMenu, setShowMenu] = useState(false);

	useEffect(() => {
		if (props.selected !== "") setShowMenu(false);
	}, [props.selected]);

	return (
		<div className={classNames(props.fullWidth ? "w-full" : "w-80", "relative z-50")}>
			<div
				className={classNames(
					showMenu
						? "-top-5 text-indigo-600 dark:text-indigo-100"
						: props.selected !== ""
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
					props.fullWidth ? "w-full" : "w-80",
					showMenu ? "border-indigo-600" : "border-gray-300 dark:border-none",
					"relative z-10 flex h-9 w-full cursor-pointer items-center gap-2 overflow-hidden overflow-x-scroll rounded-md border bg-white px-2 dark:bg-slate-800"
				)}
			>
				<div className="absolute right-1 top-1.5 z-10 cursor-pointer rounded-md p-1">
					{!showMenu && <TbChevronDown />}
					{showMenu && <TbChevronUp />}
				</div>
				{props.selected}
			</div>
			{showMenu && (
				<div
					className="fixed inset-0 bg-transparent"
					onClick={() => setShowMenu(false)}
				></div>
			)}
			<DropDown
				trigger={showMenu}
				styles="bg-white dark:bg-slate-900 px-1 absolute z-10 top-10 flex flex-col w-full py-2 rounded-md border border-gray-300 dark:border-slate-700"
			>
				{props.items.map((item: any, index: number) => (
					<div
						className="w-full cursor-pointer rounded-md bg-white p-2 duration-300 hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800"
						onClick={() => props.setSelected(item)}
						key={item}
					>
						{item}
					</div>
				))}
			</DropDown>
		</div>
	);
}
