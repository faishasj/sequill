import { v4 as uuidv4 } from "uuid";

import Variable, { VariableType } from "./Variable";

export type TextAction = "Set" | "Append";
export type NumberAction = "Set" | "Add" | "Subtract" | "Multiply" | "Divide";
export type BooleanAction = "Set" | "Not" | "And" | "Or";
export type ListAction = "Set" | "Append" | "Remove";

export type ActionType = TextAction | NumberAction | BooleanAction | ListAction;

interface Action {
  id: string;
  action: ActionType;
  variable: string;
  value: string | number | boolean | string[];
}

export default Action;

export const getActions = (variableType: VariableType): ActionType[] => {
  switch (variableType) {
    case "Text":
      return ["Set", "Append"];
    case "Number":
      return ["Set", "Add", "Subtract", "Multiply", "Divide"];
    case "Boolean":
      return ["Set", "Not", "And", "Or"];
    case "List":
      return ["Set", "Append", "Remove"];
  }
};

export const getNewAction = (variable: Variable): Action => {
  switch (variable.type) {
    case "Text":
      return {
        id: uuidv4(),
        action: "Set",
        variable: variable.id,
        value: "",
      };
    case "Number":
      return {
        id: uuidv4(),
        action: "Set",
        variable: variable.id,
        value: 0,
      };
    case "Boolean":
      return {
        id: uuidv4(),
        action: "Set",
        variable: variable.id,
        value: true,
      };
    case "List":
      return {
        id: uuidv4(),
        action: "Set",
        variable: variable.id,
        value: [],
      };
  }
};
