import { v4 as uuidv4 } from "uuid";
import { Edge as FlowEdge } from "react-flow-renderer";

import Action from "./Action";
import Condition from "./Condition";

export const enum EdgeType {
  TEXT = "text",
  BUTTON = "button",
  CONDITION = "condition",
}

export interface TextEdgeData {
  type: EdgeType.TEXT;
  triggers: string[];
  actions: Action[];
}

export type TextEdge = FlowEdge<TextEdgeData>;

export interface ButtonEdgeData {
  type: EdgeType.BUTTON;
  name: string;
  actions: Action[];
}

export type ButtonEdge = FlowEdge<ButtonEdgeData>;

export interface ConditionEdgeData {
  type: EdgeType.CONDITION;
  conditions: Condition[];
  actions: Action[];
  isDefault: boolean;
}

export type ConditionEdge = FlowEdge<ConditionEdgeData>;

type Edge = TextEdge | ButtonEdge | ConditionEdge;

export default Edge;

export const EdgeStyles = {
  text: {
    labelStyle: { fill: "#fff" },
    labelBgPadding: [8, 4] as [number, number],
    labelBgBorderRadius: 10,
    labelBgStyle: { fill: "#648FFF", fillOpacity: 0.9 },
  },
  button: {
    labelStyle: { fill: "#fff" },
    labelBgPadding: [8, 4] as [number, number],
    labelBgBorderRadius: 2,
    labelBgStyle: { fill: "#DC267F", fillOpacity: 0.9 },
  },
  condition: {
    labelStyle: { fill: "#000" },
    labelBgPadding: [8, 4] as [number, number],
    labelBgBorderRadius: 10,
    labelBgStyle: { fill: "#FFB000", fillOpacity: 0.9 },
  },
};

export const newTextEdge = (): TextEdge => ({
  id: uuidv4(),
  source: "",
  target: "",
  label: "...",
  data: {
    type: EdgeType.TEXT,
    triggers: [""],
    actions: [],
  },
  ...EdgeStyles.text,
});

export const newButtonEdge = (): ButtonEdge => ({
  id: uuidv4(),
  source: "",
  target: "",
  label: "Button",
  data: {
    type: EdgeType.BUTTON,
    name: "Button",
    actions: [],
  },
  ...EdgeStyles.button,
});

export const newConditionalEdge = (): ConditionEdge => ({
  id: uuidv4(),
  source: "",
  target: "",
  label: "DEFAULT",
  data: {
    type: EdgeType.CONDITION,
    conditions: [],
    actions: [],
    isDefault: true,
  },
  ...EdgeStyles.condition,
});

export const newEdge = (pathType: EdgeType): Edge =>
  ({
    text: newTextEdge,
    button: newButtonEdge,
    condition: newConditionalEdge,
  }[pathType]());

export const textToButton = (textEdge: TextEdge): ButtonEdge => ({
  ...textEdge,
  label: textEdge.data.triggers[0] || "Button",
  data: {
    ...textEdge.data,
    name: textEdge.data.triggers[0] || "Button",
    type: EdgeType.BUTTON,
  },
  ...EdgeStyles.button,
});

export const buttonToText = (buttonEdge: ButtonEdge): TextEdge => ({
  ...buttonEdge,
  label: buttonEdge.data.name,
  data: {
    ...buttonEdge.data,
    type: EdgeType.TEXT,
    triggers: [buttonEdge.data.name],
  },
  ...EdgeStyles.text,
});
