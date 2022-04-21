import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./ButtonIcon.module.css";

const ButtonIcon = ({ icon, onClick, className = "" }) => {
  return (
    <button className={styles.iconBtn + " " + className} onClick={onClick}>
      <FontAwesomeIcon icon={icon}></FontAwesomeIcon>
    </button>
  );
};

export default ButtonIcon;
