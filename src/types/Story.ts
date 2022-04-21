import Edge from "./Edge";
import Node from "./Node";
import Variable from "./Variable";

interface Story {
  storyID: string;
  authorID: string;
  title: string;
  blurb: string;
  dateCreated: Date;
  dateUpdated: Date;
  variables: Variable[];
  nodes: Node[];
  edges: Edge[];
}

export default Story;
