import React from "react";

import Button from "components/Button";
import styles from "./Modal.module.css";

interface Props {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  barButton?: React.ReactNode;
  onBarButtonClick?: () => void;
  onSave?: () => void;
  onCancel?: () => void;
}

const Modal: React.FC<Props> = ({
  children,
  className = "",
  title,
  barButton,
  onBarButtonClick,
  onSave,
  onCancel,
}) => {
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modal + " " + className}>
        <div className={styles.topBar}>
          {title && <h2>{title}</h2>}
          {barButton && (
            <div className={styles.barButton} onClick={onBarButtonClick}>
              {barButton}
            </div>
          )}
        </div>
        {children}
        {(onSave || onCancel) && (
          <div className={styles.buttons}>
            {onCancel && (
              <Button className={styles.cancel} onClick={onCancel}>
                Cancel
              </Button>
            )}
            {onSave && (
              <Button className={styles.save} onClick={onSave}>
                Save
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
