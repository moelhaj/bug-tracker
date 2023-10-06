import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FiMoreVertical } from "react-icons/fi";
import { LuEdit, LuTrash2 } from "react-icons/lu";

export default function Menu({ row, setAction, setExpense }: any) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="h-8 w-8 p-0">
					<span className="sr-only">Open menu</span>
					<FiMoreVertical className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="border-slate">
				{/* Edit */}
				<DropdownMenuItem
					className="flex cursor-pointer items-center gap-2"
					onClick={() => {
						setExpense(row.original);
						setAction("edit");
					}}
				>
					<LuEdit />
					Edit
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<div
						onClick={() => {
							setExpense(row.original);
							setAction("delete");
						}}
						className="hover:text-red flex w-full cursor-pointer items-center gap-2 duration-300"
					>
						<LuTrash2 />
						Delete
					</div>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
