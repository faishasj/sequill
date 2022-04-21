import styles from "./ProfilePic.module.css";

const ProfilePic = ({
  url = "",
  className = "",
  style = {},
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
