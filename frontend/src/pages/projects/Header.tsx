import React from "react";
import { TbPlus } from "react-icons/tb";
import { useAppSelector } from "../../app/store";
import Button from "../../components/elements/Button";
import TextInput from "../../components/form/TextInput";

type Props = {
	keyword: string;
	setKeyword: (arg: any) => string;
	isFetching: boolean;
	openModal: () => any;
};

export default function Header({ keyword, setKeyword, isFetching, openModal }: Props) {
	const { user } = useAppSelector((state: any) => state.auth);
	return (
		<div className="mt-5 flex items-center py-3">
			<TextInput
				type="text"
				label="Search"
				value={keyword}
				handleChange={(e: any) => setKeyword(e.target.value)}
			/>
			<div className="flex-1" />
			{user.roles.includes("Admin") && (
				<Button primary disabled={isFetching} handleClick={openModal}>
					<div className="flex items-center gap-1">
						<TbPlus size={20} />
						<span className="hidden md:flex">New Project</span>
					</div>
				</Button>
			)}
		</div>
	);
}
