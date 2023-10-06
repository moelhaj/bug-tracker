import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { removeCredentials } from "app/slices/userSlice";
import { useAppDispatch } from "app/store";
import Avatar from "assets/avatar.png";
import { useNavigate } from "react-router-dom";

export default function Header() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const logout = () => {
		dispatch(removeCredentials());
		navigate("/login");
	};

	return (
		<div className="flex items-center justify-between border-b p-3">
			<div className="text-lg font-bold">Expenses Calculator</div>

			<div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<div className="grid h-10 w-10 cursor-pointer place-content-center rounded-full bg-gray-300">
							<img src={Avatar} width={30} height={30} alt="avatar" />
						</div>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="mr-3 w-44">
						<DropdownMenuItem className="cursor-pointer" onClick={logout}>
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
}
