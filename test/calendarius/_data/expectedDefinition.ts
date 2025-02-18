import {
	TOptionsBaseUnit,
	TOptionsDerivedUnit,
} from '../../../src/calendarius';

export const expectedDefinition = new Map<
	string,
	TOptionsBaseUnit | TOptionsDerivedUnit
>([
	['millisecond', { base: true }],
	['second', { definedBy: [['millisecond', 1000]] }],
	['minute', { definedBy: [['second', 60]] }],
	['hour', { definedBy: [['minute', 60]] }],
	['day', { definedBy: [['hour', 24]] }],
	['week', { definedBy: [['day', 7]] }],
	['month', { definedBy: expect.any(Function) }],
	[
		'year',
		{
			definedBy: [['month', 12]],
		},
	],
]);
