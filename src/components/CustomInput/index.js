import styles from "./CustomInput.module.css";

const CustomInput = ({
  type = "text",
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
            Text: (
              <input
                className={styles.input}
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
              />
            ),
            Number: (
              <input
                className={styles.input}
                type="number"
                initialvalue={0}
                value={value.toString()}
                onChange={(e) => onChange(Number(e.target.value))}
              />
            ),
            Boolean: (
              <select
                className={styles.input}
                name="booleanInput"
                value={value}
                onChange={(e) => onChange(e.target.value)}
              >
                <option value={true}>True</option>
                <option value={false}>False</option>
              </select>
            ),
            List: (
              <input
                type="text"
                value={value}
                placeholder="Item1,Item2"
                onChange={(e) => onChange(e.target.value).split(",")}
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

export default CustomInput;
