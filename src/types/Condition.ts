import { v4 as uuidv4 } from "uuid";

import Variable, { VariableType } from "./Variable";

export type TextCondition = "equal to" | "not equal to";
export type NumberCondition =
  | "equal to"
  | "not equal to"
  | "greater than"
  | "less than"
  | "greater than or equal to"
  | "less than or equal to";
export type BooleanCondition = "equal to" | "not equal to";
export type ListCondition =
  | "equal to"
  | "not equal to"
  | "contains"
  | "doesn't contain";

export type ConditionType =
  | TextCondition
  | NumberCondition
  | BooleanCondition
  | ListCondition;

export type Connective = "and" | "or";

interface Condition {
  id: string;
  variable: string;
  condition: ConditionType;
  value: string | number | boolean | string[];
  connective?: Connective;
}

export default Condition;

export const getConditions = (variableType: VariableType): ConditionType[] => {
  switch (variableType) {
    case "Text":
      return ["equal to", "not equal to"];
    case "Number":
      return [
        "equal to",
        "not equal to",
        "greater than",
        "less than",
        "greater than or equal to",
        "less than or equal to",
      ];
    case "Boolean":
      return ["equal to", "not equal to"];
    case "List":
      return ["equal to", "not equal to", "contains", "doesn't contain"];
  }
};

export const getNewCondition = (variable: Variable): Condition => {
  switch (variable.type) {
    case "Text":
      return {
        id: uuidv4(),
        connective: "and",
        condition: "equal to",
        variable: variable.id,
        value: "",
      };
    case "Number":
      return {
        id: uuidv4(),
        connective: "and",
        condition: "equal to",
        variable: variable.id,
        value: 0,
      };
    case "Boolean":
      return {
        id: uuidv4(),
        connective: "and",
        condition: "equal to",
        variable: variable.id,
        value: true,
      };
    case "List":
      return {
        id: uuidv4(),
        connective: "and",
        condition: "equal to",
        variable: variable.id,
        value: [],
      };
  }
};
