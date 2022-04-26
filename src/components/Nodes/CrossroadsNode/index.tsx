import React, { memo } from "react";
import { Handle, Position } from "react-flow-renderer";

import styles from "./CrossroadsNode.module.css";

interface Props {
  isConnectable: boolean;
}

const CrossroadsNode = memo(({ isConnectable }: Props): JSX.Element => {
  return (
    <>
      <div className={styles.crossroads} />
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: "#000" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={{ background: "#000" }}
        isConnectable={isConnectable}
      />
    </>
  );
});

export default CrossroadsNode;
