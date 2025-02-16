import {
	TArgUnitDefinedBy,
	TCreateUnitDefinitionArguments,
	TFunctionSequence,
	TFunctionStoredDefinitionCreateResult,
	TOptionsBaseUnit,
	TOptionsDerivedUnit,
	TStoredDefinition,
	TStoredDefinitionUnitMap,
} from './types';
import { convertToBaseUnit } from './convertToBaseUnit.function';
import extractKeysFromString from './extractKeysFromString.function';
import extractValuesWithTemplate from './extractValuesWithTemplate.function';

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

	// Map to store all string sequences used to create patterns
	const sequences: Map<string, string> = new Map();

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

		// ----- API -----

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

	/**
	 * used to create patterns for human readable input and output
	 * @param name the name of the pattern
	 * @param pattern the pattern itself
	 */
	const sequence: TFunctionSequence = (
		name: string,
		pattern: string,
	): void => {
		// validate that every key in the sequence exists
		const keys = extractKeysFromString(pattern);
		for (const key of keys) {
			if (definedSystem.get(key) === undefined)
				throw new Error('ERR_NO_DEFINITION: ' + key);
		}
		// store the sequence
		sequences.set(name, pattern);
	};

	// ----- GENERATE -----
	const create = (
		patternName: string,
		patternContent: string,
	): TFunctionStoredDefinitionCreateResult => {
		const template = sequences.get(patternName);
		if (!template) throw new Error('ERR_NO_PATTERN: ' + patternName);

		// create map with values from template
		const valuesFromPatternContent: Map<string, string> =
			extractValuesWithTemplate(template, patternContent);

		// TODO for each value, generate the base value
		console.log('result: ', valuesFromPatternContent);

		return { raw: 0, units: extractKeysFromString(template) };
	};

	// bind API methods
	args({ define, base, sequence });

	// return final created instance
	return { definedSystem, create };
}
