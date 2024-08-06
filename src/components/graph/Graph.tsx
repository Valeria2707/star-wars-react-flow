import { Edge, Node, ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { GraphContainer } from "./GraphStyles";

type Props = {
  nodes: Node[];
  edges: Edge[];
};

export default function Graph({ nodes, edges }: Props) {
  return (
    <GraphContainer>
      <ReactFlow nodes={nodes} edges={edges} minZoom={0.2} maxZoom={1.5} />
    </GraphContainer>
  );
}
