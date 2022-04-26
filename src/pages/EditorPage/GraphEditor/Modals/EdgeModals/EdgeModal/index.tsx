import React from "react";
import Variable from "types/Variable";
import Edge, {
  EdgeType,
  TextEdge,
  ButtonEdge,
  ConditionEdge,
} from "types/Edge";
import ButtonEdgeModal from "../ButtonEdgeModal";
import ConditionEdgeModal from "../ConditionEdgeModal";
import TextEdgeModal from "../TextEdgeModal";
import "./EdgeModal.css";

interface Props {
  edge: Edge;
  variables: Variable[];
  onSave: (edge: Edge) => void;
  onCancel: () => void;
}

const EdgeModal: React.FC<Props> = ({ edge, variables, onSave, onCancel }) => {
  return {
    [EdgeType.TEXT]: (
      <TextEdgeModal
        edge={edge as TextEdge}
        variables={variables}
        onSave={onSave}
        onCancel={onCancel}
      />
    ),
    [EdgeType.BUTTON]: (
      <ButtonEdgeModal
        edge={edge as ButtonEdge}
        variables={variables}
        onSave={onSave}
        onCancel={onCancel}
      />
    ),
    [EdgeType.CONDITION]: (
      <ConditionEdgeModal
        edge={edge as ConditionEdge}
        variables={variables}
        onSave={onSave}
        onCancel={onCancel}
      />
    ),
  }[edge.data.type];
};

export default EdgeModal;
