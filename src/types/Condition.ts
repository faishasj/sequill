import { v4 as uuidv4 } from "uuid";

import Variable, { VarType } from "./Variable";

export const enum TextCondition {
  EQUAL_TO = "equal to",
  NOT_EQUAL_TO = "not equal to",
}

export const enum NumberCondition {
  EQUAL_TO = "equal to",
  NOT_EQUAL_TO = "not equal to",
  GREATER_THAN = "greater than",
  LESS_THAN = "less than",
  GEQ_TO = "greater than or equal to",
  LEQ_TO = "less than or equal to",
}

export const enum BooleanCondition {
  EQUAL_TO = "equal to",
  NOT_EQUAL_TO = "not equal to",
}

export const enum ListCondition {
  EQUAL_TO = "equal to",
  NOT_EQUAL_TO = "not equal to",
  CONTAINS = "contains",
  NOT_CONTAINS = "doesn't contain",
}

export type ConditionType =
  | TextCondition
  | NumberCondition
  | BooleanCondition
  | ListCondition;

export const enum Connective {
  AND = "and",
  OR = "or",
}

interface Condition {
  id: string;
  variable: string;
  condition: ConditionType;
  value: string | number | boolean | string[];
  connective?: Connective;
}

export default Condition;

export const getConditions = (varType: VarType): ConditionType[] => {
  switch (varType) {
    case VarType.TEXT:
      return [TextCondition.EQUAL_TO, TextCondition.NOT_EQUAL_TO];
    case VarType.NUMBER:
      return [
        NumberCondition.EQUAL_TO,
        NumberCondition.NOT_EQUAL_TO,
        NumberCondition.GREATER_THAN,
        NumberCondition.LESS_THAN,
        NumberCondition.GEQ_TO,
        NumberCondition.LEQ_TO,
      ];
    case VarType.BOOLEAN:
      return [BooleanCondition.EQUAL_TO, BooleanCondition.EQUAL_TO];
    case VarType.LIST:
      return [
        ListCondition.EQUAL_TO,
        ListCondition.NOT_EQUAL_TO,
        ListCondition.CONTAINS,
        ListCondition.NOT_CONTAINS,
      ];
  }
};

export const newCondition = (variable: Variable): Condition => {
  switch (variable.type) {
    case VarType.TEXT:
      return {
        id: uuidv4(),
        connective: Connective.AND,
        condition: TextCondition.EQUAL_TO,
        variable: variable.id,
        value: "",
      };
    case VarType.NUMBER:
      return {
        id: uuidv4(),
        connective: Connective.AND,
        condition: NumberCondition.EQUAL_TO,
        variable: variable.id,
        value: 0,
      };
    case VarType.BOOLEAN:
      return {
        id: uuidv4(),
        connective: Connective.AND,
        condition: BooleanCondition.EQUAL_TO,
        variable: variable.id,
        value: true,
      };
    case VarType.LIST:
      return {
        id: uuidv4(),
        connective: Connective.AND,
        condition: ListCondition.EQUAL_TO,
        variable: variable.id,
        value: [],
      };
  }
};
