import { createUnitDefinition } from '../../src/calendarius/createUnitDefinition.function';
import { expectedDefinition } from './_data/expectedDefinition';

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
			definedSystem: expectedDefinition,
		});
	});
});
