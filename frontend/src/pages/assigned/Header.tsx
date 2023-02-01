import { BiFilter } from "react-icons/bi";
import Menu from "../../components/elements/Menu";
import classNames from "../../utilities/ClassNames";
import useAssigned from "../../hooks/useAssigned";

export default function Header() {
	const { filterTypes, setFilter, filter, keyword, setKeyword, filterMenu, setFilterMenu } =
		useAssigned();
	return (
		<div className="flex items-center justify-end">
			<div className="">
				<Menu
					hide={() => setFilterMenu(false)}
					isOpen={filterMenu}
					styles="top-10 right-0"
					button={
						<div
							onClick={() => setFilterMenu(!filterMenu)}
							className="block cursor-pointer rounded-md p-1 text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
						>
							<BiFilter size={25} />
						</div>
					}
				>
					<div className="flex w-40 flex-col gap-1 p-1">
						<input
							type="text"
							placeholder="Search"
							value={keyword}
							onChange={(e: any) => setKeyword(e.target.value)}
							className="mb-2 select-none rounded-md border border-gray-300 bg-white py-2 px-3 text-base leading-tight duration-300 focus:border-indigo-600 focus:ring-indigo-600 dark:border-gray-700 dark:bg-gray-800"
						/>
						{filterTypes &&
							filterTypes.map((item: any) => (
								<div
									key={item}
									onClick={() => {
										item === "All" ? setFilter("") : setFilter(item);
									}}
									className={classNames(
										filter === item ? "bg-gray-100 dark:bg-gray-900" : "",
										"flex cursor-pointer items-center gap-3 rounded-md p-2 duration-300 hover:bg-gray-100 dark:hover:bg-gray-900"
									)}
								>
									{item}
								</div>
							))}
					</div>
				</Menu>
			</div>
		</div>
	);
}
