export const parseFilters = (array: any) => {
	const set = new Set(array);
	const _array = [...set];
	const data = _array
		.filter((item: any) => item?.length > 0)
		.map((item: any) => ({
			label: item.toString(),
			value: item.toString().toLowerCase(),
		}));
	return data;
};
