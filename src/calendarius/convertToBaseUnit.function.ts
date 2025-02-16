import {
	TArgUnitDefinitionFunction,
	TOptionsBaseUnit,
	TOptionsDerivedUnit,
	TStoredDefinitionUnitMap,
} from './types';

/**
 * helper function that converts the existing unit into a the base unit
 * @param definitionFragment a unit by name and count
 * @param definedSystem all currently existing units
 */
export function convertToBaseUnit(
	definitionFragment: [string, number],
	definedSystem: TStoredDefinitionUnitMap,
): number {
	const [name, value] = definitionFragment;
	const child = definedSystem.get(name);

	// if its the base unit, just return it
	if ((child as TOptionsBaseUnit).base) return value;

	const baseUnitRaw: number | TArgUnitDefinitionFunction = (
		child as TOptionsDerivedUnit
	).inBase;

	// if its a static derivation value, we can just calculate it
	if (typeof baseUnitRaw === 'number') return baseUnitRaw * value;

	// if its a function, we have to resolve it
	throw new Error('unit is not a number but should be at this point');
}
