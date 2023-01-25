import { BiFilter } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/store";
import Menu from "../../components/elements/Menu";
import classNames from "../../utilities/ClassNames";

type Props = {
	filterMenu: boolean;
	setFilterMenu: any;
	keyword: string;
	setKeyword: any;
	filter: string;
	isFetching: boolean;
	filterTypes: string[];
	hideMenu: any;
	toggleFilterMenu: any;
	setFilter: any;
};

export default function Header({
	filterMenu,
	keyword,
	filter,
	filterTypes,
	setKeyword,
	hideMenu,
	toggleFilterMenu,
	setFilter,
}: Props) {
	return (
		<div className="flex items-center p-3">
			<h1 className="pl-3 text-lg font-bold">Assigned to me</h1>
			<div className="flex-1" />
			<div className="mr-2">
				<Menu
					hide={hideMenu}
					isOpen={filterMenu}
					styles="top-10 right-0"
					button={
						<div
							onClick={toggleFilterMenu}
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
							className="mb-2 select-none rounded-md border border-gray-300 bg-white py-2 px-3 text-base leading-tight duration-300 focus:border-indigo-600 focus:ring-indigo-600 dark:border-slate-700 dark:bg-slate-800"
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
			{/* {user.roles.includes("Admin") && (
				<Button primary disabled={isFetching} handleClick={() => openModal()}>
					<div className="flex items-center gap-1">
						<TbPlus className="md:hidden" size={20} />
						<span className="hidden md:flex">New Work Item</span>
					</div>
				</Button>
			)} */}
		</div>
	);
}
