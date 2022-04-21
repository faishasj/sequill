import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

import TableInput from "../TableInput";
import CustomInput from "../CustomInput";
import { getActions } from "../../types/Action";
import ButtonIcon from "../ButtonIcon";

const ActionsTable = ({
  onAddAction,
  onChangeAction,
  onRemoveAction,
  actions = [],
  variables = [],
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
        onAddRowText={
          <>
            <ButtonIcon icon={faPlus} /> Add action
          </>
        }
      >
        {actions.map((action, i) => (
          <tr key={i}>
            <td>
              <select
                id="variable"
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
                      action: "Set",
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
                  onChangeAction({ ...action, action: e.target.value })
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
              <CustomInput
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
