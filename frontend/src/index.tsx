import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";

import { Provider } from "react-redux";
import { store, persister } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<Provider store={store}>
		<PersistGate persistor={persister}>
			<HashRouter>
				<App />
			</HashRouter>
		</PersistGate>
	</Provider>
);
