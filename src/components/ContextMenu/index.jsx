import styles from "./ContextMenu.module.css";

const ContextMenu = ({ options, x, y }) => {
  return (
    <ul
      className={styles.contextMenu}
      style={{
        transform: `translateX(min(${x}px, calc(100vw - 100%))) translateY(min(${y}px, calc(100vh - 100%)))`,
      }}
    >
      {options.map((option, i) => (
        <li
          key={i}
          onClick={option.action}
          className={option.warning ? styles.warning : ""}
        >
          {option.name}
        </li>
      ))}
    </ul>
  );
};

export default ContextMenu;
