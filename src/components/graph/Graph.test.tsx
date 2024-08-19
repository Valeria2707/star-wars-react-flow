import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Graph from "./Graph";
import { Node, Edge } from "@xyflow/react";

describe("Graph Component", () => {
  const nodes: Node[] = [
    { id: "1", position: { x: 0, y: 0 }, data: { label: "Node 1" } },
    { id: "2", position: { x: 100, y: 100 }, data: { label: "Node 2" } },
  ];

  const edges: Edge[] = [{ id: "e1-2", source: "1", target: "2" }];

  beforeAll(() => {
    globalThis.ResizeObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));
  });

  it("renders without crashing", () => {
    render(<Graph nodes={nodes} edges={edges} />);
    expect(screen.getByText("Node 1")).toBeInTheDocument();
    expect(screen.getByText("Node 2")).toBeInTheDocument();
  });
});
