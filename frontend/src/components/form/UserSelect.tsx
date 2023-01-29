import { useEffect, useState } from "react";
import classNames from "../../utilities/ClassNames";
import { TbChevronDown, TbChevronUp } from "react-icons/tb";
import DropDown from "../elements/DropDown";

export default function UserSelect(props: any) {
	const [keyword, setKeyword] = useState("");
	const [users, setUsers] = useState(props.users);
	const [showMenu, setShowMenu] = useState(false);

	useEffect(() => {
		if (keyword !== "") {
			setUsers(
				props.users.filter((x: any) =>
					x.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
				)
			);
		} else {
			setUsers(props.users);
		}
	}, [keyword]);

	return (
		<div className="relative w-full">
			<input
				type="text"
				className="input w-full cursor-pointer"
				placeholder={props.label}
				value={props.user?.assigneeName}
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
				styles="bg-white dark:bg-gray-900 dark:border-gray-700 px-1 absolute z-20 top-10 flex flex-col gap-3 w-full pt-3 pl-3 pb-3 rounded-md border border-gray-300"
			>
				<div>
					<input
						type="text"
						value={keyword}
						className="input w-full"
						onChange={(e: any) => setKeyword(e.target.value)}
						placeholder="Search"
					/>
				</div>
				<div className="grid grid-cols-1 gap-2 md:grid-cols-2">
					{users?.map((user: any) => (
						<div
							onClick={() => {
								setShowMenu(false);
								setKeyword("");
								props.setUser(user);
							}}
							className={classNames(
								props.user.id === user.id
									? "bg-indigo-600 text-white"
									: "bg-gray-100 dark:bg-gray-800",
								"flex cursor-pointer items-center gap-3 rounded-md py-2 px-3 text-sm"
							)}
							key={user.id}
						>
							<img
								className="h-7 w-7 rounded-full object-contain"
								src={`https://mo-backend-issue-tracker.onrender.com/${user?.id}.png`}
								crossOrigin="anonymous"
								alt="avatar"
							/>
							<div className="flex flex-col leading-3">
								<p>{user.name}</p>
								<p className="text-xs">{user.title}</p>
							</div>
						</div>
					))}
				</div>
			</DropDown>
		</div>
	);
}
