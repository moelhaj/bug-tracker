import { api } from "../api";

type Filters = {
	take: number;
	skip: number;
	title: string;
	projectId: string | undefined;
};

type Story = {
	id: number;
	title: string;
	details: string;
	status: string;
	assignee: any;
	createdAt: Date;
	workItems: any;
};

type StoriesResponse = {
	count: number;
	stories: Story[];
};

export const storiesApi = api.injectEndpoints({
	endpoints: builder => ({
		getStories: builder.query<StoriesResponse, Filters>({
			query: (filters: any) => `/stories?filters=${JSON.stringify(filters)}`,
			providesTags: result =>
				result
					? [
							...result.stories.map(({ id }) => ({
								type: "Stories" as const,
								id,
							})),
							{ type: "Stories", id: "LIST" },
					  ]
					: [{ type: "Stories", id: "LIST" }],
		}),
		getStory: builder.query<Story, string | undefined>({
			query: id => `/stories/${id}`,
			providesTags: ["Stories"],
		}),
		addStory: builder.mutation({
			query: item => ({
				url: "/stories",
				method: "POST",
				body: {
					...item,
				},
			}),
			invalidatesTags: ["Stories", "Projects"],
		}),
		updateStory: builder.mutation({
			query: item => ({
				url: `/stories/${item.id}`,
				method: "put",
				body: {
					...item,
				},
			}),
			invalidatesTags: ["Stories", "Projects"],
		}),
	}),
});

export const { useGetStoryQuery, useGetStoriesQuery, useAddStoryMutation, useUpdateStoryMutation } =
	storiesApi;
