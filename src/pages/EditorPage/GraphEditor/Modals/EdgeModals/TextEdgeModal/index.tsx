import React, { useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import useUpdated from "hooks/useUpdated";
import Variable from "types/Variable";
import { TextEdge } from "types/Edge";
import { newAction } from "types/Action";
import Modal from "components/Modal";
import ActionsTable from "pages/EditorPage/GraphEditor/ActionsTable";
import ButtonIcon from "components/ButtonIcon";
import ListInput from "components/ListInput";
import "./TextEdgeModal.css";

interface Props {
  edge: TextEdge;
  variables: Variable[];
  onSave: (edge: TextEdge) => void;
  onCancel: () => void;
}

const TextEdgeModal: React.FC<Props> = ({
  edge,
  variables,
  onSave,
  onCancel,
}) => {
  const [triggers, setTriggers] = useState(edge.data.triggers);
  const [actions, setActions] = useState(edge.data.actions);
  const madeChanges = useUpdated([triggers, actions]);

  return (
    <Modal
      title="Edit Text Path"
      className="EdgeModal"
      onSave={() =>
        onSave({
          ...edge,
          label: triggers[0] || "...",
          data: {
            ...edge.data,
            triggers: triggers,
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
      <h3>Triggers</h3>
      <section className="section section__triggers">
        <ListInput
          values={triggers}
          onChange={(v) => setTriggers(v)}
          placeholder="Any response"
          minimum={1}
          onAddRowText={"Add trigger"}
        />
      </section>
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

export default TextEdgeModal;
