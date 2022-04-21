import styles from "./TableInput.module.css";

const TableInput = ({
  children,
  className = "",
  headings,
  widths = null,
  onAddRow = null,
  onAddRowText = "Add Row",
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
          {onAddRowText}
        </div>
      )}
    </div>
  );
};

export default TableInput;
