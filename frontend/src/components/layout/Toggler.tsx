export default function Toggler(props: any) {
	return (
		<div
			className="relative z-50 flex cursor-pointer flex-col gap-1 rounded duration-300"
			onClick={props.toggleMenu}
		>
			<div
				className="h-0.5 rounded-full bg-gray-800 duration-300 dark:bg-white"
				style={{ width: props.menu ? "1rem" : "1.2rem" }}
			/>
			<div
				className="h-0.5 rounded-full bg-gray-800 duration-300 dark:bg-white"
				style={{ width: props.menu ? "0.7rem" : "1.2rem" }}
			/>
			<div
				className="h-0.5 rounded-full bg-gray-800 duration-300 dark:bg-white"
				style={{ width: "1.2rem" }}
			/>
		</div>
	);
}
