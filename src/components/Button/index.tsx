import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import styles from "./Button.module.css";

interface Props {
  children?: React.ReactNode;
  className?: string;
  icon?: IconProp;
  onClick: () => void;
}

const Button: React.FC<Props> = ({
  children,
  icon,
  className = "",
  onClick = () => {},
}) => {
  return (
    <button className={styles.btn + " " + className} onClick={onClick}>
      {icon && (
        <div className={styles.btnIcon}>
          <FontAwesomeIcon icon={icon} />
        </div>
      )}
      <div className={styles.btnContent}>{children}</div>
    </button>
  );
};

export default Button;
