import Modal from "../../Modal";
import styles from "./LoadingModal.module.css";

const LoadingModal = ({ title = "Loading" }) => {
  return (
    <Modal className={styles.loadingModal}>
      <div>{title}</div>
      <div>
        <div className={styles.spinner}></div>
      </div>
    </Modal>
  );
};

export default LoadingModal;
