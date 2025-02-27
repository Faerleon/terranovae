export default function extractKeysFromString(template: string): string[] {
	return [...template.matchAll(/\{(.*?)}/g)].map((r) => r[1]);
}
