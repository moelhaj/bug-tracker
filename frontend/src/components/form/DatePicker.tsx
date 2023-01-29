import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Calendar from "../elements/Calendar";
import { TbCalendarEvent } from "react-icons/tb";
import DropDown from "../elements/DropDown";

export default function DatePicker(props: any) {
	const [showCalendar, setShowCalendar] = useState(false);

	useEffect(() => {
		if (props.date !== "") setShowCalendar(false);
	}, [props.date]);

	useEffect(() => {
		document.addEventListener("keydown", () => setShowCalendar(false), false);
		return () => {
			document.removeEventListener("keydown", () => setShowCalendar(false), false);
		};
	}, []);

	return (
		<div className="relative w-full">
			<input
				type="text"
				className="input w-full cursor-pointer"
				placeholder={props.label}
				value={props.date && dayjs(props.date).format("DD/MM/YYYY")}
				readOnly
				onFocus={() => setShowCalendar(true)}
			/>
			<div className="absolute right-2 top-0.5 pt-1.5 text-gray-400">
				<TbCalendarEvent size={15} />
			</div>
			{showCalendar && (
				<div
					className="b fixed inset-0 z-10 bg-transparent"
					onClick={() => setShowCalendar(false)}
				></div>
			)}
			<DropDown
				trigger={showCalendar}
				styles="x-center bg-white dark:bg-gray-900 dark:border-gray-700 px-1 absolute z-20 top-10 flex flex-col gap-3 w-72 pt-3 pl-3 pb-3 rounded-md border border-gray-300"
			>
				<Calendar getDate={props.setDate} />
			</DropDown>
		</div>
	);
}
