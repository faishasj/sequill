import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  query,
  where,
  doc,
  addDoc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import moment from "moment";

import { db } from "../../utils/firebase";
import Page from "../Page";
import styles from "./LibraryPage.module.css";
import ContextMenu from "../../components/ContextMenu";
import Button from "../../components/Button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import LoadingModal from "../../components/LoadingModal";
import { newStory } from "types/Story";

const LibraryPage = ({ user }) => {
  const [snapshot, loading, error] = useCollectionOnce(
    query(collection(db, "stories"), where("authorID", "==", user.uid))
  );
  const navigate = useNavigate();
  const [storyContext, setStoryContext] = useState(null);
  const [sortOption, setSortOption] = useState("dateUpdated");
  const [addingStory, setAddingStory] = useState(false);
  const [deletingStory, setDeletingStory] = useState(false);

  const sort = useCallback(
    (a, b) => {
      switch (sortOption) {
        case "dateUpdated":
          return a.data().dateUpdated.toDate() < b.data().dateUpdated.toDate()
            ? 1
            : -1;
        case "dateCreated":
          return a.data().dateCreated.toDate() < b.data().dateCreated.toDate()
            ? 1
            : -1;
        default:
          return a.data().title > b.data().title ? 1 : -1;
      }
    },
    [sortOption]
  );

  const addNewStory = useCallback(async () => {
    setAddingStory(true);
    const story = newStory();
    const docRef = await addDoc(collection(db, "stories"), {
      ...story,
      graph: JSON.stringify(story.graph),
      dateCreated: Timestamp.fromDate(new Date()),
      dateUpdated: Timestamp.fromDate(new Date()),
      authorID: user.uid,
    });
    setAddingStory(false);
    navigate("/edit/" + docRef.id);
  }, [user.uid, navigate]);

  const deleteStory = useCallback(async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this story? It will be lost forever."
      )
    ) {
      setDeletingStory(true);
      await deleteDoc(doc(db, "stories", storyContext.id));
      navigate(0);
    }
  }, [storyContext?.id, navigate]);

  return (
    <Page name="My Library">
      <div
        className={styles.page}
        onClick={() => {
          setStoryContext(null);
        }}
      >
        <div className={styles.options}>
          <div>
            <label>Sort by </label>
            <select
              className={styles.sort}
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="dateUpdated">Date Updated</option>
              <option value="dateCreated">Date Created</option>
              <option value="title">Title</option>
            </select>
          </div>
          <Button
            icon={faPlus}
            onClick={() => {
              addNewStory();
            }}
          >
            Add new story
          </Button>
        </div>
        <div className={styles.library}>
          {snapshot &&
            snapshot.docs.sort(sort).map((doc, i) => (
              <div
                key={i}
                className={styles.card}
                onContextMenu={(e) => {
                  e.preventDefault();
                  setStoryContext({ id: doc.id, x: e.clientX, y: e.clientY });
                }}
                onClick={() => navigate("/edit/" + doc.id)}
              >
                <div className={styles.book}>
                  <div className={styles.bookCover}>
                    <div className={styles.effect}></div>
                    <div className={styles.titleContainer}>
                      <div className={styles.title}>{doc.data().title}</div>
                      <div
                        className={styles.image}
                        style={{
                          backgroundImage: `url(${doc.data().coverImage})`,
                        }}
                      ></div>
                    </div>
                    <div className={styles.light}></div>
                  </div>
                  <div className={styles.bookInside} />
                </div>
                <div className={styles.date}>
                  {`Updated ${moment(
                    doc.data().dateCreated.toDate()
                  ).fromNow()}`}
                </div>
              </div>
            ))}
          {storyContext && (
            <ContextMenu
              options={[
                {
                  name: "Edit story",
                  action: () => {
                    navigate("/edit/" + storyContext.id);
                  },
                },
                {
                  name: "Delete story",
                  action: deleteStory,
                  warning: true,
                },
              ]}
              x={storyContext.x}
              y={storyContext.y}
            />
          )}
        </div>
        {addingStory && <LoadingModal title="Creating new story" />}
        {deletingStory && <LoadingModal title="Deleting story" />}
      </div>
    </Page>
  );
};

export default LibraryPage;
