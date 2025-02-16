/**
 * takes a template and a content string and extracts the value
 * @param template
 * @param content
 */
export default function extractValuesWithTemplate(
	template: string,
	content: string,
): Map<string, string> {
	const regex = /\{(\w+)}/g;
	const keys: string[] = [];
	const pattern: string = template.replace(regex, (_, key: string) => {
		keys.push(key);
		return '(.+?)';
	});

	const matchRegex = new RegExp(`^${pattern}$`);
	const match = content.match(matchRegex);
	if (!match) throw new Error('CONTENT_NOT_MATCHING_TEMPLATE');

	const map = new Map<string, string>();
	keys.forEach((key, index) => {
		map.set(key, match[index + 1]);
	});
	return map;
}
