import { NotificationProvider } from "../hooks/useNotification";
import { AssignedProvider } from "../hooks/useAssigned";
import { ProjectProvider } from "../hooks/useProject";

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

const providers = [NotificationProvider, AssignedProvider, ProjectProvider];
export const ContextProvider = combineComponents(...providers);
