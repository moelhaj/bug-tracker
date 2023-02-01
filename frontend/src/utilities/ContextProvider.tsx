import { NotificationProvider } from "../hooks/useNotification";
import { AssignedProvider } from "../hooks/useAssigned";
import { WorkItemProvider } from "../hooks/useWorkItem";

const combineComponents = (...components: any[]) => {
	return components.reduce(
		(AccumulatedComponents, CurrentComponent) => {
			return ({ children }: { children: any }) => {
				return (
					<AccumulatedComponents>
						<CurrentComponent>{children}</CurrentComponent>
					</AccumulatedComponents>
				);
			};
		},
		({ children }: { children: any }) => <>{children}</>
	);
};

const providers = [NotificationProvider, AssignedProvider, WorkItemProvider];
export const ContextProvider = combineComponents(...providers);
