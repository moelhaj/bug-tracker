import { MdOutlineFilterList } from "react-icons/md";
import { TbArrowLeft, TbPlus } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/store";
import Button from "../../components/elements/Button";
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
	openModal: any;
};

export default function Header({
	filterMenu,
	keyword,
	filter,
	isFetching,
	filterTypes,
	setKeyword,
	openModal,
	hideMenu,
	toggleFilterMenu,
	setFilter,
}: Props) {
	const { user } = useAppSelector((state: any) => state.auth);
	const navigate = useNavigate();
	return (
		<div className="mt-5 flex items-center p-3">
			<Button primary handleClick={() => navigate("/projects")}>
				<div className="flex items-center gap-1">
					<TbArrowLeft className="md:hidden" size={20} />
					<span className="hidden md:flex">Back</span>
				</div>
			</Button>
			<div className="flex-1" />
			<div className="mr-2">
				<Menu
					hide={hideMenu}
					isOpen={filterMenu}
					styles="top-10 right-0"
					button={
						<div
							onClick={toggleFilterMenu}
							className="block cursor-pointer rounded-md bg-indigo-600 py-1.5 px-2 text-white duration-300 hover:bg-indigo-800"
						>
							<MdOutlineFilterList size={17} />
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
			{user.roles.includes("Admin") && (
				<Button primary disabled={isFetching} handleClick={() => openModal()}>
					<div className="flex items-center gap-1">
						<TbPlus className="md:hidden" size={20} />
						<span className="hidden md:flex">New Work Item</span>
					</div>
				</Button>
			)}
		</div>
	);
}
