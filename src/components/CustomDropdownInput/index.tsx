import React from "react";

import { VarType } from "types/Variable";
import styles from "./CustomDropdownInput.module.css";

interface Props {
  type?: VarType;
  list: any[];
  value: any;
  defaultCustomValue?: any;
  onChange: (value: any) => void;
}

const CustomDropdownInput: React.FC<Props> = ({
  type = VarType.TEXT,
  list = [],
  value = "",
  defaultCustomValue = "",
  onChange = () => {},
}) => {
  return (
    <div className={styles.wrapper}>
      <div>
        {list.find((li) => li.value === value) ? (
          <div className={styles.custom}>
            {list.find((li) => li.value === value).name}
          </div>
        ) : (
          {
            [VarType.TEXT]: (
              <input
                className={styles.input}
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
              />
            ),
            [VarType.NUMBER]: (
              <input
                className={styles.input}
                type="number"
                data-initialValue={0}
                value={value.toString()}
                onChange={(e) => onChange(Number(e.target.value))}
              />
            ),
            [VarType.BOOLEAN]: (
              <select
                className={styles.input}
                name="booleanInput"
                value={value.toString()}
                onChange={(e) => onChange(e.target.value === "true")}
              >
                <option value={"true"}>True</option>
                <option value={"false"}>False</option>
              </select>
            ),
            [VarType.LIST]: (
              <input
                type="text"
                value={value}
                placeholder="Item1,Item2"
                onChange={(e) => onChange(e.target.value.split(","))}
              />
            ),
          }[type]
        )}
      </div>
      <div className={styles.menu}>
        {list.map((li, i) => (
          <div
            key={i}
            className={
              styles.item + " " + (li.value === value ? styles.active : "")
            }
            onClick={() => onChange(li.value)}
          >
            {li.name}
          </div>
        ))}
        <div
          className={
            styles.item +
            " " +
            (list.find((li) => li.value === value) ? "" : styles.active)
          }
          onClick={() => onChange(defaultCustomValue)}
        >
          ...
        </div>
      </div>
    </div>
  );
};

export default CustomDropdownInput;
