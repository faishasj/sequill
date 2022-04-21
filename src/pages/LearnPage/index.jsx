import { useState } from "react";
import Page from "../Page";
import styles from "./LearnPage.module.css";

import imgLibrary from "../../images/library.png";
import imgStoryEditor from "../../images/storyeditor.png";
import imgStartNode from "../../images/startnode.png";
import imgMiddleNode from "../../images/middlenode.png";
import imgEndNode from "../../images/endnode.png";
import imgCrossroads from "../../images/crossroads.png";
import imgAddNode from "../../images/addnode.gif";
import imgVariables from "../../images/variables.png";
import imgVariableReference from "../../images/variable_reference.png";

const headings = [
  "Getting started",
  "Nodes",
  "Variables",
  "Paths, actions and conditions",
  "Exporting your story",
  "Further customizations",
];

const LearnPage = () => {
  const [page, setPage] = useState(0);

  return (
    <Page name={"Learn"}>
      <div className={styles.page}>
        <div className={styles.sidebar}>
          {headings.map((h, i) => (
            <div
              key={i}
              className={page === i ? styles.active : ""}
              onClick={() => {
                setPage(i);
              }}
            >
              {h}
            </div>
          ))}
        </div>
        <div className={styles.content}>
          <h1>{headings[page]}</h1>
          {
            [
              <div className={styles.tabContent}>
                <p>
                  To create your first story, go to <b>My Library</b> and click
                  on <b>+ Add new story</b>.
                </p>
                <img src={imgLibrary}></img>
                <p>
                  You will be taken to the Story Editor. This is where all the
                  magic happens.
                </p>
                <img src={imgStoryEditor}></img>
                <p>
                  Let's start by making some changes to our story's settings.
                  Click on <b>Story Settings</b> on the right hand side.
                </p>
                <p>
                  You can change the following things:
                  <ul>
                    <li>Item 1</li>
                  </ul>
                </p>
              </div>,
              <div className={styles.tabContent}>
                <p>
                  Nodes are the main building blocks of your story. They are
                  passages of text (and/or images) that are connected through
                  paths. The reader's responses will determine which nodes they
                  will read in your story.
                </p>
                <p>To add a node, right-click anywhere in the Story Editor.</p>
                <img
                  src={imgAddNode}
                  alt="Context menu with the options Add middle node, Add end node, and Add crossroads"
                  style={{ maxHeight: "150px" }}
                ></img>
                <p>
                  Let's go through the different types of nodes that make up a
                  story.
                </p>
                <h2>Start Node</h2>
                <p>
                  The start node is indicated by a circle node with a double
                  border. It is the entry point to your story. There can only be
                  one start node in your story and it cannot be deleted.
                </p>
                <img
                  src={imgStartNode}
                  className={styles.nodeStartImg}
                  alt="A circular start node with double border"
                />
                <h2>Middle node</h2>
                <p>
                  The middle node is indicated by a rectangle node. It
                  represents a passage in the middle of your story connected by
                  paths that lead to the node, and paths leading from the node.
                  Depending on the reader's responses, they may or may not end
                  up reading a middle node.
                </p>
                <img
                  src={imgMiddleNode}
                  className={styles.nodeImg}
                  alt="A rectangular middle node"
                />
                <h2>End node</h2>
                <p>
                  The end node is indicated by a rectangle node with a double
                  border. This is where the reader finishes the story. You can
                  have multiple end nodes, thus creating different endings in
                  your story.
                </p>
                <img
                  src={imgEndNode}
                  className={styles.nodeImg}
                  alt="A rectangular end node with double border"
                />
                <h2>Crossroads</h2>
                <p>
                  Crossroads are a special type of node indicated by a diamond.
                  Rather than representing a passage, crossroads create paths
                  based on conditional statements. It's an alternative to
                  directly using the reader's responses to navigate between
                  nodes.
                </p>
                <img
                  src={imgCrossroads}
                  className={styles.nodeStartImg}
                  alt="A diamond crossroads node"
                />
                <p>
                  Confused about crossroads? Don't worry! We'll cover more of
                  this in the upcoming sections.
                </p>
              </div>,
              <div className={styles.tabContent}>
                <p>
                  Variables are used to store values. They can change over time
                  based on the reader's actions throughout the story. You can
                  use variables inside nodes and paths.
                </p>
                <p>
                  You can manage your story's variables by clicking on{" "}
                  <b>Variables</b> from the toolbox.
                </p>
                <img src={imgVariables} style={{ maxHeight: "200px" }}></img>
                <p>There are four different variable types:</p>
                <ul>
                  <li>
                    <b>Text</b>
                  </li>
                  <li>
                    <b>Number</b>
                  </li>
                  <li>
                    <b>Boolean</b> - true or false
                  </li>
                  <li>
                    <b>List</b>
                  </li>
                </ul>
                <p>
                  You can reference a variable in a node's text by surrounding
                  the variable's name in double curly braces e.g.{" "}
                  {"{{variableName}}"}. When the story is exported, the
                  reference will be replaced by the variable's value.
                </p>
                <img
                  src={imgVariableReference}
                  style={{ maxHeight: "110px" }}
                ></img>
                <h2>Examples</h2>
                <p>
                  To better understand how variables can be used in your story,
                  here are some interesting use-cases:
                </p>
                <ul>
                  <li>
                    <p>
                      You use a Text variable to store the reader's name to
                      reference throughout the story.
                    </p>
                  </li>
                  <li>
                    <p>
                      You use a Number variable to keep a counter representing
                      the reader's relationship with a character.
                    </p>
                  </li>
                  <li>
                    <p>
                      You use a Boolean variable to check whether the reader is
                      allowed to enter a room.
                    </p>
                  </li>
                  <li>
                    <p>
                      You use a List variable to create an inventory for the
                      reader.
                    </p>
                  </li>
                </ul>
                <p>
                  In the next section, we'll cover how to set and use variables.
                </p>
              </div>,
              <div className={styles.tabContent}>
                <h2>Paths</h2>
                <h2>Actions</h2>
                <h2>Conditions</h2>
              </div>,
              <div className={styles.tabContent}></div>,
              <div className={styles.tabContent}></div>,
            ][page]
          }
        </div>
      </div>
    </Page>
  );
};

export default LearnPage;
