import { useEffect, useState } from "react";
import { TbChevronDown, TbChevronUp } from "react-icons/tb";
import DropDown from "../elements/DropDown";

export default function Select(props: any) {
	const [showMenu, setShowMenu] = useState(false);

	useEffect(() => {
		if (props.selected !== "") setShowMenu(false);
	}, [props.selected]);

	return (
		<div className="relative w-full">
			<input
				type="text"
				className="input w-full cursor-pointer"
				placeholder={props.label}
				value={props.selected}
				readOnly
				onFocus={() => setShowMenu(true)}
			/>
			<div className="absolute right-2 top-0.5 pt-1.5 text-gray-400">
				{!showMenu && <TbChevronDown />}
				{showMenu && <TbChevronUp />}
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
				{props.items?.map((item: any, index: number) => (
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
