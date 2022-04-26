import { Timestamp } from "firebase/firestore";
import { EdgeType } from "types/Edge";
import Story from "types/Story";
import Themes from "./themes";

export const DEFAULT_STORY: Story = {
  authorID: "",
  title: "",
  blurb: "",
  coverImage: "",
  dateCreated: Timestamp.fromDate(new Date()),
  dateUpdated: Timestamp.fromDate(new Date()),
  cursor: ">",
  replaceNode: true,
  errorMessages: ["I'm not sure what you mean."],
  graph: {
    variables: [],
    nodes: [],
    edges: [],
  },
  theme: Themes.Console,
  settings: {
    defaultPath: EdgeType.TEXT,
    ignoreCapitalisation: true,
    ignorePunctuation: true,
    ignoreArticles: true,
  },
};
