import { NoContentSkeleton } from "../../components/elements/Skeletons";
import Row from "./Row";

export default function Table(props: any) {
	const { workItems, setState } = props;
	return (
		<>
			<div className="x-scroll mt-7 w-full overflow-hidden overflow-x-scroll rounded-md border border-gray-200 bg-white dark:border-none dark:bg-gray-800">
				<table className="relative z-10 w-full border-collapse text-sm sm:text-base">
					<thead>
						<tr className="border-b border-b-gray-200 text-left font-bold dark:border-none">
							<td>Title</td>
							<td>Type</td>
							<td>State</td>
						</tr>
					</thead>
					<tbody>
						{workItems && workItems.length < 1 && (
							<tr className="w-full">
								<td className="w-full" colSpan={6}>
									<div className="flex w-full items-center justify-center py-20">
										<NoContentSkeleton message="No items found" />
									</div>
								</td>
							</tr>
						)}
						{workItems &&
							workItems.length > 0 &&
							workItems.map((item: any) => {
								return <Row key={item.id} item={item} setState={setState} />;
							})}
					</tbody>
				</table>
			</div>
		</>
	);
}
