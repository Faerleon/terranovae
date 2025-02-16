import {
	TArgUnitDefinedBy,
	TCreateUnitDefinitionArguments,
	TOptionsBaseUnit,
	TOptionsDerivedUnit,
	TStoredDefinition,
	TStoredDefinitionUnitMap,
} from './types';
import { convertToBaseUnit } from './convertToBaseUnit.function';

/**
 * method to create unit definitions
 * each unit is defined by a quantity of its base unit
 * @param args a callback containing methods to define the system
 */
export function createUnitDefinition(
	args: TCreateUnitDefinitionArguments,
): TStoredDefinition {
	const definedSystem: TStoredDefinitionUnitMap = new Map<
		string,
		TOptionsBaseUnit | TOptionsDerivedUnit
	>();

	/**
	 * definition function for non-base units
	 * each unit is defined by a sequence of child units
	 * @param name the name of the unit
	 * @param definedBy a sequence of other units that define this one
	 */
	const define = (name: string, definedBy: TArgUnitDefinedBy): void => {
		// when we use a definition function, just store it instead of resolving
		if (typeof definedBy === 'function') {
			definedSystem.set(name, { inBase: definedBy });
			return;
		}

		// when we use a static value, we can resolve it instantly
		let inBase = 0;
		// get all units in the definition and check if they exist
		for (const definitionFragment of definedBy) {
			// check if child definition exists
			const [defByName] = definitionFragment;
			const alreadyDefined =
				definedSystem.get(definitionFragment[0]) !== undefined;
			if (!alreadyDefined)
				throw new Error('ERR_NO_DEFINITION: ' + defByName);

			// calculate each unit into its child unit until the base unit is used
			const convertedToBaseUnit = convertToBaseUnit(
				definitionFragment,
				definedSystem,
			);
			inBase += convertedToBaseUnit;
		}

		// store that value
		definedSystem.set(name, { inBase });
	};

	/**
	 * definition function for the base unit
	 * @param name of the base unit
	 */
	const base = (name: string): void => {
		definedSystem.set(name, { base: true });
	};

	args({ define, base });

	return { definedSystem };
}
