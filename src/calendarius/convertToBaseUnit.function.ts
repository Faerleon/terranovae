import {
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
	if ((child as TOptionsBaseUnit).base) return value;
	return (child as TOptionsDerivedUnit).inBase * value;
}
