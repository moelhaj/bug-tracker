import { useEffect, useState } from "react";
import classNames from "../../utilities/ClassNames";
import { TbX } from "react-icons/tb";

export default function UserSelect(props: any) {
	const [keyword, setKeyword] = useState("");
	const [filteredUsers, setFilteredUsers] = useState(props.users);

	useEffect(() => {
		if (keyword !== "") {
			setFilteredUsers(
				props.users.filter((x: any) =>
					x.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
				)
			);
		} else {
			setFilteredUsers(props.users);
		}
	}, [keyword]);

	const selectUser = (user: any) => {
		if (props.selectedUsers.filter((x: any) => x.id === user.id).length > 0) {
			props.setSelectedUsers(props.selectedUsers.filter((x: any) => x.id !== user.id));
		} else {
			props.setSelectedUsers([...props.selectedUsers, user]);
		}
	};

	const isSelected = (id: string) =>
		props.selectedUsers.filter((x: any) => x.id === id).length > 0;

	return (
		<div>
			<div className="relative">
				<input
					type="text"
					value={keyword}
					onChange={(e: any) => setKeyword(e.target.value)}
					placeholder="Search"
					className="input w-full"
				/>
				<div
					onClick={() => setKeyword("")}
					className="absolute right-2 top-1.5 grid cursor-pointer hover:text-indigo-600 dark:text-white"
				>
					<TbX size={18} />
				</div>
			</div>
			<div className="y-scroll mt-5 h-48 overflow-hidden overflow-y-scroll rounded-md border border-gray-300 pl-3 pt-3 pb-3 dark:border-gray-900">
				<div className="grid grid-cols-1 gap-2 md:grid-cols-2">
					{filteredUsers.map((user: any) => (
						<div
							onClick={() => selectUser(user)}
							className={classNames(
								isSelected(user.id)
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
			</div>
		</div>
	);
}
