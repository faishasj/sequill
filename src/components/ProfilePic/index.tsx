import React from "react";

import styles from "./ProfilePic.module.css";

interface Props {
  className?: string;
  style?: React.CSSProperties;
  url?: string;
  onClick?: () => void;
}

const ProfilePic: React.FC<Props> = ({
  className = "",
  style = {},
  url = "",
  onClick = () => {},
}) => {
  return (
    <div
      className={styles.profilePic + " " + className}
      style={{ ...style, backgroundImage: `url("${url}")` }}
      onClick={onClick}
    />
  );
};

export default ProfilePic;
