import convertValuesToBaseValue from '../../src/calendarius/convertValuesToBaseValue.function';
import { createUnitDefinition } from '../../src/calendarius';
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
			define('month', (rawMonths: number) => {
				let totalDays: number = 0;
				let currentMonth = 1;
				let currentYear = 1;

				for (let i = 1; i <= rawMonths; i++) {
					// figure out how many days in currentMonth / currentYear:
					totalDays += retrieveDaysOfMonth(currentMonth, currentYear);

					// move to the next month
					currentMonth++;
					if (currentMonth > 12) {
						currentMonth = 1;
						currentYear++;
					}
				}

				return [['day', totalDays]];
			});
			define('year', [['month', 12]]);

			sequence('time', '{hour}:{minute}:{second}');
			sequence('date', '{day}.{month}.{year}');
			sequence('year', '{year}');
		},
	);

	it('should create a model correctly', () => {
		expect(generatedDefinition).toStrictEqual({
			definedSystem: expectedDefinition,
			create: expect.any(Function),
		});
	});

	it('should convert single values correctly', () => {
		const result = generatedDefinition.create('year', '1');
		expect(result).toStrictEqual({
			patternName: 'year',
			valueInBaseUnit: 31536000000,
			units: ['year'],
		});
	});

	it('should create unit instances correctly (time)', () => {
		const myTime = generatedDefinition.create('time', '11:32:42');
		expect(myTime).toStrictEqual({
			patternName: 'time',
			valueInBaseUnit: 41562000,
			units: ['hour', 'minute', 'second'],
		});
	});

	it('should create unit instances correctly (date))', () => {
		const myDate = generatedDefinition.create('date', '24.12.1995');
		expect(myDate).toStrictEqual({
			patternName: 'date',
			valueInBaseUnit: 62989660800000,
			units: ['day', 'month', 'year'],
		});
	});

	it('should convert value maps to a base value', () => {
		const values = new Map<string, number>([
			['hour', 6],
			['minute', 32],
			['second', 40],
		]);
		const result = convertValuesToBaseValue(
			values,
			generatedDefinition.definedSystem,
		);

		expect(result).toStrictEqual(23560000);
	});
});

function isLeapYear(rawValue: number): boolean {
	if (typeof rawValue !== 'number' || !Number.isInteger(rawValue))
		throw new Error('Input must be an integer.');

	return (rawValue % 4 === 0 && rawValue % 100 !== 0) || rawValue % 400 === 0;
}

function retrieveDaysOfMonth(month: number, year: number): number {
	if ([2].includes(month)) return isLeapYear(year) ? 29 : 28;
	if ([1, 3, 5, 7, 8, 10, 12].includes(month)) return 31;
	if ([4, 6, 9, 11].includes(month)) return 30;
	throw new Error(`INVALID_INPUT_MONTH: ${month}`);
}
