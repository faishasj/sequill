import React, { useRef, useState, useCallback, useEffect } from "react";

import ContextMenu from "../ContextMenu";
import NodeModal from "../Modals/NodeModal";
import EdgeModal from "../Modals/EdgeModals/EdgeModal";
import VariablesModal from "../Modals/VariablesModal";
import CrossroadsNode from "../Nodes/CrossroadsNode";
import { newNode, newCrossroads } from "../../types/Node";
import { newEdge, textToButton, buttonToText } from "../../types/Edge";
import "./GraphEditor.css";

import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "react-flow-renderer";
import { newVariable } from "../../types/Variable";
import Button from "../Button";
import {
  faCircleQuestion,
  faDownload,
  faGear,
  faQuestion,
  faShapes,
} from "@fortawesome/free-solid-svg-icons";

const nodeTypes = {
  crossroads: CrossroadsNode,
};

const defaultEdgeOptions = {
  animated: true,
  markerEnd: {
    type: "arrowclosed",
  },
};

const GraphEditor = ({
  children,
  applyChanges,
  onDownload,
  onSettings,
  nodes = [],
  edges = [],
  variables = [],
}) => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodeSelected, setNodeSelected] = useState(null);
  const [edgeSelected, setEdgeSelected] = useState(null);
  const [nodeContext, setNodeContext] = useState(null);
  const [edgeContext, setEdgeContext] = useState(null);
  const [paneContext, setPaneContext] = useState(null);
  const [editVariables, setEditVariables] = useState(false);

  const onNodeContextMenu = useCallback((event, node) => {
    event.preventDefault();
    setNodeContext({ node: node, x: event.clientX, y: event.clientY });
    setEdgeContext(null);
    setPaneContext(null);
  }, []);

  const onEdgeContextMenu = useCallback((event, edge) => {
    event.preventDefault();
    setEdgeContext({ edge: edge, x: event.clientX, y: event.clientY });
    setNodeContext(null);
    setPaneContext(null);
  }, []);

  const onConnect = useCallback(
    (connection) => {
      const source = reactFlowInstance.getNode(connection.source);
      const edge = newEdge(source.data.pathType);
      applyChanges({
        edges: addEdge(
          {
            ...edge,
            ...(source.data.pathType === "condition" &&
              edges.filter((e) => e.source === connection.source).length >
                0 && {
                label: "0 conditions",
                data: {
                  ...edge.data,
                  isDefault: false,
                },
              }),
            source: connection.source,
            target: connection.target,
          },
          edges
        ),
      });
    },
    [applyChanges, edges, reactFlowInstance]
  );

  const onPaneClick = useCallback((event) => {
    setNodeContext(null);
    setEdgeContext(null);
    setPaneContext(null);
  }, []);

  const onPaneContextMenu = useCallback((event) => {
    event.preventDefault();
    setPaneContext({ x: event.clientX, y: event.clientY });
    setNodeContext(null);
    setEdgeContext(null);
  }, []);

  const editNode = useCallback((node) => {
    setNodeSelected(node.type === "crossroads" ? null : node);
    setNodeContext(null);
  }, []);

  const editEdge = useCallback((edge) => {
    setEdgeSelected(edge);
    setEdgeContext(null);
  }, []);

  const isValidID = useCallback(
    (id) => {
      return nodes.filter((node) => node.id === id).length === 0;
    },
    [nodes]
  );

  const addNode = useCallback(
    (type) => {
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      applyChanges({
        nodes: [
          ...nodes,
          {
            ...(type === "crossroads" ? newCrossroads() : newNode(type)),
            position: reactFlowInstance.project({
              x: paneContext.x - reactFlowBounds.left,
              y: paneContext.y - reactFlowBounds.top,
            }),
          },
        ],
      });
      setPaneContext(null);
    },
    [applyChanges, nodes, paneContext, reactFlowInstance]
  );

  const saveNode = useCallback(
    (node) => {
      applyChanges({
        nodes: nodes.map((n) => (n.id === nodeSelected.id ? node : n)),
        edges: edges.map((e) =>
          e.source === nodeSelected.id
            ? { ...e, source: node.id }
            : e.target === nodeSelected.id
            ? { ...e, target: node.id }
            : e
        ),
      });
      setNodeSelected(null);
    },
    [applyChanges, nodes, edges, nodeSelected]
  );

  const saveEdge = useCallback(
    (edge) => {
      applyChanges({
        edges: edges.map((e) =>
          e.id === edgeSelected.id ? { ...e, ...edge } : e
        ),
      });
      setEdgeSelected(null);
    },
    [applyChanges, edges, edgeSelected]
  );

  const changeNodeType = useCallback(
    (node, type) => {
      applyChanges({
        nodes: nodes.map((n) =>
          n.id === node.id ? { ...node, type: type } : n
        ),
        ...(type === "output" && {
          edges: edges.filter((e) => e.source !== node.id),
        }),
      });
      setNodeContext(null);
    },
    [applyChanges, nodes, edges]
  );

  const convertPathType = useCallback(
    (node) => {
      applyChanges({
        nodes: nodes.map((n) =>
          n.id === node.id
            ? {
                ...n,
                data: {
                  ...n.data,
                  pathType: node.data.pathType === "text" ? "button" : "text",
                },
              }
            : n
        ),
        edges: edges.map((e) =>
          e.source === node.id
            ? node.data.pathType === "text"
              ? textToButton(e)
              : buttonToText(e)
            : e
        ),
      });
      setNodeContext(null);
    },
    [applyChanges, nodes, edges]
  );

  const deleteNode = useCallback(
    (node) => {
      if (window.confirm("Are you sure you want to delete this node?"))
        applyChanges({
          nodes: nodes.filter((n) => n.id !== node.id),
          edges: edges.filter(
            (e) => e.source !== node.id && e.target !== node.id
          ),
        });
      setNodeContext(null);
    },
    [applyChanges, nodes, edges]
  );

  const deleteEdge = useCallback(
    (edge) => {
      if (window.confirm("Are you sure you want to delete this path?"))
        applyChanges({ edges: edges.filter((e) => e.id !== edge.id) });
      setEdgeContext(null);
    },
    [applyChanges, edges]
  );

  const convertToDefaultEdge = useCallback(
    (edge) => {
      applyChanges({
        edges: edges.map((e) =>
          e.source === edge.source
            ? e.id === edge.id
              ? {
                  ...e,
                  label: "DEFAULT",
                  data: { ...e.data, isDefault: true, conditions: [] },
                }
              : e.data.isDefault
              ? {
                  ...e,
                  label: "0 conditions",
                  data: { ...e.data, isDefault: false },
                }
              : e
            : e
        ),
      });
      setEdgeContext(null);
    },
    [applyChanges, edges]
  );

  const addVariable = useCallback(
    (variable) => {
      applyChanges({ variables: [...variables, newVariable()] });
    },
    [applyChanges, variables]
  );

  const updateVariable = useCallback(
    (variable) => {
      applyChanges({
        variables: variables.map((v) => (v.id === variable.id ? variable : v)),
        edges: edges.map((e) => ({
          ...e,
          data: {
            ...e.data,
            actions: e.data.actions.map((a) =>
              a.variable === variable.id ? { ...a, name: variable.name } : a
            ),
          },
        })),
      });
    },
    [applyChanges, variables, edges]
  );

  const removeVariable = useCallback(
    (variable) => {
      const goAhead = window.confirm(
        `Are you sure you want to remove "${variable.name}"?`
      );
      if (goAhead)
        applyChanges({
          variables: variables.filter((v) => v.id !== variable.id),
          edges: edges.map((e) => {
            if (e.data.type === "condition" && !e.data.isDefault) {
              const conditions = e.data.conditions.filter(
                (c) => c.variable !== variable.id
              );
              return {
                ...e,
                label:
                  `${conditions.length} condition` +
                  (conditions.length === 1 ? "" : "s"),
                data: {
                  ...e.data,
                  conditions: conditions,
                  actions: e.data.actions.filter(
                    (a) => a.variable !== variable.id
                  ),
                },
              };
            } else {
              return {
                ...e,
                data: {
                  ...e.data,
                  actions: e.data.actions.filter(
                    (a) => a.variable !== variable.id
                  ),
                },
              };
            }
          }),
        });
    },
    [applyChanges, variables, edges]
  );

  const closeVariables = useCallback(() => {
    if (variables.filter((v) => v.name === "").length > 0) {
      const goAhead = window.confirm(
        "You have unnamed variables that will be deleted. Are you sure you want to continue?"
      );
      if (goAhead) {
        applyChanges({
          variables: variables.filter((v) => v.name !== ""),
        });
      } else {
        return;
      }
    }
    setEditVariables(false);
  }, [applyChanges, variables]);

  return (
    <div className={"GraphEditor"} ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onInit={setReactFlowInstance}
        onNodesChange={(changes) =>
          applyChanges({ nodes: applyNodeChanges(changes, nodes) })
        }
        onEdgesChange={(changes) =>
          applyChanges({ edges: applyEdgeChanges(changes, edges) })
        }
        onNodeClick={(_, node) => editNode(node)}
        onEdgeClick={(_, edge) => editEdge(edge)}
        onNodeContextMenu={onNodeContextMenu}
        onEdgeContextMenu={onEdgeContextMenu}
        onConnect={onConnect}
        onPaneClick={onPaneClick}
        onPaneContextMenu={onPaneContextMenu}
        defaultEdgeOptions={defaultEdgeOptions}
        panOnDrag={!(nodeContext || edgeContext || paneContext)}
        zoomOnPinch={!(nodeContext || edgeContext || paneContext)}
        zoomOnScroll={!(nodeContext || edgeContext || paneContext)}
        fitView
      >
        <Controls />
        <Background color="#aaa" gap={16} />
        <MiniMap />
        <div className="tools">
          <Button
            icon={faShapes}
            onClick={() => {
              setEditVariables(true);
            }}
          >
            Variables
          </Button>
          <Button icon={faGear} onClick={onSettings}>
            Story Settings
          </Button>
          <Button icon={faDownload} onClick={onDownload}>
            Download Story
          </Button>
          <Button icon={faCircleQuestion} onClick={() => {}}>
            Help
          </Button>
        </div>
        {nodeContext && (
          <ContextMenu
            x={nodeContext.x}
            y={nodeContext.y}
            options={[
              nodeContext.node.type !== "crossroads" && {
                name: "Edit node",
                action: () => editNode(nodeContext.node),
              },
              (nodeContext.node.type === "input" ||
                nodeContext.node.type === "default") && {
                name:
                  "Change paths to " +
                  (nodeContext.node.data.pathType === "text"
                    ? "buttons"
                    : "text"),
                action: () => convertPathType(nodeContext.node),
              },
              nodeContext.node.type === "default" && {
                name: "Convert to end node",
                action: () => changeNodeType(nodeContext.node, "output"),
              },
              nodeContext.node.type !== "input" && {
                name: "Delete node",
                action: () => deleteNode(nodeContext.node),
                warning: true,
              },
            ].filter((o) => o !== false)}
          />
        )}
        {edgeContext && (
          <ContextMenu
            x={edgeContext.x}
            y={edgeContext.y}
            options={[
              {
                name: "Edit path",
                action: () => editEdge(edgeContext.edge),
              },
              edgeContext.edge.data.type === "condition" &&
                !edgeContext.edge.data.isDefault && {
                  name: "Change to default",
                  action: () => convertToDefaultEdge(edgeContext.edge),
                },
              (edgeContext.edge.data.type !== "condition" ||
                !edgeContext.edge.data.isDefault) && {
                name: "Delete path",
                action: () => deleteEdge(edgeContext.edge),
                warning: true,
              },
            ].filter((o) => o !== false)}
          />
        )}
        {paneContext && (
          <ContextMenu
            x={paneContext.x}
            y={paneContext.y}
            options={[
              { name: "Add middle node", action: () => addNode("default") },
              { name: "Add end node", action: () => addNode("output") },
              { name: "Add crossroads", action: () => addNode("crossroads") },
            ]}
          />
        )}
        {nodeSelected && (
          <NodeModal
            node={nodeSelected}
            onSave={saveNode}
            onCancel={() => setNodeSelected(false)}
            isValidID={isValidID}
          />
        )}
        {edgeSelected && (
          <EdgeModal
            edge={edgeSelected}
            variables={variables}
            onSave={saveEdge}
            onCancel={() => setEdgeSelected(false)}
          />
        )}
        {editVariables && (
          <VariablesModal
            variables={variables}
            onAddVariable={addVariable}
            onChangeVariable={updateVariable}
            onRemoveVariable={removeVariable}
            onClose={closeVariables}
          ></VariablesModal>
        )}
        {children}
      </ReactFlow>
    </div>
  );
};

export default GraphEditor;
