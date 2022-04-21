import { faMinus } from "@fortawesome/free-solid-svg-icons";
import ButtonIcon from "../ButtonIcon";
import TableInput from "../TableInput";

const ListInput = ({
  className = "",
  heading = "",
  onAddRowText,
  onChange,
  values,
  minimum = 0,
  defaultValue = "",
}) => {
  return (
    <TableInput
      className={className}
      headings={[heading, ""]}
      widths={[95, 5]}
      onAddRowText={onAddRowText}
      onAddRow={() => onChange([...values, defaultValue])}
    >
      {values.map((value, i) => (
        <tr>
          <td>
            <input
              key={i}
              value={value}
              onChange={(e) =>
                onChange(
                  values.map((v, idx) => (idx === i ? e.target.value : v))
                )
              }
            />
          </td>
          <td>
            {i >= minimum && (
              <ButtonIcon
                icon={faMinus}
                onClick={() => onChange(values.filter((v, idx) => i !== idx))}
              />
            )}
          </td>
        </tr>
      ))}
    </TableInput>
  );
};

export default ListInput;
