const TextOverflow = (text: string, words: number) => {
	const array = text.split(" ");
	return `${array.slice(0, words).join(" ")} ${array.length > words ? "..." : ""}`;
};

export default TextOverflow;
