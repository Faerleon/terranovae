import { TOptionsBaseUnit, TOptionsDerivedUnit } from '../../src/calendarius';
import { createUnitDefinition } from '../../src/calendarius/createUnitDefinition.function';

describe('Calendarius', () => {
	const generatedDefinition = createUnitDefinition(({ define, base }) => {
		base('millisecond');
		define('second', [['millisecond', 1000]]);
		define('minute', [['second', 60]]);
		define('hour', [['minute', 60]]);
		define('day', [['hour', 24]]);
		define('week', [['day', 7]]);
		define('month_feb', [['day', 28]]);
		define('month_feb_leap', [['day', 29]]);
		define('month_short', [['day', 30]]);
		define('month_long', [['day', 31]]);
		define('year', [
			['month_long', 1], // JAN
			['month_feb', 1], // FEB
			['month_long', 1], // MAR
			['month_short', 1], // APR
			['month_long', 1], // MAY
			['month_short', 1], // JUN
			['month_long', 1], // JUL
			['month_long', 1], // AUG
			['month_short', 1], // SEP
			['month_long', 1], // OCT
			['month_short', 1], // NOV
			['month_long', 1], // DEZ
		]);
		define('year_leap', [
			['month_long', 1], // JAN
			['month_feb_leap', 1], // FEB
			['month_long', 1], // MAR
			['month_short', 1], // APR
			['month_long', 1], // MAY
			['month_short', 1], // JUN
			['month_long', 1], // JUL
			['month_long', 1], // AUG
			['month_short', 1], // SEP
			['month_long', 1], // OCT
			['month_short', 1], // NOV
			['month_long', 1], // DEZ
		]);
		define('cycle', [
			['year', 3],
			['year_leap', 1],
		]);
	});

	it('should create a model correctly', () => {
		expect(generatedDefinition).toStrictEqual({
			definedSystem: new Map<
				string,
				TOptionsBaseUnit | TOptionsDerivedUnit
			>([
				['millisecond', { base: true }],
				['second', { inBase: 1000 }],
				['minute', { inBase: 1000 * 60 }],
				['hour', { inBase: 1000 * 60 * 60 }],
				['day', { inBase: 1000 * 60 * 60 * 24 }],
				['week', { inBase: 1000 * 60 * 60 * 24 * 7 }],
				['month_feb', { inBase: 1000 * 60 * 60 * 24 * 28 }],
				[
					'month_feb_leap',
					{
						inBase: 1000 * 60 * 60 * 24 * 29,
					},
				],
				['month_short', { inBase: 1000 * 60 * 60 * 24 * 30 }],
				['month_long', { inBase: 1000 * 60 * 60 * 24 * 31 }],
				[
					'year',
					{
						inBase:
							1000 * 60 * 60 * 24 * 31 + // JAN
							1000 * 60 * 60 * 24 * 28 + // FEB
							1000 * 60 * 60 * 24 * 31 + // MAR
							1000 * 60 * 60 * 24 * 30 + // APR
							1000 * 60 * 60 * 24 * 31 + // MAY
							1000 * 60 * 60 * 24 * 30 + // JUN
							1000 * 60 * 60 * 24 * 31 + // JUL
							1000 * 60 * 60 * 24 * 31 + // AUG
							1000 * 60 * 60 * 24 * 30 + // SEP
							1000 * 60 * 60 * 24 * 31 + // OCT
							1000 * 60 * 60 * 24 * 30 + // NOV
							1000 * 60 * 60 * 24 * 31, // DEC
					},
				],
				[
					'year_leap',
					{
						inBase:
							1000 * 60 * 60 * 24 * 31 + // JAN
							1000 * 60 * 60 * 24 * 29 + // FEB (leap year)
							1000 * 60 * 60 * 24 * 31 + // MAR
							1000 * 60 * 60 * 24 * 30 + // APR
							1000 * 60 * 60 * 24 * 31 + // MAY
							1000 * 60 * 60 * 24 * 30 + // JUN
							1000 * 60 * 60 * 24 * 31 + // JUL
							1000 * 60 * 60 * 24 * 31 + // AUG
							1000 * 60 * 60 * 24 * 30 + // SEP
							1000 * 60 * 60 * 24 * 31 + // OCT
							1000 * 60 * 60 * 24 * 30 + // NOV
							1000 * 60 * 60 * 24 * 31, // DEC
					},
				],
				[
					'cycle',
					{
						// 1 leap year
						inBase:
							1000 * 60 * 60 * 24 * 365 * 3 + // 3 normal years
							1000 * 60 * 60 * 24 * 366,
					},
				],
			]),
		});
	});
});
