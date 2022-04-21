import { v4 as uuidv4 } from "uuid";

import Action from "./Action";

export type TEXT_EDGE = "text";
export type BUTTON_EDGE = "button";
export type CONDITION_EDGE = "condition";

export type EdgeType = TEXT_EDGE | BUTTON_EDGE | CONDITION_EDGE;

export interface TextEdge {
  id: string;
  source: string;
  target: string;
  label: string;
  labelStyle: { fill: string };
  labelBgPadding: number[];
  labelBgBorderRadius: number;
  labelBgStyle: { fill: string; fillOpacity: number };
  data: {
    type: TEXT_EDGE;
    triggers: string[];
    actions: Action[];
  };
}

export interface ButtonEdge {
  id: string;
  source: string;
  target: string;
  label: string;
  labelStyle: { fill: string };
  labelBgPadding: number[];
  labelBgBorderRadius: number;
  labelBgStyle: { fill: string; fillOpacity: number };
  data: {
    type: BUTTON_EDGE;
    name: string;
    actions: Action[];
  };
}

export interface ConditionEdge {
  id: string;
  source: string;
  target: string;
  label: string;
  labelStyle: { fill: string };
  labelBgPadding: number[];
  labelBgBorderRadius: number;
  labelBgStyle: { fill: string; fillOpacity: number };
  data: {
    type: CONDITION_EDGE;
    conditions: string[];
    actions: Action[];
    isDefault: boolean;
  };
}

type Edge = TextEdge | ButtonEdge | ConditionEdge;

export default Edge;

export const EdgeStyles = {
  text: {
    labelStyle: { fill: "#fff" },
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 10,
    labelBgStyle: { fill: "#648FFF", fillOpacity: 0.9 },
  },
  button: {
    labelStyle: { fill: "#fff" },
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 2,
    labelBgStyle: { fill: "#DC267F", fillOpacity: 0.9 },
  },
  condition: {
    labelStyle: { fill: "#000" },
    labelBgPadding: [8, 4],
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
    type: "text",
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
    type: "button",
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
    type: "condition",
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
    type: "button",
  },
  ...EdgeStyles.button,
});

export const buttonToText = (buttonEdge: ButtonEdge): TextEdge => ({
  ...buttonEdge,
  label: buttonEdge.data.name,
  data: {
    ...buttonEdge.data,
    type: "text",
    triggers: [buttonEdge.data.name],
  },
  ...EdgeStyles.text,
});
