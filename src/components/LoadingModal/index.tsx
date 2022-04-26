import React from "react";

import Modal from "components/Modal";
import styles from "./LoadingModal.module.css";

interface Props {
  title: string;
}

const LoadingModal: React.FC<Props> = ({ title = "Loading" }) => {
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
