import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useUpdateProfile } from "react-firebase-hooks/auth";

import { auth } from "../../utils/firebase";
import Button from "../../components/Button";
import Page from "../Page";
import styles from "./AccountSettingsPage.module.css";
import { useCallback } from "react";
import ProfilePic from "../../components/ProfilePic";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const AccountSettingsPage = ({ user }) => {
  const [updateProfile, updating, error] = useUpdateProfile(auth);
  const navigate = useNavigate();

  const logout = useCallback(() => {
    const goAhead = window.confirm("Are you sure you want to sign out?");
    if (goAhead) {
      signOut(auth);
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return (
    <Page name={"Account Settings"}>
      <div className={styles.page}>
        <div className={styles.content}>
          <ProfilePic url={user.photoURL} className={styles.profilePic} />
          <div className={styles.fields}>
            <Field label="Pen name: ">
              <input value={user.displayName}></input>
            </Field>
            <Field label="Email: ">
              <input value={user.email}></input>
            </Field>
            {/*<Field label="Dark mode: ">
              <input type="checkbox" value={user.email}></input>
            </Field>*/}
          </div>
          <div>
            <Button onClick={() => {}}>Save changes</Button>
            <Button
              className="warning"
              onClick={logout}
              icon={faRightFromBracket}
            >
              Sign out
            </Button>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default AccountSettingsPage;

const Field = ({ label, children }) => {
  return (
    <div className={styles.field}>
      <label htmlFor={label}>{label}</label>
      {children}
    </div>
  );
};
