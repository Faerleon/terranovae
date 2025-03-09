import { TCreateGraphArguments } from './types/TCreateGraphArguments.type';
import { TGraph } from './types/TGraph.type';
import { TStoredGraphDefinition } from './types/TStoredGraphDefinition.type';

/**
 * creates a new graph
 * @param args
 */
export function createGraph(
	args: TCreateGraphArguments,
): TStoredGraphDefinition {
	const graph: TGraph = {
		nodes: [],
		edges: [],
	};

	/**
	 * create a node
	 * @param id
	 * @param props
	 */
	function node(id: string, props: { [key: string]: unknown }) {
		graph.nodes.push({
			id,
			incomingEdges: [],
			outgoingEdges: [],
			props,
		});
	}

	/**
	 * create an edge
	 * @param id
	 * @param fromNodeId
	 * @param toNodeId
	 * @param props
	 */
	function edge(
		id: string,
		fromNodeId: string,
		toNodeId: string,
		props: { [key: string]: unknown },
	) {
		if (!graph.nodes.some((node) => node.id === fromNodeId))
			throw new Error(`ERR_FROM_NODE_NOT_FOUND: ${fromNodeId}`);

		if (!graph.nodes.some((node) => node.id === toNodeId))
			throw new Error(`ERR_FROM_NODE_NOT_FOUND: ${toNodeId}`);

		graph.edges.push({
			id,
			props,
			fromNodeId,
			toNodeId,
		});
	}

	args({ node, edge });

	return { graph };
}
