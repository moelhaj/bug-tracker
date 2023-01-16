import { Fragment } from "react";
import classNames from "../../utilities/ClassNames";
import { TbCheck } from "react-icons/tb";
import Button from "../elements/Button";

export default function Stepper(props: any) {
	return (
		<div className="flex h-full w-full flex-col justify-between">
			{/* Stepper */}
			<div className="flex w-full items-center text-xs">
				{props.steps.map((_: any, current: number) => (
					<Fragment key={current}>
						<div className="flex flex-col items-center justify-center gap-2">
							<div
								className={classNames(
									props.step > current + 1
										? "bg-indigo-600"
										: props.step >= current + 1
										? "bg-indigo-300"
										: "bg-gray-200 dark:bg-slate-600",
									"grid h-5 w-5 place-content-center rounded-full"
								)}
							>
								<div
									className={classNames(
										props.step === current + 1
											? "bg-indigo-600"
											: props.step > current + 1
											? "bg-indigo-600"
											: "bg-gray-300 dark:bg-slate-700",
										"grid h-3 w-3 place-content-center rounded-full text-white"
									)}
								>
									{props.step > current + 1 && <TbCheck size={16} />}
								</div>
							</div>
							<div
								className={classNames(
									props.step >= current + 1
										? "text-indigo-600 dark:text-indigo-300"
										: "text-gray-400 dark:text-gray-200",
									"text-xs"
								)}
							>
								{props.steps[current]}
							</div>
						</div>
						{current + 1 !== props.steps.length && (
							<div
								className={classNames(
									props.step > current + 1
										? "border-t-indigo-600"
										: "border-t-gray-200",
									"mb-5 flex-1 border-t border-dashed"
								)}
							></div>
						)}
					</Fragment>
				))}
			</div>

			{/* Form */}
			<div className="h-80">{props.children}</div>

			{/* Controls */}
			<div className="mt-5">
				<div className="flex w-full items-center justify-between">
					{props.step !== 1 && (
						<Button secondary handleClick={props.prevStep}>
							Pervious
						</Button>
					)}
					<div className="flex-1"></div>
					{props.step !== props.steps.length && (
						<Button handleClick={props.nextStep} primary>
							Next
						</Button>
					)}
					{props.step === props.steps.length && (
						<Button handleClick={props.handleSubmit} disabled={props.loading} primary>
							{props.submitText}
						</Button>
					)}
				</div>
			</div>
		</div>
	);
}
