import { useParams } from "react-router-dom";
import { doc, Timestamp, updateDoc } from "firebase/firestore";
import React, { useCallback, useState, useEffect } from "react";
import { useDocumentOnce } from "react-firebase-hooks/firestore";

import { db } from "../../utils/firebase";
import GraphEditor from "../../components/GraphEditor";
import { EXAMPLE_STORY, DEFAULT_STORY } from "../../constants/defaults";
import downloadStory from "../../utils/compiler/downloadStory";
import Page from "../Page";
import Modal from "../../components/Modal";
import styles from "./EditorPage.module.css";
import ListInput from "../../components/ListInput";
import LoadingModal from "../../components/Modals/LoadingModal";
import Button from "../../components/Button";
import useUpdateEffect from "../../hooks/useUpdateEffect";
import THEMES from "../../constants/themes";

const EditorPage = () => {
  const { id } = useParams();
  const [snapshot, loading, error, reload] = useDocumentOnce(
    doc(db, "stories", id)
  );
  const [story, setStory] = useState(DEFAULT_STORY);
  const [storyLoaded, setStoryLoaded] = useState(false);
  const [timedSave, setTimedSave] = useState(null);
  const [settings, setSettings] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    console.log("snapshot changing");
    if (snapshot?.data()) {
      setStory({
        ...snapshot.data(),
        dateUpdated: Timestamp.fromDate(new Date()),
        graph: JSON.parse(snapshot.data().graph),
      });
      setStoryLoaded(true);
    }
  }, [snapshot]);

  const download = useCallback(async () => {
    setDownloading(true);
    await downloadStory(story);
    setDownloading(false);
  }, [story]);

  useEffect(() => {
    setTimedSave((oldTimedSave) => {
      clearTimeout(oldTimedSave);
      return setTimeout(() => {
        if (snapshot) {
          console.log("...saving");
          updateDoc(snapshot.ref, {
            ...story,
            coverImage:
              story.graph.nodes
                .find((n) => n.type === "input")
                .data.text.find((d) => d.type === "image")?.url || "",
            graph: JSON.stringify(story.graph),
          });
        }
      }, 500);
    });
  }, [story, snapshot]);

  return (
    <Page name={story.title}>
      {storyLoaded && (
        <div style={{ height: "100%", display: "flex" }}>
          <GraphEditor
            nodes={story.graph.nodes}
            edges={story.graph.edges}
            variables={story.graph.variables}
            applyChanges={(changes) =>
              setStory({ ...story, graph: { ...story.graph, ...changes } })
            }
            onSettings={() => setSettings(true)}
            onDownload={download}
          >
            {settings && (
              <StoryModal
                story={story}
                onSave={(s) => {
                  setStory(s);
                  setSettings(false);
                }}
                onCancel={() => setSettings(false)}
              />
            )}
            {downloading && <LoadingModal title="Downloading story" />}
          </GraphEditor>
        </div>
      )}
    </Page>
  );
};

export default EditorPage;

const StoryModal = ({ story, onSave, onCancel }) => {
  const [title, setTitle] = useState(story.title);
  const [blurb, setBlurb] = useState(story.blurb);
  const [cursor, setCursor] = useState(story.cursor);
  const [replaceNode, setReplaceNode] = useState(story.replaceNode);
  const [errorMessages, setErrorMessages] = useState(story.errorMessages);
  const [theme, setTheme] = useState(story.theme);
  const [madeChanges, setMadeChanges] = useState(false);

  useUpdateEffect(() => {
    setMadeChanges(true);
  }, [title, blurb, cursor, replaceNode, errorMessages]);

  return (
    <Modal title="Settings" className={styles.storyModal}>
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
              value={replaceNode}
              onChange={(e) => setReplaceNode(e.target.value)}
            >
              <option value={true}>
                Current node replaces the previous node
              </option>
              <option value={false}>
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
              {Object.keys(THEMES).map((key, i) => (
                <option key={i} value={THEMES[key]}>
                  {key}
                </option>
              ))}
            </select>
          </section>
        </div>
        <div className={styles.editorSettings}>
          <h3>Editor Settings</h3>
          <section>
            <div>Default edge</div>
            <div>Default capitalisation</div>
            <div>Default punctuation</div>
            <div>Default articles</div>
            <div></div>
          </section>
        </div>
      </div>
      <div className={styles.buttons}>
        <Button className="warning" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          className="save"
          onClick={() =>
            onSave({
              ...story,
              title,
              blurb,
              cursor,
              replaceNode,
              errorMessages,
              theme,
            })
          }
        >
          Save
        </Button>
      </div>
    </Modal>
  );
};
