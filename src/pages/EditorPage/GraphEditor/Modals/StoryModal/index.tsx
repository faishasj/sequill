import React, { useState } from "react";

import useUpdated from "hooks/useUpdated";
import Modal from "components/Modal";
import ListInput from "components/ListInput";
import { getThemeNames, getThemes } from "constants/themes";
import { EdgeType } from "types/Edge";
import Story from "types/Story";
import styles from "./StoryModal.module.css";

interface Props {
  story: Story;
  onSave: (story: Story) => void;
  onCancel: () => void;
}

const StoryModal: React.FC<Props> = ({ story, onSave, onCancel }) => {
  const [title, setTitle] = useState(story.title);
  const [blurb, setBlurb] = useState(story.blurb);
  const [cursor, setCursor] = useState(story.cursor);
  const [replaceNode, setReplaceNode] = useState(story.replaceNode);
  const [errorMessages, setErrorMessages] = useState(story.errorMessages);
  const [theme, setTheme] = useState(story.theme);
  const [defaultPath, setDefaultPath] = useState(story.settings.defaultPath);
  const [ignoreCapitalisation, setIgnoreCapitalisation] = useState(
    story.settings.ignoreCapitalisation
  );
  const [ignorePunctuation, setIgnorePunctuation] = useState(
    story.settings.ignorePunctuation
  );
  const [ignoreArticles, setIgnoreArticles] = useState(
    story.settings.ignoreArticles
  );
  const madeChanges = useUpdated([
    title,
    blurb,
    cursor,
    replaceNode,
    errorMessages,
    theme,
    defaultPath,
    ignoreCapitalisation,
    ignorePunctuation,
    ignoreArticles,
  ]);

  return (
    <Modal
      title="Settings"
      className={styles.storyModal}
      onSave={() =>
        onSave({
          ...story,
          title,
          blurb,
          cursor,
          replaceNode,
          errorMessages,
          theme,
          settings: {
            ...story.settings,
            defaultPath,
            ignoreCapitalisation,
            ignorePunctuation,
            ignoreArticles,
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
      <div className={styles.storyModalContainer}>
        <div className={styles.storySettings}>
          <h3>Story Settings</h3>
          <section>
            <div className={styles.inputHeader}>
              <div className={styles.inputHeading}>Story title</div>
            </div>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
            <div className={styles.inputHeader}>
              <div className={styles.inputHeading}>Story blurb</div>
            </div>
            <textarea
              value={blurb}
              onChange={(e) => setBlurb(e.target.value)}
            />
            <div className={styles.inputHeader}>
              <div className={styles.inputHeading}>Cursor</div>
              <div className={styles.inputHint}>
                This will appear before every response
              </div>
            </div>
            <input
              value={cursor}
              onChange={(e) => {
                setCursor(e.target.value);
              }}
            />
            <div className={styles.inputHeader}>
              <div className={styles.inputHeading}>Story progression</div>
              <div className={styles.inputHint}>
                How nodes should appear after one another when reading
              </div>
            </div>
            <select
              value={replaceNode.toString()}
              onChange={(e) => setReplaceNode(e.target.value === "true")}
            >
              <option value={"true"}>
                Current node replaces the previous node
              </option>
              <option value={"false"}>
                Current node is appended to the previous node
              </option>
            </select>
            <div className={styles.inputHeader}>
              <div className={styles.inputHeading}>Error messages</div>
              <div className={styles.inputHint}>
                What to say if the player's response cannot be resolved to a
                path
              </div>
            </div>
            <ListInput
              className={styles.listInput}
              values={errorMessages}
              onAddRowText="Add error message"
              onChange={(v) => setErrorMessages(v)}
              minimum={1}
            />
            <div className={styles.inputHeader}>
              <div className={styles.inputHeading}>Theme</div>
            </div>
            <select value={theme} onChange={(e) => setTheme(e.target.value)}>
              {getThemes().map((value, i) => (
                <option key={i} value={value}>
                  {getThemeNames()[i]}
                </option>
              ))}
            </select>
          </section>
        </div>
        <div className={styles.editorSettings}>
          <h3>Default Path Settings</h3>
          <section>
            <div className={styles.inputHeading}>Default path</div>
            <select
              value={defaultPath}
              onChange={(e: any) => setDefaultPath(e.target.value)}
            >
              <option value={EdgeType.TEXT}>Text</option>
              <option value={EdgeType.BUTTON}>Button</option>
            </select>
            <div className={styles.checkbox}>
              <div className={styles.inputHeading}>Ignore capitalisation</div>
              <input
                type="checkbox"
                checked={ignoreCapitalisation}
                onChange={() => setIgnoreCapitalisation(!ignoreCapitalisation)}
              />
            </div>
            <div className={styles.checkbox}>
              <div className={styles.inputHeading}>Ignore punctuation</div>
              <input
                type="checkbox"
                checked={ignorePunctuation}
                onChange={() => setIgnorePunctuation(!ignorePunctuation)}
              />
            </div>
            <div className={styles.checkbox}>
              <div className={styles.inputHeading}>Ignore articles</div>
              <input
                type="checkbox"
                checked={ignoreArticles}
                onChange={() => setIgnoreArticles(!ignoreArticles)}
              />
            </div>
            <div></div>
          </section>
        </div>
      </div>
    </Modal>
  );
};

export default StoryModal;
