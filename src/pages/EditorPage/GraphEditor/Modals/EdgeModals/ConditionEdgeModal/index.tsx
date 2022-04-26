import React, { useState } from "react";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

import useUpdated from "hooks/useUpdated";
import Variable from "types/Variable";
import { ConditionEdge } from "types/Edge";
import { newAction } from "types/Action";
import Condition, { getConditions, newCondition } from "types/Condition";
import Modal from "components/Modal";
import ActionsTable from "pages/EditorPage/GraphEditor/ActionsTable";
import TableInput from "components/TableInput";
import ButtonIcon from "components/ButtonIcon";
import CustomDropdownInput from "components/CustomDropdownInput";
import "./ConditionEdgeModal.css";

interface Props {
  edge: ConditionEdge;
  variables: Variable[];
  onSave: (edge: ConditionEdge) => void;
  onCancel: () => void;
}

const ConditionEdgeModal: React.FC<Props> = ({
  edge,
  variables,
  onSave,
  onCancel,
}) => {
  const [conditions, setConditions] = useState<Condition[]>(
    edge.data.conditions
  );
  const [actions, setActions] = useState(edge.data.actions);
  const madeChanges = useUpdated([conditions, actions]);

  return (
    <Modal
      title="Edit Condition Path"
      className="EdgeModal"
      onSave={() =>
        onSave({
          ...edge,
          label: `${conditions.length} condition${
            conditions.length === 1 ? "" : "s"
          }`,
          data: {
            ...edge.data,
            conditions: conditions,
            actions: actions,
          },
        })
      }
      onCancel={() => {
        if (madeChanges) {
          if (window.confirm("Are you sure you want to discard your changes?"))
            onCancel();
        } else {
          onCancel();
        }
      }}
    >
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
                  setConditions([...conditions, newCondition(variables[0])]);
                } else {
                  alert(
                    "Conditions require variables. Add some to get started."
                  );
                }
              }}
              onAddRowText={"Add condition"}
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
                                ? ({
                                    ...condition,
                                    connective: e.target.value,
                                  } as Condition)
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
                              ? ({
                                  ...condition,
                                  variable: e.target.value,
                                  condition: "equal to",
                                } as Condition)
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
                              ? ({
                                  ...condition,
                                  condition: e.target.value,
                                } as Condition)
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
                    <CustomDropdownInput
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
                          .map((v) => ({
                            name: v.name,
                            value: `{{${v.id}}}`,
                          }))
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
        onAddAction={() => setActions([...actions, newAction(variables[0])])}
        onChangeAction={(action) =>
          setActions(actions.map((a) => (a.id === action.id ? action : a)))
        }
        onRemoveAction={(action) =>
          setActions(actions.filter((a) => a.id !== action.id))
        }
      />
    </Modal>
  );
};

export default ConditionEdgeModal;
