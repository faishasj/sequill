import styles from "./Modal.module.css";

const Modal = ({
  children,
  className = "",
  title = null,
  barButton = null,
  onBarButtonClick = () => {},
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
      </div>
    </div>
  );
};

export default Modal;
