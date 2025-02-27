/** for explicit definition functions */
export type TArgUnitDefinitionFunction = (
	rawInput: number,
	allInputValues: Map<string, number>,
) => Array<[string, number]>;
