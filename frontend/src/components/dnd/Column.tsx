import { PropsWithChildren } from "react";
import { TbBug, TbCheckupList, TbTemplate } from "react-icons/tb";
import classNames from "../../utilities/ClassNames";
import Card from "./Card";

type Props = PropsWithChildren<{
	rows?: any;
	handleDragStart?: any;
	dragOver?: any;
	dragName?: any;
	setDragOver?: any;
	handleDragEnter?: any;
	title: string;
	showUser: boolean;
}>;

export default function Column({
	title,
	rows,
	dragOver,
	dragName,
	setDragOver,
	handleDragEnter,
	handleDragStart,
	showUser,
}: Props) {
	return (
		<div
			onDragOver={e => {
				e.preventDefault();
				setDragOver(dragName);
			}}
			onDrop={() => handleDragEnter(dragName)}
			className={classNames(
				dragOver === dragName
					? "border-indigo-600 ring-2 ring-indigo-600 dark:border-indigo-600"
					: "border-gray-200 ring-0 dark:border-gray-700",
				"y-scroll relative flex h-full flex-col gap-5 overflow-hidden overflow-y-scroll rounded-md border pl-3 pt-3 pb-3 duration-300"
			)}
		>
			<h1
				className={classNames(
					dragOver === dragName ? "text-indigo-600" : "",
					"text-center text-lg font-bold duration-300"
				)}
			>
				{title}
			</h1>
			<div className="flex flex-col gap-3">
				{rows.map((item: any, itemIndex: number) => (
					<Card
						showUser={showUser}
						handleDragStart={handleDragStart}
						key={item.id}
						item={item}
					/>
				))}
			</div>
		</div>
	);
}
