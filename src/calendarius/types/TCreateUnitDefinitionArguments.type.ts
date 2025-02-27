import { TFunctionBase } from './TFunctionBase.type';
import { TFunctionDefine } from './TFunctionDefine.type';
import { TFunctionSequence } from './TFunctionSequence.type';

/**  */
export type TCreateUnitDefinitionArguments = (creatingFunctions: {
	define: TFunctionDefine;
	base: TFunctionBase;
	sequence: TFunctionSequence;
}) => void;
