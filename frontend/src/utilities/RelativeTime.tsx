import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const RelativeTime = (date: string) => {
	dayjs.extend(relativeTime);
	return dayjs(date).fromNow();
};

export default RelativeTime;
