import { TArgUnitDefinitionFunction } from './TArgUnitDefinitionFunction.type';

/** API: describes how a unit is defined by smaller units */
export type TArgUnitDefinedBy =
	| Array<[string, number]>
	| TArgUnitDefinitionFunction;
