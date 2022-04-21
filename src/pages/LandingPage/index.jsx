import { useCallback } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import ReactFlow, { Background } from "react-flow-renderer";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

import { auth } from "../../utils/firebase";
import Button from "../../components/Button";

import "./LandingPage.css";
import Page from "../Page";

const LandingPage = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  return (
    <Page>
      <div className="LandingPage">
        <div className="mainContent__landing">
          <div className="mainContent_wrapper">
            <h1 className="title__landing">
              Take your readers on an adventure.
            </h1>
            <div className="subtitle__landing">
              SeQuill is an open-source interactive fiction engine that uses a
              highly customizable node-based editor. Whether you are creating a
              text adventure or a visual novel, you can map out the story that
              you've been itching to write with SeQuill.
            </div>
            <Button icon={faGoogle} onClick={() => signInWithGoogle()}>
              Sign in with Google
            </Button>
          </div>
        </div>
        <div className="secondaryContent__landing">
          <ReactFlow
            nodes={[
              {
                id: "landing1",
                type: "input",
                data: { label: "You wake up in a room." },
                position: { x: 0, y: 0 },
              },
              {
                id: "landing2",
                type: "default",
                data: { label: "It is pitch black." },
                position: { x: -150, y: 200 },
              },
              {
                id: "landing3",
                type: "default",
                data: {
                  label:
                    "You can't see anything! You lose your balance and fall to the ground.",
                },
                position: { x: 50, y: 400 },
              },
            ]}
            edges={[
              {
                id: "landing1",
                source: "landing1",
                target: "landing2",
                label: "look around",
                data: { type: "button" },
              },
              {
                id: "landing2",
                source: "landing1",
                target: "landing3",
                label: "get up",
                data: { type: "button" },
              },
              {
                id: "landing3",
                source: "landing2",
                target: "landing3",
                label: "get up",
                data: { type: "button" },
              },
            ]}
            fitView
          >
            <Background color="#aaa" gap={16} />
          </ReactFlow>
        </div>
      </div>
    </Page>
  );
};

export default LandingPage;
