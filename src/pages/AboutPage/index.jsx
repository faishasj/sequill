import Page from "../Page";
import styles from "./AboutPage.module.css";

const AboutPage = () => {
  return (
    <Page name={"About"}>
      <div className={styles.page}>
        <div className={styles.content}>
          <h2>What is SeQuill?</h2>
          <p>
            SeQuill is an open-source interactive fiction engine. It can be used
            to create complex text adventure games with:
          </p>
          <ul>
            <li>branching storylines</li>
            <li>different input methods</li>
            <li>variables</li>
            <li>images</li>
            <li>...and more</li>
          </ul>
          <p>
            without needing to write any code! It is highly customizable, and
            you can even continue to customize your story after exporting it
            from SeQuill.
          </p>
          <h2>How does SeQuill work?</h2>
          <p>
            SeQuill compiles your story down to simple HTML and JavaScript,
            meaning you can play your story directly in the browser. This also
            comes with a few more advantages:
          </p>
          <ul>
            <li>
              You have complete ownership of your story and its generated files.
            </li>
            <br></br>
            <li>
              You can host your story on your own website, or upload it to a
              platform like itch.io.
            </li>
            <br></br>
            <li>
              You can customize the story further with custom HTML, JS, or CSS.
            </li>
          </ul>
          <h2>Open source, you say?</h2>
          <p>
            Yup! SeQuill is one big passion project. Check out the repository{" "}
            <a href="/">
              <b>here</b>
            </a>
            . We welcome contributions!
          </p>
          <p>
            If you would like to report a bug or request a feature, you can do
            so{" "}
            <a href="/">
              <b>here</b>
            </a>
            .
          </p>
        </div>
      </div>
    </Page>
  );
};

export default AboutPage;
