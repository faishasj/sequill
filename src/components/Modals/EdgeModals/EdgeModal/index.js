import Modal from "../../../Modal";
import ButtonEdgeModal from "../ButtonEdgeModal";
import ConditionEdgeModal from "../ConditionEdgeModal";
import TextEdgeModal from "../TextEdgeModal";
import "./EdgeModal.css";

const EdgeModal = ({ edge, variables, onSave, onCancel }) => {
  return (
    <Modal>
      {edge.data.type === "text" && (
        <TextEdgeModal
          edge={edge}
          variables={variables}
          onSave={onSave}
          onCancel={onCancel}
        />
      )}
      {edge.data.type === "button" && (
        <ButtonEdgeModal
          edge={edge}
          variables={variables}
          onSave={onSave}
          onCancel={onCancel}
        />
      )}
      {edge.data.type === "condition" && (
        <ConditionEdgeModal
          edge={edge}
          variables={variables}
          onSave={onSave}
          onCancel={onCancel}
        />
      )}
    </Modal>
  );
};

export default EdgeModal;
