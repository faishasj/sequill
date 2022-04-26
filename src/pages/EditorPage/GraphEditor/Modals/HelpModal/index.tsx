import React from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import Modal from "components/Modal";
import ButtonIcon from "components/ButtonIcon";

interface Props {
  onClose: () => void;
}

const HelpModal: React.FC<Props> = ({ onClose }) => {
  return (
    <Modal
      title="Help"
      barButton={<ButtonIcon icon={faXmark} onClick={onClose} />}
    >
      <div>
        <b>Click and drag</b> to move around the canvas.
      </div>
      <p>
        <b>Scroll or pinch</b> to zoom in and out.
      </p>
      <p>
        <b>Right-click</b> on the canvas to add a new node.
      </p>
      <p>
        <b>Click and drag from one node handle to another</b> to create a path
        between the two nodes.
      </p>
      <p>
        <b>Click on a node or path</b> to edit it.
      </p>
      <p>
        <b>Right-click on a node or path</b> to delete it or see more options.
      </p>
      <p>
        Still stuck? Go to the "Learn" page to learn more about the SeQuill
        editor.
      </p>
    </Modal>
  );
};

export default HelpModal;
