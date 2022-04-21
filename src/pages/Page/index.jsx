import { useAuthState } from "react-firebase-hooks/auth";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { auth } from "../../utils/firebase";
import NavBar from "../../components/NavBar";
import ButtonIcon from "../../components/ButtonIcon";
import styles from "./Page.module.css";
import { useNavigate } from "react-router-dom";
import ProfilePic from "../../components/ProfilePic";

const Page = ({ children, name = "" }) => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  return (
    <div className={styles.page}>
      <NavBar pageName={name}>
        {user && <BarButton to="/">My Library</BarButton>}
        <BarButton to="/learn">Learn</BarButton>
        <BarButton to="/about">About</BarButton>
        {user && (
          <ProfilePic
            url={user.photoURL || ""}
            className={styles.profilePic}
            onClick={() => navigate("/settings")}
          />
        )}
      </NavBar>
      <div className={styles.content}> {children} </div>
    </div>
  );
};

export default Page;

const BarButton = ({ children, to }) => {
  const navigate = useNavigate();
  return (
    <button className={styles.barBtn} onClick={() => navigate(to)}>
      {children}
    </button>
  );
};
