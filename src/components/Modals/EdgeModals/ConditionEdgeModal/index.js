import { useState } from "react";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

import { getNewAction } from "../../../../types/Action";
import ActionsTable from "../../../ActionsTable";
import TableInput from "../../../TableInput";
import { getConditions, getNewCondition } from "../../../../types/Condition";

import "./ConditionEdgeModal.css";
import Button from "../../../Button";
import CustomInput from "../../../CustomInput";
import ButtonIcon from "../../../ButtonIcon";
import useUpdateEffect from "../../../../hooks/useUpdateEffect";

const ConditionEdgeModal = ({ edge, variables, onSave, onCancel }) => {
  const [madeChanges, setMadeChanges] = useState(false);
  const [conditions, setConditions] = useState(edge.data.conditions);
  const [actions, setActions] = useState(edge.data.actions);

  useUpdateEffect(() => setMadeChanges(true), [conditions, actions]);

  return (
    <div id="ConditionEdgeModal" className="EdgeModal">
      <h2>Edit Condition Path</h2>
      {!edge.data.isDefault && (
        <>
          <h3>If...</h3>
          <section>
            <TableInput
              className={"conditionTable"}
              headings={["", "Variable", "Condition", "Value", ""]}
              widths={[13, 20, 37, 28, 2]}
              onAddRow={() => {
                if (variables.length > 0) {
                  setConditions([...conditions, getNewCondition(variables[0])]);
                } else {
                  alert(
                    "Conditions require variables. Add some to get started."
                  );
                }
              }}
              onAddRowText={
                <>
                  <ButtonIcon icon={faPlus} /> Add condition
                </>
              }
            >
              {conditions.map((condition, i) => (
                <tr key={i} className={condition.connective}>
                  <td>
                    {i > 0 && (
                      <select
                        id="connective"
                        value={condition.connective}
                        onChange={(e) => {
                          setConditions(
                            conditions.map((c) =>
                              c.id === condition.id
                                ? {
                                    ...condition,
                                    connective: e.target.value,
                                  }
                                : c
                            )
                          );
                        }}
                      >
                        <option value="and">and</option>
                        <option value="or">or</option>
                      </select>
                    )}
                  </td>
                  <td>
                    <select
                      id="variable"
                      value={condition.variable}
                      onChange={(e) => {
                        setConditions(
                          conditions.map((c) =>
                            c.id === condition.id
                              ? {
                                  ...condition,
                                  variable: e.target.value,
                                  condition: "equal to",
                                }
                              : c
                          )
                        );
                      }}
                    >
                      {variables.map((variable) => (
                        <option key={variable.id} value={variable.id}>
                          {variable.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select
                      id="condition"
                      value={condition.condition}
                      onChange={(e) => {
                        setConditions(
                          conditions.map((c) =>
                            c.id === condition.id
                              ? { ...condition, condition: e.target.value }
                              : c
                          )
                        );
                      }}
                    >
                      {getConditions(
                        variables.find((v) => v.id === condition.variable).type
                      ).map((conditionName, c_i) => (
                        <option key={c_i} value={conditionName}>
                          {conditionName}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <CustomInput
                      type={
                        variables.find((v) => v.id === condition.variable).type
                      }
                      value={condition.value}
                      list={[
                        { name: "Response", value: "{{response}}" },
                      ].concat(
                        variables
                          .filter(
                            (v) =>
                              v.type ===
                              variables.find((v) => v.id === condition.variable)
                                .type
                          )
                          .map((v) => ({ name: v.name, value: `{{${v.id}}}` }))
                      )}
                      onChange={(v) =>
                        setConditions(
                          conditions.map((c) =>
                            c.id === condition.id
                              ? { ...condition, value: v }
                              : c
                          )
                        )
                      }
                    />
                  </td>
                  <td>
                    <ButtonIcon
                      icon={faMinus}
                      onClick={() => {
                        setConditions(
                          conditions.filter((c) => c.id !== condition.id)
                        );
                      }}
                    />
                  </td>
                </tr>
              ))}
            </TableInput>
          </section>
        </>
      )}
      <h3>Actions</h3>
      <ActionsTable
        variables={variables}
        actions={actions}
        onAddAction={() => setActions([...actions, getNewAction(variables[0])])}
        onChangeAction={(action) =>
          setActions(actions.map((a) => (a.id === action.id ? action : a)))
        }
        onRemoveAction={(action) =>
          setActions(actions.filter((a) => a.id !== action.id))
        }
      />

      <div id="buttons">
        <Button
          className="warning"
          onClick={() => {
            if (madeChanges) {
              if (
                window.confirm("Are you sure you want to discard your changes?")
              )
                onCancel();
            } else {
              onCancel();
            }
          }}
        >
          Cancel
        </Button>
        <Button
          className="save"
          onClick={() =>
            onSave({
              ...edge,
              label: `${conditions.length} condition${
                conditions.length === 1 ? "" : "s"
              }`,
              data: { ...edge.data, conditions: conditions, actions: actions },
            })
          }
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default ConditionEdgeModal;
