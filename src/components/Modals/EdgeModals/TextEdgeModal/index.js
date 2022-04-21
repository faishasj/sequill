import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useCallback } from "react";
import useUpdateEffect from "../../../../hooks/useUpdateEffect";
import { getNewAction } from "../../../../types/Action";
import ActionsTable from "../../../ActionsTable";
import Button from "../../../Button";
import ButtonIcon from "../../../ButtonIcon";

import "./TextEdgeModal.css";

const TextEdgeModal = ({ edge, variables, onSave, onCancel }) => {
  const [madeChanges, setMadeChanges] = useState(false);
  const [triggers, setTriggers] = useState(edge.data.triggers);
  const [actions, setActions] = useState(edge.data.actions);

  const onChangeTrigger = useCallback(
    (e, row) => {
      setTriggers(triggers.map((t, i) => (i === row ? e.target.value : t)));
    },
    [setTriggers, triggers]
  );

  useUpdateEffect(() => setMadeChanges(true), [triggers, actions]);

  return (
    <div id="TextEdgeModal" className="EdgeModal TextEdgeModal">
      <h2>Edit Text Path</h2>
      <h3>Triggers</h3>
      <section className="section section__triggers">
        {triggers.map((trigger, i) => (
          <div className="trigger" key={i}>
            <input
              value={trigger}
              onChange={(e) => onChangeTrigger(e, i)}
              placeholder="Any response"
            />
            <div
              className="delete"
              onClick={() =>
                setTriggers(triggers.filter((t, row) => row !== i))
              }
            >
              <ButtonIcon icon={faMinus} />
            </div>
          </div>
        ))}
        <div
          className="text_button"
          onClick={() => setTriggers([...triggers, ""])}
        >
          <ButtonIcon icon={faPlus} /> Add trigger
        </div>
      </section>
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
              label: triggers[0] || "...",
              data: {
                ...edge.data,
                triggers: triggers,
                actions: actions,
              },
            })
          }
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default TextEdgeModal;
