import { TFunctionStoredDefinitionCreateResult } from './TFunctionStoredDefinitionCreateResult.type';

/** method to convert strings into unit objects */
export type TFunctionStoredDefinitionCreate = (
	sequenceName: string,
	sequenceContent: string,
) => TFunctionStoredDefinitionCreateResult;
