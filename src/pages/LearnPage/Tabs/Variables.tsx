import React from "react";

import imgVariables from "images/variables.png";
import imgVariableReference from "images/variable_reference.png";
import styles from "./Tab.module.css";

const Variables = () => (
  <div className={styles.tabContent}>
    <p>
      Variables are used to store values. They can change over time based on the
      reader's actions throughout the story. You can use variables inside nodes
      and paths.
    </p>
    <p>
      You can manage your story's variables by clicking on <b>Variables</b> from
      the toolbox.
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
      You can reference a variable in a node's text by surrounding the
      variable's name in double curly braces e.g. {"{{variableName}}"}. When the
      story is exported, the reference will be replaced by the variable's value.
    </p>
    <img src={imgVariableReference} style={{ maxHeight: "110px" }}></img>
    <h2>Examples</h2>
    <p>
      To better understand how variables can be used in your story, here are
      some interesting use-cases:
    </p>
    <ul>
      <li>
        <p>
          You use a Text variable to store the reader's name to reference
          throughout the story.
        </p>
      </li>
      <li>
        <p>
          You use a Number variable to keep a counter representing the reader's
          relationship with a character.
        </p>
      </li>
      <li>
        <p>
          You use a Boolean variable to check whether the reader is allowed to
          enter a room.
        </p>
      </li>
      <li>
        <p>You use a List variable to create an inventory for the reader.</p>
      </li>
    </ul>
    <p>In the next section, we'll cover how to set and use variables.</p>
  </div>
);

export default Variables;
