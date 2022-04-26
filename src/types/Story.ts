import Themes from "constants/themes";
import { Timestamp } from "firebase/firestore";
import Edge, { EdgeType } from "./Edge";
import Node, { NodeType } from "./Node";
import Variable from "./Variable";

export interface StorySettings {
  defaultPath: EdgeType.TEXT | EdgeType.BUTTON;
  ignoreCapitalisation: boolean;
  ignorePunctuation: boolean;
  ignoreArticles: boolean;
}

interface Story {
  authorID: string;
  title: string;
  blurb: string;
  coverImage: string;
  dateCreated: Timestamp;
  dateUpdated: Timestamp;
  cursor: string;
  replaceNode: boolean;
  errorMessages: string[];
  theme: string;
  graph: {
    variables: Variable[];
    nodes: Node[];
    edges: Edge[];
  };
  settings: StorySettings;
}

export default Story;

export const newStory = (): Story => ({
  authorID: "",
  title: "Untitled Story",
  blurb: "",
  coverImage: "",
  dateCreated: Timestamp.fromDate(new Date()),
  dateUpdated: Timestamp.fromDate(new Date()),
  cursor: ">",
  replaceNode: true,
  errorMessages: ["I'm not sure what you mean."],
  theme: Themes.Console,
  graph: {
    variables: [],
    nodes: [
      {
        id: "start",
        type: NodeType.START,
        data: {
          label: "Once upon a time...",
          picture: "",
          text: [
            { type: "paragraph", children: [{ text: "Once upon a time..." }] },
          ],
          pathType: EdgeType.TEXT,
          ignoreCapitalisation: true,
          ignorePunctuation: true,
          ignoreArticles: true,
        },
        position: {
          x: 0,
          y: 0,
        },
      },
    ],
    edges: [],
  },
  settings: {
    defaultPath: EdgeType.TEXT,
    ignoreCapitalisation: true,
    ignorePunctuation: true,
    ignoreArticles: true,
  },
});
