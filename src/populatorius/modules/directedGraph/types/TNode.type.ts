export type TNode = {
	id: string;
	outgoingEdges: string[];
	incomingEdges: string[];
	props: { [key: string]: unknown };
};
