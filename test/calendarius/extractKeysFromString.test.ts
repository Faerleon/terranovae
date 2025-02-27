import extractKeysFromString from '../../src/calendarius/functions/extractKeysFromString.function';

describe('extractKeysFromString', () => {
	it('should extract keys from string', () => {
		const result = extractKeysFromString('{year}-{month}-{day}');
		expect(result).toStrictEqual(['year', 'month', 'day']);
	});

	it('should extract keys from string 2', () => {
		const result = extractKeysFromString(
			'My name is {name} and I am {age} years old',
		);
		expect(result).toStrictEqual(['name', 'age']);
	});
});
