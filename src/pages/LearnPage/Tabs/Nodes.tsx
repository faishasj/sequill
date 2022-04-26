import React from "react";

import imgStartNode from "images/startnode.png";
import imgMiddleNode from "images/middlenode.png";
import imgEndNode from "images/endnode.png";
import imgCrossroads from "images/crossroads.png";
import imgAddNode from "images/addnode.gif";
import styles from "./Tab.module.css";

const Nodes = () => (
  <div className={styles.tabContent}>
    <p>
      Nodes are the main building blocks of your story. They are passages of
      text (and/or images) that are connected through paths. The reader's
      responses will determine which nodes they will read in your story.
    </p>
    <p>To add a node, right-click anywhere in the Story Editor.</p>
    <img
      src={imgAddNode}
      alt="Context menu with the options Add middle node, Add end node, and Add crossroads"
      style={{ maxHeight: "150px" }}
    ></img>
    <p>Let's go through the different types of nodes that make up a story.</p>
    <h2>Start Node</h2>
    <p>
      The start node is indicated by a circle node with a double border. It is
      the entry point to your story. There can only be one start node in your
      story and it cannot be deleted.
    </p>
    <img
      src={imgStartNode}
      className={styles.nodeStartImg}
      alt="A circular start node with double border"
    />
    <h2>Middle node</h2>
    <p>
      The middle node is indicated by a rectangle node. It represents a passage
      in the middle of your story connected by paths that lead to the node, and
      paths leading from the node. Depending on the reader's responses, they may
      or may not end up reading a middle node.
    </p>
    <img
      src={imgMiddleNode}
      className={styles.nodeImg}
      alt="A rectangular middle node"
    />
    <h2>End node</h2>
    <p>
      The end node is indicated by a rectangle node with a double border. This
      is where the reader finishes the story. You can have multiple end nodes,
      thus creating different endings in your story.
    </p>
    <img
      src={imgEndNode}
      className={styles.nodeImg}
      alt="A rectangular end node with double border"
    />
    <h2>Crossroads</h2>
    <p>
      Crossroads are a special type of node indicated by a diamond. Rather than
      representing a passage, crossroads create paths based on conditional
      statements. It's an alternative to directly using the reader's responses
      to navigate between nodes.
    </p>
    <img
      src={imgCrossroads}
      className={styles.nodeStartImg}
      alt="A diamond crossroads node"
    />
    <p>
      Confused about crossroads? Don't worry! We'll cover more of this in the
      upcoming sections.
    </p>
  </div>
);

export default Nodes;
