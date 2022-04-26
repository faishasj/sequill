import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut, User } from "firebase/auth";
import { useUpdateProfile } from "react-firebase-hooks/auth";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import Page from "../Page";
import Button from "components/Button";
import ProfilePic from "components/ProfilePic";
import { auth } from "utils/firebase";
import styles from "./AccountSettingsPage.module.css";

interface Props {
  user: User;
}

const AccountSettingsPage: React.FC<Props> = ({ user }) => {
  const [updateProfile, updating, error] = useUpdateProfile(auth);
  const [displayName, setDisplayName] = useState(user.displayName);
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
              <input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              ></input>
            </Field>
          </div>
          <Button
            className={styles.saveBtn}
            onClick={() => updateProfile({ displayName })}
          >
            Save changes
          </Button>
          <Button
            className={styles.signOutBtn}
            onClick={logout}
            icon={faRightFromBracket}
          >
            Sign out
          </Button>
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
