import React from "react";
import { faXmark, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

import Variable, { VarType } from "types/Variable";
import TableInput from "components/TableInput";
import Modal from "components/Modal";
import ButtonIcon from "components/ButtonIcon";
import "./VariablesModal.css";

interface Props {
  variables: Variable[];
  onAddVariable: () => void;
  onChangeVariable: (variable: Variable) => void;
  onRemoveVariable: (variable: Variable) => void;
  onClose: () => void;
}

const VariablesModal: React.FC<Props> = ({
  variables = [],
  onAddVariable,
  onChangeVariable,
  onRemoveVariable,
  onClose,
}) => {
  const changeType = (newType) => {
    if (newType === "Text") return "";
    if (newType === "Number") return 0;
    if (newType === "Boolean") return true;
    if (newType === "List") return "";
  };

  return (
    <Modal
      title="Story Variables"
      className="VariablesModal"
      barButton={<ButtonIcon icon={faXmark} onClick={onClose} />}
    >
      <section>
        <TableInput
          headings={["Name", "Type", "Initial Value", ""]}
          widths={[35, 20, 48, 2]}
          onAddRow={onAddVariable}
          onAddRowText={"Add variable"}
        >
          {variables.map((variable, i) => (
            <tr key={i}>
              <td>
                <input
                  id="variableName"
                  value={variable.name}
                  placeholder="Enter name"
                  onChange={(e) =>
                    onChangeVariable({ ...variable, name: e.target.value })
                  }
                />
              </td>
              <td>
                <select
                  name="variableType"
                  id="variableType"
                  value={variable.type}
                  onChange={(e) =>
                    onChangeVariable({
                      ...variable,
                      type: e.target.value as VarType,
                      initialValue: changeType(e.target.value),
                    } as Variable)
                  }
                >
                  <option value="Text">Text</option>
                  <option value="Number">Number</option>
                  <option value="Boolean">Boolean</option>
                  <option value="List">List</option>
                </select>
              </td>
              <td>
                {
                  {
                    [VarType.TEXT]: (
                      <input
                        id="textInput"
                        type="text"
                        value={variable.initialValue.toString()}
                        onChange={(e) =>
                          onChangeVariable({
                            ...variable,
                            initialValue: e.target.value,
                          } as Variable)
                        }
                      />
                    ),
                    [VarType.NUMBER]: (
                      <input
                        id="numberInput"
                        type="number"
                        value={variable.initialValue.toString()}
                        onChange={(e) =>
                          onChangeVariable({
                            ...variable,
                            initialValue: Number(e.target.value),
                          } as Variable)
                        }
                      />
                    ),
                    [VarType.BOOLEAN]: (
                      <select
                        name="booleanInput"
                        id="booleanInput"
                        value={variable.initialValue.toString()}
                        onChange={(e) =>
                          onChangeVariable({
                            ...variable,
                            initialValue: e.target.value === "true",
                          } as Variable)
                        }
                      >
                        <option value={"true"}>True</option>
                        <option value={"false"}>False</option>
                      </select>
                    ),
                    [VarType.LIST]: (
                      <input
                        id=""
                        type="text"
                        value={variable.initialValue.toString()}
                        placeholder="Item1,Item2"
                        onChange={(e) =>
                          onChangeVariable({
                            ...variable,
                            initialValue: e.target.value.split(","),
                          } as Variable)
                        }
                      />
                    ),
                  }[variable.type]
                }
              </td>
              <td onClick={() => onRemoveVariable(variable)} id="remove">
                <ButtonIcon icon={faMinus} />
              </td>
            </tr>
          ))}
        </TableInput>
      </section>
    </Modal>
  );
};

export default VariablesModal;
