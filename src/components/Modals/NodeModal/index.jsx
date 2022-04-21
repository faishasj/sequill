import React, { useState, useCallback, useEffect } from "react";
import TextEditor from "../../TextEditor";
import { Text } from "slate";

import Modal from "../../Modal";
import "./NodeModal.css";
import Button from "../../Button";
import useUpdateEffect from "../../../hooks/useUpdateEffect";

const getFirstText = (elements) => {
  const getFirstTextChild = (node) => {
    if (Text.isText(node)) {
      return node.text;
    } else {
      if (node.children) {
        let label = "";
        for (let i = 0; i < node.children.length; i++) {
          label = getFirstTextChild(node.children[i]);
          if (label !== "") return label;
        }
        return label;
      } else {
        return "";
      }
    }
  };

  let label = "";
  for (let i = 0; i < elements.length; i++) {
    label = getFirstTextChild(elements[i]);
    if (label !== "") return label;
  }
  return label;
};

const NodeModal = ({ node, onSave, onCancel, isValidID }) => {
  const cutoff = node.type === "input" ? 35 : 90;
  const [madeChanges, setMadeChanges] = useState(false);
  const [id, setId] = useState(node.id);
  const [text, setText] = useState(node.data.text);
  const [ignoreCapitalisation, setIgnoreCapitalisation] = useState(
    node.data.ignoreCapitalisation
  );
  const [ignorePunctuation, setIgnorePunctuation] = useState(
    node.data.ignorePunctuation
  );
  const [ignoreArticles, setIgnoreArticles] = useState(
    node.data.ignoreArticles
  );
  const [validID, setValidID] = useState(true);

  const onChangeId = useCallback(
    (e) => {
      const newId = e.target.value;
      setId(newId);
      setValidID(newId !== "" && (newId === node.id || isValidID(newId)));
    },
    [setId, setValidID, isValidID, node.id]
  );

  useUpdateEffect(() => {
    setMadeChanges(true);
  }, [id, text, ignoreCapitalisation, ignorePunctuation, ignoreArticles]);

  return (
    <Modal title="Edit Node" className="NodeModal">
      <div className="section__id">
        <label className="label__id" htmlFor="id">
          Node ID:
        </label>
        <div className="section__input__id">
          <input
            className={"input__id" + (validID ? "" : " invalid")}
            id="id"
            value={id}
            onChange={onChangeId}
          />
          {!validID && (
            <div className="error_message">
              {id === ""
                ? "Please enter an ID."
                : "This ID already exists. Please choose a different ID."}
            </div>
          )}
        </div>
      </div>
      <h3>Node Text</h3>
      <section className="textEditorSection">
        <TextEditor
          initialValue={node.data.text}
          onChange={(state) => setText(state)}
        />
      </section>
      {node.data.pathType === "text" && node.type !== "output" && (
        <>
          <h3>Text Path Options</h3>
          <section id="options">
            <div className="option">
              <input
                type="checkbox"
                id="capitalisation"
                name="capitalisation"
                value="capitalisation"
                checked={ignoreCapitalisation}
                onChange={() => setIgnoreCapitalisation(!ignoreCapitalisation)}
              />
              <label htmlFor="capitalisation"> Ignore capitalisation</label>
            </div>
            <div className="option">
              <input
                type="checkbox"
                id="punctuation"
                name="punctuation"
                value="punctuation"
                checked={ignorePunctuation}
                onChange={() => setIgnorePunctuation(!ignorePunctuation)}
              />
              <label htmlFor="punctuation"> Ignore punctuation</label>
            </div>
            <div className="option">
              <input
                type="checkbox"
                id="articles"
                name="articles"
                value="articles"
                checked={ignoreArticles}
                onChange={() => setIgnoreArticles(!ignoreArticles)}
              />
              <label htmlFor="articles"> Ignore articles (the/a/an)</label>
            </div>
          </section>
        </>
      )}
      <div className="section__buttons">
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
            validID &&
            onSave({
              ...node,
              id: id,
              data: {
                ...node.data,
                label:
                  getFirstText(text).slice(0, cutoff) +
                    (text.length < cutoff ? "" : "...") || "Empty Node",
                text: text,
                ignoreCapitalisation: ignoreCapitalisation,
                ignorePunctuation: ignorePunctuation,
                ignoreArticles: ignoreArticles,
              },
            })
          }
        >
          Save
        </Button>
      </div>
    </Modal>
  );
};

export default NodeModal;
