import React from "react";
import {
	ErrorSkeleton,
	LoadingSkeleton,
	NoContentSkeleton,
} from "../../components/elements/Skeletons";

export default function Test() {
	return (
		<div className="p-3">
			<div className="grid place-content-center py-40">
				<LoadingSkeleton />
			</div>
		</div>
	);
}
