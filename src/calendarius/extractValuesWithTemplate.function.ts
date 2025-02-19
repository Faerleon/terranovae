/**
 * takes a template and a content string and extracts the value
 * @param template
 * @param content
 */
export default function extractValuesWithTemplate(
	template: string,
	content: string,
): Map<string, string> {
	const keys: string[] = [];

	// Escape all regex special characters in the template except for `{}` placeholders
	const escapedTemplate = template.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');

	// Restore `{key}` placeholders before replacing them with capture groups
	const pattern = escapedTemplate.replace(
		/\\\{(\w+)\\}/g,
		(_, key: string) => {
			keys.push(key);
			return '(.+?)'; // Capturing group for the value
		},
	);

	const matchRegex = new RegExp(`^${pattern}$`);
	const match = content.match(matchRegex);
	if (!match) throw new Error('CONTENT_NOT_MATCHING_TEMPLATE');

	const map = new Map<string, string>();
	keys.forEach((key, index) => {
		map.set(key, match[index + 1]);
	});
	return map;
}
