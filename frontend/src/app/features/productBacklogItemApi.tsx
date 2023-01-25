import { api } from "../api";

type Filters = {
	take: number;
	skip: number;
	title: string;
	projectId: string | undefined;
};

type ProductBacklogItem = {
	id: number;
	title: string;
	details: string;
	state: string;
	tag: string;
	workItems: any;
	assignee: any;
	createdAt: Date;
};

type ProductBacklogItemResponse = {
	count: number;
	items: ProductBacklogItem[];
};

export const productBacklogItemApi = api.injectEndpoints({
	endpoints: builder => ({
		getProductBacklogItems: builder.query<ProductBacklogItemResponse, Filters>({
			query: (filters: any) => `/pbi?filters=${JSON.stringify(filters)}`,
			providesTags: result =>
				result
					? [
							...result.items.map(({ id }) => ({
								type: "ProductBacklogItem" as const,
								id,
							})),
							{ type: "ProductBacklogItem", id: "LIST" },
					  ]
					: [{ type: "ProductBacklogItem", id: "LIST" }],
		}),
		getProductBacklogItem: builder.query<ProductBacklogItem, string | undefined>({
			query: id => `/pbi/${id}`,
			providesTags: ["ProductBacklogItem"],
		}),
		addProductBacklogItem: builder.mutation({
			query: initialProductBacklogItem => ({
				url: "/pbi",
				method: "POST",
				body: {
					...initialProductBacklogItem,
				},
			}),
			invalidatesTags: [{ type: "ProductBacklogItem", id: "LIST" }],
		}),
		updateProductBacklogItem: builder.mutation({
			query: initialProductBacklogItem => ({
				url: "/pbi",
				method: "PATCH",
				body: {
					...initialProductBacklogItem,
				},
			}),
			invalidatesTags: (result, error, arg) => [{ type: "ProductBacklogItem", id: arg.id }],
		}),
	}),
});

export const {
	useAddProductBacklogItemMutation,
	useGetProductBacklogItemQuery,
	useGetProductBacklogItemsQuery,
	useUpdateProductBacklogItemMutation,
} = productBacklogItemApi;
