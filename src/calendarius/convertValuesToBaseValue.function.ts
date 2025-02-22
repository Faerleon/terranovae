import {
	TOptionsBaseUnit,
	TOptionsDerivedUnit,
	TStoredDefinitionUnitMap,
} from './types';

/**
 * converts a value map into a base system.
 * @param values
 * @param definedSystem
 */
export default function convertValuesToBaseValue(
	values: Map<string, number>,
	definedSystem: TStoredDefinitionUnitMap,
): number {
	let sum = 0;
	const maxLoops = 100;
	let currentLoops = 0;

	Object.freeze(values);
	const localValues: Map<string, number> = new Map<string, number>(values);

	console.log('initial', localValues);

	while (localValues.size > 0) {
		// iterate through each unit, convert it to child and add it to the sum if it is the base unit
		for (const [unitName, unitValue] of localValues) {
			// if it is a derived unit, store the children
			const unitFromSystem = definedSystem.get(unitName);
			if (unitFromSystem === undefined) {
				throw new Error('ERR_UNITS_NOT_FOUND');
			}

			// if base unit, just ad the value
			if ('base' in unitFromSystem) sum += unitValue;

			// if derived unit, just store all the child values
			if ('definedBy' in unitFromSystem) {
				const childValues = (unitFromSystem as TOptionsDerivedUnit)
					.definedBy;
				// definition can be an array or a function
				const children = Array.isArray(childValues)
					? childValues
					: childValues(unitValue, values);

				// these are the values from the definition
				for (const [childUnitName, childUnitValue] of children) {
					const existingValue = localValues.get(childUnitName) ?? 0;
					localValues.set(
						childUnitName,
						existingValue + childUnitValue * unitValue,
					);
				}
			}

			localValues.delete(unitName);
		}

		// safety to prevent infinite loops
		if (currentLoops++ >= maxLoops) {
			console.log('MAX_LOOP');
			break;
		}
	}
	return sum;
}
