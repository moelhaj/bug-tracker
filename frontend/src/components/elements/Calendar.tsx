import { useState } from "react";
import dayjs from "dayjs";
import classNames from "../../utilities/ClassNames";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Calendar(props: any) {
	const currentDate = dayjs();
	const [today, setToday] = useState(currentDate);
	const [selectedDate, setSelectedDate] = useState(currentDate);

	const generateDate = (month = dayjs().month(), year = dayjs().year()) => {
		const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
		const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");

		const arrayOfDate = [];

		// prefix dates
		for (let i = 0; i < firstDateOfMonth.day(); i++) {
			arrayOfDate.push({ currentMonth: false, date: firstDateOfMonth.day(i) });
		}

		// month dates
		for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
			arrayOfDate.push({
				currentMonth: true,
				date: firstDateOfMonth.date(i),
				today:
					firstDateOfMonth.date(i).toDate().toDateString() ===
					dayjs().toDate().toDateString(),
			});
		}

		// remaining dates
		const remaining = 42 - arrayOfDate.length;

		for (let i = lastDateOfMonth.date() + 1; i <= lastDateOfMonth.date() + remaining; i++) {
			arrayOfDate.push({
				currentMonth: false,
				date: lastDateOfMonth.date(i),
			});
		}

		return arrayOfDate;
	};

	const days = ["S", "M", "T", "W", "T", "F", "S"];
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	// const handleSelect = (selectedDate: any, date: any) => {
	// 	props.getDate(selectedDate);
	// 	setSelectedDate(date);
	// };

	return (
		<div className="flex w-full flex-col text-sm">
			<div className="flex justify-between items-center mb-3 px-3">
				<h1 className="pl-2">
					{months[today.month()]}, {today.year()}
				</h1>
				<div className="flex items-center gap-7">
					<FiChevronLeft
						onClick={() => setToday(today.month(today.month() - 1))}
						className="cursor-pointer hover:text-gray-400 duration-300"
						size={18}
					/>
					<span
						onClick={() => setToday(currentDate)}
						className="select-none cursor-pointer hover:text-gray-400 duration-300"
					>
						Today
					</span>
					<FiChevronRight
						onClick={() => setToday(today.month(today.month() + 1))}
						className="cursor-pointer hover:text-gray-400 duration-300"
						size={18}
					/>
				</div>
			</div>
			<div className="w-full grid grid-cols-7">
				{days.map((day, index) => (
					<h1
						className="select-none font-bold text-sm text-gray-600 h-7 grid place-content-center"
						key={`day-${index}`}
					>
						{day}
					</h1>
				))}
			</div>
			<div className="w-full h-full grid grid-cols-7">
				{generateDate(today.month(), today.year()).map(
					({ date, currentMonth, today }: any, index: number): any => {
						return (
							<div key={`cal-${index}`} className="h-8 grid place-content-center">
								<h1
									className={classNames(
										selectedDate.toDate().toDateString() ===
											date.toDate().toDateString() &&
											selectedDate.toDate().toDateString() !==
												currentDate.toDate().toDateString()
											? "bg-gray-100"
											: "bg-white",
										today
											? "bg-indigo-600 text-white hover:bg-indigo-600"
											: currentMonth
											? "hover:bg-gray-100 text-gray-500 bg-white"
											: "text-gray-300 hover:bg-white cursor-default",
										"text-sm h-7 w-7 grid place-content-center rounded-full duration-300 cursor-pointer"
									)}
									onClick={() => {
										if (currentMonth) {
											props.getDate(date.$d.toString());
											setSelectedDate(date);
										}
									}}
								>
									{date.date()}
								</h1>
							</div>
						);
					}
				)}
			</div>
		</div>
	);
}
