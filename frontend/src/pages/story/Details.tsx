export default function Details({ story }: any) {
	return (
		<div>
			<h1 className="text-lg font-bold">Title: {story?.title}</h1>
			<div className="mt-2 flex items-center gap-2">
				<img
					className="h-7 w-7 rounded-full object-contain"
					src={`https://mo-backend-issue-tracker.onrender.com/${story.assignee?.id}.png`}
					crossOrigin="anonymous"
					alt="avatar"
				/>
				<div className="flex flex-col py-2">
					<span className="text-sm leading-3 text-gray-700 dark:text-gray-100">
						{story.assignee.name}
					</span>
					<span className="text-xs leading-3 text-gray-400 dark:text-gray-200">
						{story.assignee.title}
					</span>
				</div>
			</div>
			<h1 className=" mt-2 font-bold">Details:</h1>
			<div className="y-scroll mt-3 max-h-80 overflow-hidden overflow-y-scroll">
				<p className="text-gray-500 dark:text-gray-300">{story?.details}</p>
			</div>
		</div>
	);
}
