import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ButtonIcon from "components/ButtonIcon";
import React from "react";

import styles from "./TableInput.module.css";

interface Props {
  children?: React.ReactNode;
  className?: string;
  headings: string[];
  widths?: number[];
  onAddRowText?: string;
  onAddRow: () => void;
}

const TableInput: React.FC<Props> = ({
  children,
  className = "",
  headings,
  widths = [],
  onAddRowText = "Add Row",
  onAddRow = () => {},
}) => {
  const colWidths = widths || headings.map((_) => 100 / headings.length);

  return (
    <div className={className}>
      <table className={styles.tableInput}>
        <thead>
          <tr id="headings">
            {headings.map((heading, i) => (
              <th key={i} id={heading} style={{ width: `${colWidths[i]}%` }}>
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
      {onAddRow && (
        <div onClick={onAddRow} className={styles.addRowBtn}>
          <ButtonIcon icon={faPlus} /> {onAddRowText}
        </div>
      )}
    </div>
  );
};

export default TableInput;
