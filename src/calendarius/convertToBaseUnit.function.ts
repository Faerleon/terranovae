import { BaseUnit, DefinedSystem, DerivedUnit } from './types';

/**
 * helper function that converts the existing unit into a the base unit
 * @param definitionFragment a unit by name and count
 * @param definedSystem all currently existing units
 */
export function convertToBaseUnit(
	definitionFragment: [string, number],
	definedSystem: DefinedSystem,
): number {
	const [name, value] = definitionFragment;
	const child = definedSystem.get(name);
	if ((child as BaseUnit).base) return value;
	return (child as DerivedUnit).inBase * value;
}
