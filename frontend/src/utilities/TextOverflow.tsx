const TextOverflow = (text: any, words: number) => {
	const array = text.split(" ");
	return array.slice(0, words).join(" ");
};

export default TextOverflow;
