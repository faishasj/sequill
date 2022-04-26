import React from "react";

import imgLibrary from "images/library.png";
import imgStoryEditor from "images/storyeditor.png";
import styles from "./Tab.module.css";

const GettingStarted = () => (
  <div className={styles.tabContent}>
    <p>
      To create your first story, go to <b>My Library</b> and click on{" "}
      <b>+ Add new story</b>.
    </p>
    <img src={imgLibrary} style={{ maxWidth: "400px" }}></img>
    <p>
      You will be taken to the Story Editor. This is where all the magic
      happens!
    </p>
    <img src={imgStoryEditor}></img>
    <p>
      Let's start by having a look at the tools on the right side of the editor.
    </p>
    <ul>
      <li>
        <p>
          <b>Variables</b> - This is where you can manage your story's
          variables. You'll find more about this on the Variables learn page.
        </p>
      </li>
      <li>
        <p>
          <b>Story Settings</b> - This is where you change the story's title,
          blurb, icon and default settings.
        </p>
      </li>
      <li>
        <p>
          <b>Download Story</b> - When you're ready to export your story for
          yourself and others to read, click this button.
        </p>
      </li>
      <li>
        <p>
          <b>Help</b> - This is where you can read about the editor's controls.
        </p>
      </li>
    </ul>
  </div>
);

export default GettingStarted;
