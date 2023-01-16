import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import storage from "redux-persist/lib/storage";
import { api } from "./api";
import authReducer from "./slices/authSlice";
import themeReducer from "./slices/themeSlice";

export const store: any = configureStore({
	reducer: {
		[api.reducerPath]: api.reducer,
		auth: persistReducer<RootState>(
			{
				key: "auth",
				storage,
				keyPrefix: "codex-",
			},
			authReducer
		),
		theme: persistReducer<RootState>(
			{
				key: "theme",
				storage,
				keyPrefix: "codex-",
			},
			themeReducer
		),
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }).concat(
			api.middleware
		),
	devTools: true,
});

export const persister = persistStore(store);
type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
