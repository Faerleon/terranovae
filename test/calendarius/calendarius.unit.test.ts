import { createUnitDefinition } from '../../src/calendarius/createUnitDefinition.function';
import { expectedDefinition } from './_data/expectedDefinition';

describe('Calendarius', () => {
	const generatedDefinition = createUnitDefinition(
		({ define, base, sequence }) => {
			base('millisecond');
			define('second', [['millisecond', 1000]]);
			define('minute', [['second', 60]]);
			define('hour', [['minute', 60]]);
			define('day', [['hour', 24]]);
			define('week', [['day', 7]]);
			define(
				'month',
				(rawInput: number, allInputValues: Map<string, number>) => {
					const year = allInputValues.get('year');
					if (!year) throw new Error('ERR_MONTH_NO_YEAR_PROVIDED');

					if ([2].includes(rawInput))
						return isLeapYear(rawInput)
							? [['day', 29]]
							: [['day', 28]];
					if ([1, 3, 5, 7, 8, 10, 12].includes(rawInput))
						return [['day', 31]];
					if ([2, 4, 6, 9, 11].includes(rawInput))
						return [['day', 30]];
					throw new Error(`INVALID_INPUT_MONTH: ${rawInput}`);
				},
			);
			define('year', [['month', 12]]);

			sequence('time', '{hour}:{minute}:{second}');
			sequence('date', '{day}.{month}.{year}');
		},
	);

	it('should create a model correctly', () => {
		expect(generatedDefinition).toStrictEqual({
			definedSystem: expectedDefinition,
			create: expect.any(Function),
		});
	});

	it('should create unit instances correctly', () => {
		const myTime = generatedDefinition.create('time', '11:32:42');
		expect(myTime).toStrictEqual({
			raw: 41562000,
			units: ['hour', 'minute', 'second'],
		});
	});

	it('should create unit instances correctly with dynamic functions', () => {
		const myDate = generatedDefinition.create('date', '24.12.1995');
		expect(myDate).toStrictEqual({
			raw: 79718400000,
			units: ['day', 'month', 'year'],
		});
	});
});

function isLeapYear(rawValue: number): boolean {
	if (typeof rawValue !== 'number' || !Number.isInteger(rawValue))
		throw new Error('Input must be an integer.');

	return (rawValue % 4 === 0 && rawValue % 100 !== 0) || rawValue % 400 === 0;
}
