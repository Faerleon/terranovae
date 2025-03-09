export type TEdge = {
	id: string;
	fromNodeId: string;
	toNodeId: string;
	props: { [key: string]: unknown };
};
