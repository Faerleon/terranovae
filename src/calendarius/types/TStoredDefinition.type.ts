import { TFunctionStoredDefinitionCreate } from './TFunctionStoredDefinitionCreate.type';
import { TStoredDefinitionUnitMap } from './TStoredDefinitionUnitMap.type';

/** master object to store all functionality for the created system */
export type TStoredDefinition = {
	definedSystem: TStoredDefinitionUnitMap;
	create: TFunctionStoredDefinitionCreate;
	toJson: () => string;
};
