export type TFunctionEdge = (
	id: string,
	fromNodeId: string,
	toNodeId: string,
	props: { [key: string]: unknown },
) => void;
