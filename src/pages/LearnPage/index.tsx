import React, { useState } from "react";

import Page from "../Page";
import styles from "./LearnPage.module.css";
import GettingStarted from "./Tabs/GettingStarted";
import Nodes from "./Tabs/Nodes";
import Variables from "./Tabs/Variables";
import Paths from "./Tabs/Paths";
import Export from "./Tabs/Export";
import Customisation from "./Tabs/Customisation";

const tabs = {
  "Getting started": <GettingStarted />,
  Nodes: <Nodes />,
  Variables: <Variables />,
  "Paths and actions": <Paths />,
  "Exporting your story": <Export />,
  "Further customisations": <Customisation />,
};

const LearnPage = () => {
  const [tab, setTab] = useState("Getting started");

  return (
    <Page name={"Learn"}>
      <div className={styles.page}>
        <div className={styles.sidebar}>
          {Object.keys(tabs).map((heading, i) => (
            <div
              key={i}
              className={tab === heading ? styles.active : ""}
              onClick={() => {
                setTab(heading);
              }}
            >
              {heading}
            </div>
          ))}
        </div>
        <div className={styles.content}>
          <h1>{tab}</h1>
          {tabs[tab]}
        </div>
      </div>
    </Page>
  );
};

export default LearnPage;
