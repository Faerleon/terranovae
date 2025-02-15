export type BaseUnit = { base: true };
export type DerivedUnit = { inBase: number };

export type UnitDefinition = Array<[string, number]>;
export type DefinitionFunction = (
	name: string,
	definedBy: UnitDefinition,
) => void;
export type BaseDefinitionFunction = (name: string) => void;

export type DefinedSystem = Map<string, BaseUnit | DerivedUnit>;
export type UnitSystem = { definedSystem: DefinedSystem };
