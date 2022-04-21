import { faXmark, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

import TableInput from "../../TableInput";
import Modal from "../../Modal";
import "./VariablesModal.css";
import ButtonIcon from "../../ButtonIcon";

const VariablesModal = ({
  onAddVariable,
  onChangeVariable,
  onRemoveVariable,
  onClose,
  variables = [],
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
      barButton={<ButtonIcon icon={faXmark} onClick={onClose} />}
    >
      <div className="VariablesModal">
        <section>
          <TableInput
            headings={["Name", "Type", "Initial Value", ""]}
            widths={[35, 20, 48, 2]}
            onAddRow={onAddVariable}
            onAddRowText={
              <>
                <ButtonIcon icon={faPlus} />
                <> Add variable</>
              </>
            }
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
                        type: e.target.value,
                        initialValue: changeType(e.target.value),
                      })
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
                      Text: (
                        <input
                          id="textInput"
                          type="text"
                          value={variable.initialValue}
                          onChange={(e) =>
                            onChangeVariable({
                              ...variable,
                              initialValue: e.target.value,
                            })
                          }
                        />
                      ),
                      Number: (
                        <input
                          id="numberInput"
                          type="number"
                          value={variable.initialValue.toString()}
                          onChange={(e) =>
                            onChangeVariable({
                              ...variable,
                              initialValue: Number(e.target.value),
                            })
                          }
                        />
                      ),
                      Boolean: (
                        <select
                          name="booleanInput"
                          id="booleanInput"
                          value={variable.initialValue}
                          onChange={(e) =>
                            onChangeVariable({
                              ...variable,
                              initialValue: e.target.value,
                            })
                          }
                        >
                          <option value={true}>True</option>
                          <option value={false}>False</option>
                        </select>
                      ),
                      List: (
                        <input
                          id=""
                          type="text"
                          value={variable.initialValue}
                          placeholder="Item1,Item2"
                          onChange={(e) =>
                            onChangeVariable({
                              ...variable,
                              initialValue: e.target.value.split(","),
                            })
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
      </div>
    </Modal>
  );
};

export default VariablesModal;
