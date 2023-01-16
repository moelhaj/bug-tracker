import { api } from "../api";

export const notificationsApi = api.injectEndpoints({
	endpoints: builder => ({
		getNotifications: builder.query<any, unknown>({
			query: () => "notifications",
			providesTags: [{ type: "Notifications", id: "List" }],
		}),
		readNotifications: builder.mutation({
			query: () => "notifications/read/all",
			invalidatesTags: ["Notifications"],
		}),
	}),
});

export const { useGetNotificationsQuery, useReadNotificationsMutation } = notificationsApi;
