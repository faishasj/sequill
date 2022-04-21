import THEMES from "./themes";

const DEFAULT_USER = {
  username: "USERNAME",
};

const DEFAULT_NODE = {
  type: "middle",
  data: {
    label: "LABEL",
    picture: "URL",
    text: "TEXT",
  },
  positions: {
    x: 0,
    y: 0,
  },
  paths: {},
};

export const DEFAULT_STORY = {
  authorID: "",
  title: "",
  blurb: "",
  coverImage: "",
  dateCreated: new Date(),
  dateUpdated: new Date(),
  cursor: ">",
  replaceNode: true,
  errorMessages: ["I'm not sure what you mean."],
  graph: {
    variables: [],
    nodes: [],
    edges: [],
  },
};

export const NEW_STORY = {
  authorID: "",
  title: "Untitled Story",
  blurb: "",
  coverImage: "",
  dateCreated: new Date(),
  dateUpdated: new Date(),
  cursor: ">",
  replaceNode: true,
  errorMessages: ["I'm not sure what you mean."],
  theme: THEMES.Console,
  graph: {
    variables: [],
    nodes: [
      {
        id: "start",
        type: "input",
        data: {
          label: "Once upon a time...",
          picture: "",
          text: [
            { type: "paragraph", children: [{ text: "Once upon a time..." }] },
          ],
          pathType: "text",
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
};

export const EXAMPLE_STORY = {
  storyID: "STORY_ID",
  authorID: "faishasj",
  title: "An Interactive Story",
  blurb: "There's not much to it. Yet.",
  coverImage: "",
  dateCreated: Date(),
  dateUpdated: Date(),
  graph: {
    variables: [
      { id: "name", name: "Name", type: "Text", initialValue: "Will" },
      { id: "age", name: "Age", type: "Number", initialValue: 30 },
      { id: "isCool", name: "isCool", type: "Boolean", initialValue: true },
      {
        id: "items",
        name: "Items",
        type: "List",
        initialValue: ["phone", "wallet"],
      },
    ],
    nodes: [
      {
        id: "node1",
        type: "input",
        data: {
          label: "Once upon a time...",
          picture: "",
          text: [
            { type: "paragraph", children: [{ text: "Once upon a time..." }] },
          ],
          pathType: "text",
          ignoreCapitalisation: true,
          ignorePunctuation: true,
          ignoreArticles: true,
        },
        position: {
          x: 250,
          y: 0,
        },
      },
      {
        id: "node2",
        type: "default",
        data: {
          label: `a cat named Atticus meowed "Hello, World!"`,
          picture: "",
          text: [
            {
              type: "paragraph",
              children: [
                { text: `a cat named Atticus meowed "Hello, World!"` },
              ],
            },
          ],
          pathType: "text",
          ignoreCapitalisation: true,
          ignorePunctuation: true,
          ignoreArticles: true,
        },
        position: {
          x: 100,
          y: 200,
        },
      },
      {
        id: "node3",
        type: "output",
        data: {
          label: "The End.",
          picture: "",
          text: [{ type: "paragraph", children: [{ text: "The End." }] }],
          pathType: "text",
        },
        position: {
          x: 200,
          y: 400,
        },
      },
    ],
    edges: [
      {
        id: "node1-node2",
        source: "node1",
        target: "node2",
        label: "...",
        labelStyle: { fill: "#fff" },
        labelBgPadding: [8, 4],
        labelBgBorderRadius: 10,
        labelBgStyle: { fill: "#648FFF", fillOpacity: 0.9 },
        data: {
          type: "text",
          triggers: [""],
          actions: [],
        },
      },
      {
        id: "node2-node3",
        source: "node2",
        target: "node3",
        label: "...",
        labelStyle: { fill: "#fff" },
        labelBgPadding: [8, 4],
        labelBgBorderRadius: 10,
        labelBgStyle: { fill: "#648FFF", fillOpacity: 0.9 },
        data: {
          type: "text",
          triggers: [""],
          actions: [],
        },
      },
    ],
  },
};
