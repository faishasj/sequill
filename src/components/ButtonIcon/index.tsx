import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import styles from "./ButtonIcon.module.css";

interface Props {
  className?: string;
  icon: IconProp;
  onClick?: () => void;
}

const ButtonIcon: React.FC<Props> = ({
  className = "",
  icon,
  onClick = () => {},
}) => {
  return (
    <button className={styles.iconBtn + " " + className} onClick={onClick}>
      <FontAwesomeIcon icon={icon}></FontAwesomeIcon>
    </button>
  );
};

export default ButtonIcon;
