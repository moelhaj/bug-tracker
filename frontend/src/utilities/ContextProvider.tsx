import { NotificationProvider } from "../hooks/useNotification";

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

const providers = [NotificationProvider];
export const ContextProvider = combineComponents(...providers);
