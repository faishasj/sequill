import React, { memo } from "react";
import { Handle } from "react-flow-renderer";

import styles from "./CrossroadsNode.module.css";

const CrossroadsNode = memo(({ isConnectable }) => {
  return (
    <>
      <div className={styles.crossroads} />
      <Handle
        type="target"
        position="top"
        style={{ background: "#000" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position="bottom"
        id="a"
        style={{ background: "#000" }}
        isConnectable={isConnectable}
      />
    </>
  );
});

export default CrossroadsNode;
