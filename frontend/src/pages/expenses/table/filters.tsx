import { Column } from "@tanstack/react-table";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { BsCheck, BsPlusCircle } from "react-icons/bs";
import { FiX } from "react-icons/fi";
import classNames from "utils/classNames";

interface DataTableFacetedFilter<TData, TValue> {
	column?: Column<TData, TValue>;
	title?: string;
	options: {
		label: string;
		value: string;
		icon?: React.ComponentType<{ className?: string }>;
	}[];
}

export function Filters({ data, options, filters, setFilters }: any) {
	return (
		<>
			{data && data.length > 0 && (
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							size="sm"
							className={classNames(
								filters?.length > 0 ? "pr-0" : "pr-2",
								"bg-dark border-slate h-8 border-dashed pl-2"
							)}
						>
							<BsPlusCircle className="mr-2 h-4 w-4" />
							Category
							{filters?.length > 0 && (
								<>
									<Separator orientation="vertical" className="mx-2 h-4" />
									<span
										className="cursor-pointer rounded-sm px-1 font-normal duration-300 hover:text-rose-400"
										onClick={(event: any) => {
											event.stopPropagation();
											setFilters([]);
										}}
									>
										<FiX size={20} />
									</span>
								</>
							)}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="border-slate w-[200px] p-0" align="start">
						<Command className="bg-dark border-slate">
							<CommandList>
								<CommandEmpty>No results found.</CommandEmpty>
								<CommandGroup>
									{options.map((option: any) => {
										const isSelected = filters?.includes(option?.value);
										return (
											<CommandItem
												className="cursor-pointer"
												key={option?.value}
												onSelect={() => {
													if (!filters?.includes(option?.value)) {
														setFilters([...filters, option?.value]);
													} else {
														setFilters(
															filters.filter(
																(item: any) =>
																	item !== option?.value
															)
														);
													}
												}}
											>
												<div
													className={cn(
														"border-primary mr-2 flex h-4 w-4 items-center justify-center rounded-sm border",
														isSelected
															? "bg-primary text-primary-foreground"
															: "opacity-50 [&_svg]:invisible"
													)}
												>
													<BsCheck className={cn("h-4 w-4")} />
												</div>
												{option?.icon && (
													<option.icon className="text-muted-foreground mr-2 h-4 w-4" />
												)}
												<span>{option?.label}</span>
											</CommandItem>
										);
									})}
								</CommandGroup>
							</CommandList>
						</Command>
					</PopoverContent>
				</Popover>
			)}
		</>
	);
}
