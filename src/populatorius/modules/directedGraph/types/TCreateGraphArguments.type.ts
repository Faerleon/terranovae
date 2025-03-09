import { TFunctionEdge } from './TFunctionEdge.type';
import { TFunctionNode } from './TFunctionNode.type';

/**  */
export type TCreateGraphArguments = (creatingFunctions: {
	node: TFunctionNode;
	edge: TFunctionEdge;
}) => void;
