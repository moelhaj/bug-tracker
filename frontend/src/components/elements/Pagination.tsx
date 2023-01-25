import { useEffect, useState } from "react";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";
import classNames from "../../utilities/ClassNames";

type Props = {
	page: number;
	count: number;
	rowsPerPage: number;
	setPage: any;
};

const Pagination = ({ count, page, setPage, rowsPerPage }: Props) => {
	const [one, setOne] = useState(1);
	const [of, setOf] = useState(rowsPerPage);
	const pages = [...Array(Math.ceil(count / rowsPerPage)).keys()];

	useEffect(() => {
		if (rowsPerPage * (page + 1) > count) {
			setOf(count);
		} else {
			setOf(rowsPerPage * (page + 1));
		}
		if (page === 0) {
			setOne(1);
		} else {
			setOne(page * rowsPerPage + 1);
		}
	}, [page]);

	const handlePrev = () => (page > 0 ? setPage(page - 1) : null);
	const handleNext = () => (page < pages.length - 1 ? setPage(page + 1) : null);

	return (
		<div className="flex items-center justify-center md:justify-end">
			<div className="flex items-center gap-1">
				<div>{one}</div>
				<div>-</div>
				<div>{of}</div>
			</div>
			<div className="mx-2">of</div>
			<div>{count}</div>
			<div className="ml-4 flex gap-2">
				<div
					onClick={handlePrev}
					className={classNames(
						page <= 0
							? "cursor-default text-gray-400"
							: "cursor-pointer hover:text-gray-400 dark:hover:text-gray-200",
						"grid h-7 w-7  place-content-center duration-300"
					)}
				>
					<TbChevronLeft size={20} />
				</div>
				<div
					onClick={handleNext}
					className={classNames(
						page >= pages.length - 1
							? "cursor-default text-gray-400"
							: "cursor-pointer hover:text-gray-400 dark:hover:text-gray-200",
						"grid h-7 w-7  place-content-center duration-300"
					)}
				>
					<TbChevronRight size={20} />
				</div>
			</div>
		</div>
	);
};

export default Pagination;
