import { TArgUnitDefinedBy } from './TArgUnitDefinedBy.type';

/** type to define the function that the API provides to create a unit */
export type TFunctionDefine = (
	name: string,
	definedBy: TArgUnitDefinedBy,
) => void;
