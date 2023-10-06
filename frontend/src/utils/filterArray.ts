export const filterArray = (filters: any, data: any, condition: string) => {
	const result: any = [];
	filters.forEach((filter: any) => {
		data.forEach((item: any) => {
			if (item[condition].toLowerCase() === filter.toLowerCase()) {
				result.push(item);
			}
		});
	});
	return result;
};
