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
	['minute', { inBase: 60000 }],
	['hour', { inBase: 3600000 }],
	['day', { inBase: 86400000 }],
	['week', { inBase: 604800000 }],
	['month_feb', { inBase: 2419200000 }],
	[
		'month_feb_leap',
		{
			inBase: 2505600000,
		},
	],
	['month_short', { inBase: 2592000000 }],
	['month_long', { inBase: 2678400000 }],
	[
		'year',
		{
			inBase: expect.any(Function),
		},
	],
]);
