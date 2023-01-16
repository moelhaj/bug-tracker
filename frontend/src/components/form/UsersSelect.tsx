import { useEffect, useState } from "react";
import classNames from "../../utilities/ClassNames";
import TextInput from "./TextInput";
import { TbX, TbChevronDown, TbChevronUp } from "react-icons/tb";
import { motion } from "framer-motion";

export default function UserSelect(props: any) {
	const [keyword, setKeyword] = useState("");
	const [filteredUsers, setFilteredUsers] = useState(props.users);
	const [showMenu, setShowMenu] = useState(false);

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

	const removeUser = (id: string) => {
		props.setSelectedUsers(props.selectedUsers.filter((x: any) => x.id !== id));
	};

	const isSelected = (id: string) =>
		props.selectedUsers.filter((x: any) => x.id === id).length > 0;

	const slideAnimation = {
		enter: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.3,
			},
			display: "flex",
		},
		exit: {
			opacity: 0,
			y: -10,
			transition: {
				duration: 0.1,
			},
			transitionEnd: {
				display: "none",
			},
		},
	};

	return (
		<div>
			<div className="relative">
				<TextInput
					type="text"
					value={keyword}
					handleChange={(e: any) => setKeyword(e.target.value)}
					label="Search"
				/>
				<div
					onClick={() => setKeyword("")}
					className="absolute left-36 top-3.5 ml-2 grid h-4 w-4 cursor-pointer place-content-center rounded-full bg-gray-100 text-gray-500 duration-300 hover:bg-gray-200 dark:bg-slate-800 dark:text-gray-100"
				>
					<TbX size={12} />
				</div>
			</div>
			<div className="y-scroll mt-5 h-48 overflow-hidden overflow-y-scroll rounded-md border border-gray-300 p-3 dark:border-slate-900">
				<div className="grid grid-cols-1 gap-2 md:grid-cols-2">
					{filteredUsers.map((user: any) => (
						<div
							onClick={() => selectUser(user)}
							className={classNames(
								isSelected(user.id)
									? "bg-indigo-600 text-white"
									: "bg-gray-100 dark:bg-slate-800",
								"flex cursor-pointer items-center gap-3 rounded-md py-2 px-3 text-sm"
							)}
							key={user.id}
						>
							<img
								className="h-7 w-7 rounded-full object-contain"
								src={`http://localhost:3500/${user?.id}.png`}
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
