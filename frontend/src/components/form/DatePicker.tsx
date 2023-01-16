import { useEffect, useState } from "react";
import dayjs from "dayjs";
import TextInput from "./TextInput";
import Calendar from "../elements/Calendar";
import { TbCalendarEvent } from "react-icons/tb";
import classNames from "../../utilities/ClassNames";
import DropDown from "../elements/DropDown";

export default function DatePicker() {
	const [date, setDate] = useState("");
	const [showCalendar, setShowCalendar] = useState(false);

	useEffect(() => {
		if (date !== "") setShowCalendar(false);
	}, [date]);

	return (
		<div className="w-80 relative z-20">
			<div
				className={classNames(
					showCalendar || date !== "" ? "-top-5 text-indigo-600" : "top-2",
					"absolute z-20 pl-3 duration-300 text-sm"
				)}
			>
				Select Date
			</div>
			<div className="h-9 w-80 input relative z-20 flex gap-2 items-center pr-4">
				<div>{date !== "" && dayjs(date).format("DD/MM/YYYY")}</div>
				<div
					onClick={() => setShowCalendar(prev => !prev)}
					className="cursor-pointer absolute z-20 p-1 rounded-md right-1 text-gray-400"
				>
					<TbCalendarEvent size={18} />
				</div>
			</div>
			{showCalendar && (
				<div
					className="fixed inset-0 bg-transparent"
					onClick={() => setShowCalendar(false)}
				></div>
			)}
			<DropDown
				trigger={showCalendar}
				styles="bg-white px-1 absolute z-20 top-10 flex flex-col gap-3 w-full pt-3 pl-3 pb-3 rounded-md border border-gray-300"
			>
				<Calendar getDate={setDate} />
			</DropDown>
		</div>
	);
}
