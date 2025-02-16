import {
	TOptionsBaseUnit,
	TOptionsDerivedUnit,
} from '../../../src/calendarius';

export const expectedDefinition = new Map<
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
]);
