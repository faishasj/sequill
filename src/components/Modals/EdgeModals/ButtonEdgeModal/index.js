import React, { useState } from "react";
import useUpdateEffect from "../../../../hooks/useUpdateEffect";
import { getNewAction } from "../../../../types/Action";

import ActionsTable from "../../../ActionsTable";
import Button from "../../../Button";

const ButtonEdgeModal = ({ edge, variables, onSave, onCancel }) => {
  const [madeChanges, setMadeChanges] = useState(false);
  const [name, setName] = useState(edge.data.name);
  const [actions, setActions] = useState(edge.data.actions);

  useUpdateEffect(() => setMadeChanges(true), [name, actions]);

  return (
    <div id="ButtonEdgeModal" className="EdgeModal">
      <h2>Edit Button Path</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "baseline",
          marginBottom: "1rem",
        }}
      >
        <h3>
          <label className="label__id" htmlFor="id">
            Name:
          </label>
        </h3>
        <input
          style={{ flex: 1, marginLeft: "5px" }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
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
              label: name,
              data: { ...edge.data, name: name, actions: actions },
            })
          }
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default ButtonEdgeModal;
