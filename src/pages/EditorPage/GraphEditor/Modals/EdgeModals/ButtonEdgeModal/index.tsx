import React, { useState } from "react";

import ActionsTable from "pages/EditorPage/GraphEditor/ActionsTable";
import Modal from "components/Modal";
import Variable from "types/Variable";
import { ButtonEdge } from "types/Edge";
import { newAction } from "types/Action";
import useUpdated from "hooks/useUpdated";

interface Props {
  edge: ButtonEdge;
  variables: Variable[];
  onSave: (edge: ButtonEdge) => void;
  onCancel: () => void;
}

const ButtonEdgeModal: React.FC<Props> = ({
  edge,
  variables,
  onSave,
  onCancel,
}) => {
  const [name, setName] = useState(edge.data.name);
  const [actions, setActions] = useState(edge.data.actions);
  const madeChanges = useUpdated([name, actions]);

  return (
    <Modal
      title="Edit Button Path"
      className="EdgeModal"
      onSave={() => {
        if (name) {
          onSave({
            ...edge,
            label: name,
            data: { ...edge.data, name: name, actions: actions },
          });
        } else {
          window.alert("Button name must not be empty.");
        }
      }}
      onCancel={() => {
        if (madeChanges) {
          if (window.confirm("Are you sure you want to discard your changes?"))
            onCancel();
        } else {
          onCancel();
        }
      }}
    >
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
          placeholder={"Button Name"}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
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

export default ButtonEdgeModal;
