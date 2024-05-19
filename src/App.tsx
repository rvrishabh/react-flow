import { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  Connection,
  ReactFlowProvider,
} from "reactflow";
import { v4 as uuid } from "uuid";
import "reactflow/dist/style.css";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import TextNode from "./components/TextNode";
import { toast } from "react-toastify";

// Node types
const nodeTypes = {
  textNode: TextNode,
};

// Generate unique id
const getId = () => uuid();

export default function App() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [nodeLabel, setNodeLabel] = useState("");

  // Add edge
  const onConnect = useCallback(
    (connection: Connection) =>
      setEdges((eds) => addEdge({ ...connection }, eds)),
    [setEdges]
  );

  // Handle node drop
  const handleOnDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      // get the position of the dropped element
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      // create a new node
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `Text node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  // Handle drag over
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  // Handle node selection
  const onNodeSelected = useCallback((node: any) => {
    setSelectedNode(node);
    setNodeLabel(node.data.label as string);
  }, []);

  // Handle label change
  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNodeLabel(e.target.value);
    setNodes((nds) =>
      nds.map((n) =>
        n.id === selectedNode?.id
          ? { ...n, data: { ...n.data, label: e.target.value } }
          : n
      )
    );
  };

  const SaveChanges = () => {
    // Check if there are nodes to save
    if (!nodes.length) {
      toast.error("No nodes to save.");
      return;

      // Check if there are edges to save
    } else if (edges.length < nodes.length - 1) {
      toast.error("Flow cannot have disconnected nodes.");
      return;
    }

    // Save changes to local storage
    localStorage.setItem("nodes", JSON.stringify(nodes));
    localStorage.setItem("edges", JSON.stringify(edges));
    toast.success("Changes saved successfully.");
  };

  const emptyFlow = () => {
    // Empty the nodes and edges
    setNodes([]);
    setEdges([]);

    // Remove the nodes and edges from local storage
    localStorage.removeItem("nodes");
    localStorage.removeItem("edges");
  };

  useEffect(() => {
    // Load nodes and edges from local storage
    const nodes = localStorage.getItem("nodes");
    const edges = localStorage.getItem("edges");

    // Check if nodes and edges exist
    if (nodes) {
      setNodes(JSON.parse(nodes));
    }

    // Check if edges exist
    if (edges) {
      setEdges(JSON.parse(edges));
    }
  }, [setNodes, setEdges]);

  return (
    <>
      <Header saveChanges={SaveChanges} emptyFlow={emptyFlow} />
      <div className="flex">
        <ReactFlowProvider>
          <div ref={reactFlowWrapper} className="w-screen h-screen">
            <ReactFlow
              nodeTypes={nodeTypes}
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onDrop={(e) => handleOnDrop(e)}
              onDragOver={(e) => handleDragOver(e)}
              onInit={setReactFlowInstance}
              onNodeClick={onNodeSelected}
              fitView
            >
              <Background />
            </ReactFlow>
          </div>
        </ReactFlowProvider>
        <div className="grow h-screen w-1/3">
          <SideBar
            selectedNode={selectedNode}
            nodeLabel={nodeLabel}
            setSelectedNode={setSelectedNode}
            handleLabelChange={handleLabelChange}
          />
        </div>
      </div>
    </>
  );
}
