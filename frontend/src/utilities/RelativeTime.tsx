import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const RelativeTime = (date: any) => {
	dayjs.extend(relativeTime);
	return dayjs(date).fromNow();
};

export default RelativeTime;
