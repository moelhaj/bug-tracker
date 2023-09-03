import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import storage from "redux-persist/lib/storage";
import { appApi } from "./api";
import userReducer from "./slices/userSlice";
import appReducer from "./slices/appSlice";

export const store: any = configureStore({
	reducer: {
		[appApi.reducerPath]: appApi.reducer,
		user: persistReducer<RootState>(
			{
				key: "user",
				storage,
			},
			userReducer
		),
		app: persistReducer<RootState>(
			{
				key: "app",
				storage,
			},
			appReducer
		),
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }).concat(
			appApi.middleware
		),
	devTools: true,
});

export const persister = persistStore(store);
type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
