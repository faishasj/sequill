import React from "react";
import { Link } from "react-router-dom";

import styles from "./NavBar.module.css";

interface Props {
  children?: React.ReactNode;
  pageName?: string;
}

const NavBar: React.FC<Props> = ({ children, pageName = "" }) => {
  return (
    <div className={styles.navBar}>
      <div className={styles.title}>
        <h1 className={styles.siteName}>
          <Link to="/">SeQuill</Link>
        </h1>
        <div className={styles.pageName}>{pageName}</div>
      </div>
      <div className={styles.children}>{children}</div>
    </div>
  );
};

export default NavBar;
