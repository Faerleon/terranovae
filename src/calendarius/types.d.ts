/**  */
export type TCreateUnitDefinitionArguments = (creatingFunctions: {
	define: TFunctionDefine;
	base: TFunctionBase;
}) => void;

/** used to define the base unit in the API */
export type TOptionsBaseUnit = { base: true };

/** used to define a derived unit in the API */
export type TOptionsDerivedUnit = {
	inBase: number | TArgUnitDefinitionFunction;
};

/** for explicit definition functions */
export type TArgUnitDefinitionFunction = (
	rawInput: number,
) => Array<[string, number]>;

/** API: describes how a unit is defined by smaller units */
export type TArgUnitDefinedBy =
	| Array<[string, number]>
	| TArgUnitDefinitionFunction;

// ----- DEFINITION DSL -----

/** type to define the function that the API provides to create a unit */
export type TFunctionDefine = (
	name: string,
	definedBy: TArgUnitDefinedBy,
) => void;

/** type to define the function that the API provides to create a base unit */
export type TFunctionBase = (name: string) => void;

// ----- STORAGE -----

/** the defined system is stored into a map */
export type TStoredDefinitionUnitMap = Map<
	string,
	TOptionsBaseUnit | TOptionsDerivedUnit
>;

/** master object to store all functionality for the created system */
export type TStoredDefinition = { definedSystem: TStoredDefinitionUnitMap };
