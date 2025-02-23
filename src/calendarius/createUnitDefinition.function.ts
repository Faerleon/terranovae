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
import convertValuesToBaseValue from './convertValuesToBaseValue.function';
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
		definedSystem.set(name, { definedBy });
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
		// retrieve the template from all stored templates
		const template = sequences.get(patternName);
		if (!template) throw new Error('ERR_NO_PATTERN: ' + patternName);

		// check what units the template generates
		const units = extractKeysFromString(template);

		// check the provided values to convert to the base unit
		const values = extractValuesWithTemplate(template, patternContent);
		const mapConvertedToNumericValues: Map<string, number> = new Map();
		values.forEach((value, key) => {
			mapConvertedToNumericValues.set(key, Number(value));
		});

		// convert each value into its child unit until only the base unit remains.
		const valueInBaseUnit = convertValuesToBaseValue(
			mapConvertedToNumericValues,
			definedSystem,
		);

		return {
			patternName,
			valueInBaseUnit,
			units,
		};
	};

	// bind API methods
	args({ define, base, sequence });

	// return final created instance
	return { definedSystem: Object.freeze(definedSystem), create };
}
