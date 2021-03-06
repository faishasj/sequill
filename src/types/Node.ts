import { EdgeType } from "./Edge";

import { v4 as uuidv4 } from "uuid";

export const enum NodeType {
  START = "input",
  MIDDLE = "default",
  END = "output",
  CROSSROADS = "crossroads",
}

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

export const newNode = (
  type: NodeType,
  pathType: EdgeType = EdgeType.TEXT
): Node => ({
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
  type: NodeType.CROSSROADS,
  data: {
    pathType: EdgeType.CONDITION,
    label: "",
  },
  position: {
    x: 0,
    y: 0,
  },
});
