import { v4 as uuidv4 } from "uuid";

export type TEXT_VAR = "Text";
export type NUMBER_VAR = "Number";
export type BOOLEAN_VAR = "Boolean";
export type LIST_VAR = "List";

export type VariableType = TEXT_VAR | NUMBER_VAR | BOOLEAN_VAR | LIST_VAR;

export interface TextVariable {
  id: string;
  name: string;
  type: TEXT_VAR;
  initialValue: string;
}

export interface NumberVariable {
  id: string;
  name: string;
  type: NUMBER_VAR;
  initialValue: number;
}

export interface BooleanVariable {
  id: string;
  name: string;
  type: BOOLEAN_VAR;
  initialValue: boolean;
}

export interface ListVariable {
  id: string;
  name: string;
  type: LIST_VAR;
  initialValue: string[];
}

type Variable = TextVariable | NumberVariable | BooleanVariable | ListVariable;

export default Variable;

export const newVariable = (): Variable => ({
  id: uuidv4(),
  name: "",
  type: "Text",
  initialValue: "",
});
