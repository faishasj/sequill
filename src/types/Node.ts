import { EdgeType } from "./Edge";

import { v4 as uuidv4 } from "uuid";

export type START_NODE = "input";
export type MIDDLE_NODE = "default";
export type END_NODE = "output";
export type CROSSROADS_NODE = "crossroads";

export type NodeType = START_NODE | MIDDLE_NODE | END_NODE | CROSSROADS_NODE;

interface Node {
  id: string;
  type: NodeType;
  data: {
    label: string;
    picture?: string;
    text?: any;
    pathType: EdgeType;
    ignoreCapitalisation?: boolean;
    ignorePunctuation?: boolean;
    ignoreArticles?: boolean;
  };
  position: {
    x: number;
    y: number;
  };
}

export default Node;

export const newNode = (type: NodeType, pathType: EdgeType = "text"): Node => ({
  id: uuidv4(),
  type: type,
  data: {
    text:
      type === "output"
        ? [{ type: "paragraph", children: [{ text: "The End." }] }]
        : [{ type: "paragraph", children: [{ text: "" }] }],
    label: type === "output" ? "The End." : "New node",
    picture: "",
    pathType: pathType,
    ignoreCapitalisation: true,
    ignorePunctuation: true,
    ignoreArticles: true,
  },
  position: {
    x: 0,
    y: 0,
  },
});

export const newCrossroads = (): Node => ({
  id: uuidv4(),
  type: "crossroads",
  data: {
    pathType: "condition",
    label: "",
  },
  position: {
    x: 0,
    y: 0,
  },
});
