import React from "react";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

import ButtonIcon from "components/ButtonIcon";
import TableInput from "components/TableInput";
import styles from "./ListInput.module.css";

interface Props {
  className?: string;
  heading?: string;
  values: any[];
  defaultValue?: string;
  placeholder?: string;
  minimum?: number;
  onAddRowText?: string;
  onChange: (values: any[]) => void;
}

const ListInput: React.FC<Props> = ({
  className = "",
  heading = "",
  values = [],
  defaultValue = "",
  placeholder = "",
  minimum = 0,
  onAddRowText = "Add Row",
  onChange = () => {},
}) => {
  return (
    <TableInput
      className={styles.listInput + " " + className}
      headings={[heading, ""]}
      widths={[97, 3]}
      onAddRowText={onAddRowText}
      onAddRow={() => onChange([...values, defaultValue])}
    >
      {values.map((value, i) => (
        <tr key={i}>
          <td colSpan={i < minimum ? 2 : 1}>
            <input
              key={i}
              value={value}
              placeholder={placeholder}
              onChange={(e) =>
                onChange(
                  values.map((v, idx) => (idx === i ? e.target.value : v))
                )
              }
            />
          </td>
          {i >= minimum && (
            <td>
              <ButtonIcon
                icon={faMinus}
                onClick={() => onChange(values.filter((v, idx) => i !== idx))}
              />
            </td>
          )}
        </tr>
      ))}
    </TableInput>
  );
};

export default ListInput;
