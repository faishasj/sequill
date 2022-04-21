import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./Button.module.css";

const Button = ({ children, icon, onClick, className = "" }) => {
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
