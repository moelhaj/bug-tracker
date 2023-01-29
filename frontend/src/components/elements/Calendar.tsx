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

	return (
		<div className="flex w-full flex-col text-sm">
			<div className="mb-5 flex items-center justify-between px-3">
				<FiChevronLeft
					onClick={() => setToday(today.month(today.month() - 1))}
					className="cursor-pointer duration-300 hover:text-gray-400 dark:hover:text-gray-200"
					size={18}
				/>
				<h1 className="pl-2">
					{months[today.month()]}, {today.year()}
				</h1>
				<FiChevronRight
					onClick={() => setToday(today.month(today.month() + 1))}
					className="cursor-pointer duration-300 hover:text-gray-400 dark:hover:text-gray-200"
					size={18}
				/>
			</div>
			<div className="grid w-full grid-cols-7">
				{days.map((day, index) => (
					<h1
						className="grid h-7 select-none place-content-center text-sm font-bold text-gray-600 dark:text-gray-100"
						key={`day-${index}`}
					>
						{day}
					</h1>
				))}
			</div>
			<div className="grid h-full w-full grid-cols-7">
				{generateDate(today.month(), today.year()).map(
					({ date, currentMonth, today }: any, index: number): any => {
						return (
							<div key={`cal-${index}`} className="grid h-8 place-content-center">
								<h1
									className={classNames(
										selectedDate.toDate().toDateString() ===
											date.toDate().toDateString() &&
											selectedDate.toDate().toDateString() !==
												currentDate.toDate().toDateString()
											? "bg-gray-100 dark:bg-gray-700"
											: "bg-white dark:bg-gray-900",
										today
											? "bg-indigo-600 text-white hover:bg-indigo-600 dark:bg-indigo-600"
											: currentMonth
											? "bg-white text-gray-500 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
											: "cursor-default text-gray-300 hover:bg-white dark:bg-gray-900 dark:text-gray-700",
										"grid h-8 w-8 cursor-pointer place-content-center rounded-full text-sm duration-300"
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
