import { TOptionsBaseUnit, TStoredDefinitionUnitMap } from './types';

/**
 * converts a value map into a base system.
 * @param values
 * @param definedSystem
 * @param sum
 * @param depth
 */
export default function convertValuesToBaseValue(
	values: Map<string, number>,
	definedSystem: TStoredDefinitionUnitMap,
	sum: number = 0,
): number {
	// get base unit name
	let baseUnitName: string | undefined = undefined;
	for (const [unitName, unitOptions] of definedSystem) {
		if ((unitOptions as TOptionsBaseUnit).base) {
			baseUnitName = unitName;
			break;
		}
	}

	console.log(values, sum);
	while (!hasOnlyBaseUnitRemaining(values, baseUnitName)) {
		// iterate through each unit, convert it to child and add it to the sum if it is the base unit
		break;
	}
	return sum;
}

/**
 *
 * @param values
 * @param baseUnitName
 */
function hasOnlyBaseUnitRemaining(
	values: Map<string, number>,
	baseUnitName: string | undefined,
): boolean {
	for (const [name, value] of values) {
		if (name !== baseUnitName && value > 0) return false;
	}
	return true;
}
