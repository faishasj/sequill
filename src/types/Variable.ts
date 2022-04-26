import { v4 as uuidv4 } from "uuid";

export const enum VarType {
  TEXT = "Text",
  NUMBER = "Number",
  BOOLEAN = "Boolean",
  LIST = "List",
}

export interface TextVariable {
  id: string;
  name: string;
  type: VarType.TEXT;
  initialValue: string;
}

export interface NumberVariable {
  id: string;
  name: string;
  type: VarType.NUMBER;
  initialValue: number;
}

export interface BooleanVariable {
  id: string;
  name: string;
  type: VarType.BOOLEAN;
  initialValue: boolean;
}

export interface ListVariable {
  id: string;
  name: string;
  type: VarType.LIST;
  initialValue: string[];
}

type Variable = TextVariable | NumberVariable | BooleanVariable | ListVariable;

export default Variable;

export const newVariable = (): Variable => ({
  id: uuidv4(),
  name: "",
  type: VarType.TEXT,
  initialValue: "",
});
