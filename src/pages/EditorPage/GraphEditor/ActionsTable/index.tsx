import React from "react";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

import Action, { ActionType, getActions, TextAction } from "types/Action";
import Variable from "types/Variable";
import TableInput from "components/TableInput";
import CustomDropdownInput from "components/CustomDropdownInput";
import ButtonIcon from "components/ButtonIcon";
import styles from "./ActionsTable.module.css";

interface Props {
  actions: Action[];
  variables: Variable[];
  onAddAction: () => void;
  onChangeAction: (action: Action) => void;
  onRemoveAction: (action: Action) => void;
}

const ActionsTable: React.FC<Props> = ({
  actions = [],
  variables = [],
  onAddAction,
  onChangeAction,
  onRemoveAction,
}) => {
  return (
    <section>
      <TableInput
        headings={["Variable", "Action", "Value", ""]}
        widths={[25, 23, 30, 2]}
        onAddRow={() => {
          if (variables.length > 0) {
            onAddAction();
          } else {
            alert("Actions require variables. Add some to get started.");
          }
        }}
        onAddRowText={"Add action"}
      >
        {actions.map((action, i) => (
          <tr key={i}>
            <td>
              <select
                id="variable"
                className={styles.variableInput}
                value={action.variable}
                onChange={(e) => {
                  const oldType = variables.find(
                    (v) => v.id === action.variable
                  ).type;
                  const newType = variables.find(
                    (v) => v.id === e.target.value
                  ).type;
                  onChangeAction({
                    ...action,
                    variable: e.target.value,
                    ...(oldType !== newType && {
                      action: TextAction.SET,
                      value: { Text: "", Number: 0, Boolean: true, List: [] }[
                        newType
                      ],
                    }),
                  });
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
                id="action"
                value={action.action}
                onChange={(e) =>
                  onChangeAction({
                    ...action,
                    action: e.target.value as ActionType,
                  })
                }
              >
                {getActions(
                  variables.find((v) => v.id === action.variable).type
                ).map((actionName, a_i) => (
                  <option key={a_i} value={actionName}>
                    {actionName}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <CustomDropdownInput
                type={variables.find((v) => v.id === action.variable).type}
                value={action.value}
                list={[{ name: "Response", value: "{{response}}" }].concat(
                  variables
                    .filter(
                      (v) =>
                        v.type ===
                        variables.find((v) => v.id === action.variable).type
                    )
                    .map((v) => ({ name: v.name, value: `{{${v.id}}}` }))
                )}
                onChange={(v) => onChangeAction({ ...action, value: v })}
              />
            </td>
            <td onClick={() => onRemoveAction(action)} id="remove">
              <ButtonIcon icon={faMinus} />
            </td>
          </tr>
        ))}
      </TableInput>
    </section>
  );
};

export default ActionsTable;
