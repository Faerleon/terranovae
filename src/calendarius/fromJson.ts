import {
	TFunctionStoredDefinitionCreateResult,
	TStoredDefinition,
} from './types';
import convertValuesToBaseValue from './functions/convertValuesToBaseValue.function';
import extractKeysFromString from './functions/extractKeysFromString.function';
import extractValuesWithTemplate from './functions/extractValuesWithTemplate.function';

/**
 * creates a definition from a json string
 *
 * @group Calendarius
 * @param json a json string that was creating using the .toJson method of a defined system
 * @return TStoredDefinition a unit definition
 */
export function fromJson(json: string): TStoredDefinition {
	const reversed: object = JSON.parse(json, (key, value) => {
		if (typeof value === 'object' && value.__isFunction__ === true) {
			return new Function(`return (${value.code})`)();
		}
		return value;
	});

	const sequences: Map<string, string> = new Map();
	const definedSystem = new Map(Object.entries(reversed));

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

	function toJson() {
		return JSON.stringify(
			Object.fromEntries(definedSystem),
			(key, value) => {
				return typeof value === 'function'
					? { __isFunction__: true, code: String(value) }
					: value;
			},
		);
	}

	return { create, definedSystem, toJson };
}
