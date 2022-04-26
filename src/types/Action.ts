import { v4 as uuidv4 } from "uuid";

import Variable, { VarType } from "./Variable";

export const enum TextAction {
  SET = "Set",
  APPEND = "Append",
}

export const enum NumberAction {
  SET = "Set",
  ADD = "Add",
  SUBTRACT = "Subtract",
  MULTIPLY = "Multiply",
  DIVIDE = "Divide",
}

export const enum BooleanAction {
  SET = "Set",
  NOT = "Not",
  AND = "And",
  OR = "Or",
}

export const enum ListAction {
  SET = "Set",
  APPEND = "Append",
  REMOVE = "Remove",
}

export type ActionType = TextAction | NumberAction | BooleanAction | ListAction;

interface Action {
  id: string;
  action: ActionType;
  variable: string;
  value: string | number | boolean | string[];
}

export default Action;

export const getActions = (varType: VarType): ActionType[] => {
  switch (varType) {
    case VarType.TEXT:
      return [TextAction.SET, TextAction.APPEND];
    case VarType.NUMBER:
      return [
        NumberAction.SET,
        NumberAction.ADD,
        NumberAction.SUBTRACT,
        NumberAction.MULTIPLY,
        NumberAction.DIVIDE,
      ];
    case VarType.BOOLEAN:
      return [
        BooleanAction.SET,
        BooleanAction.NOT,
        BooleanAction.AND,
        BooleanAction.OR,
      ];
    case VarType.LIST:
      return [ListAction.SET, ListAction.APPEND, ListAction.REMOVE];
  }
};

export const newAction = (variable: Variable): Action => {
  switch (variable.type) {
    case VarType.TEXT:
      return {
        id: uuidv4(),
        action: TextAction.SET,
        variable: variable.id,
        value: "",
      };
    case VarType.NUMBER:
      return {
        id: uuidv4(),
        action: NumberAction.SET,
        variable: variable.id,
        value: 0,
      };
    case VarType.BOOLEAN:
      return {
        id: uuidv4(),
        action: BooleanAction.SET,
        variable: variable.id,
        value: true,
      };
    case VarType.LIST:
      return {
        id: uuidv4(),
        action: ListAction.SET,
        variable: variable.id,
        value: [],
      };
  }
};
