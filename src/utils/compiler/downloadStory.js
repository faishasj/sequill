import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import JSZip from "jszip";
import escapeHtml from "escape-html";
import { saveAs } from "file-saver";
import { Text } from "slate";

const serialize = (node) => {
  if (Text.isText(node)) {
    let string = escapeHtml(node.text);
    if (node.bold) {
      string = `<strong>${string}</strong>`;
    }
    if (node.code) {
      string = `<code>${string}</code>`;
    }
    if (node.italic) {
      string = `<em>${string}</em>`;
    }
    if (node.underline) {
      string = `<u>${string}</u>`;
    }
    if (node.strikethrough) {
      string = `<strike>${string}</strike>`;
    }
    return string;
  }

  const children = node.children.map((n) => serialize(n)).join("");

  switch (node.type) {
    case "block-quote":
      return `<blockquote style="text-align:${
        node.align || "left"
      }"><p>${children}</p></blockquote>`;
    case "bulleted-list":
      return `<ul style="text-align:${node.align || "left"}">${children}</ul>`;
    case "numbered-list":
      return `<ol style="text-align:${node.align || "left"}">${children}</ol>`;
    case "list-item":
      return `<li style="text-align:${node.align || "left"}">${children}</li>`;
    case "heading-one":
      return `<h1 style="text-align:${node.align || "left"}">${children}</h1>`;
    case "heading-two":
      return `<h2 style="text-align:${node.align || "left"}">${children}</h2>`;
    case "paragraph":
      return `<p style="text-align:${node.align || "left"}">${children}</p>`;
    case "image":
      return `<img src=${node.url}>${children}</img>`;
    default:
      return children;
  }
};

const convertTrigger = (trigger, node) => {
  let string = trigger;
  if (node.data.ignoreCapitalisation) string = string.toLowerCase();
  if (node.data.ignorePunctuation)
    string = string.replace(
      /['!"#$%&\\'()\*+,\-\.\/:;<=>?@\[\\\]\^_`{|}~']/g,
      ""
    );
  if (node.data.ignoreArticles)
    string = string.replace(/(?:(the|a|an) +)/gi, "");
  return string.replace(/\s+/g, " ");
};

const getHtml = (story) =>
  `<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>${story.title}</title>
    <script src='js/jquery.min.js'></script>
    <link rel="stylesheet" href="css/style.css">
  </head>
  <body>
    <div id="container">
      <div id="content">
        <div id="title">${story.title}</div>
        <div id="blurb">${story.blurb}</div>
        <div id="stage">
          <div id="output"></div>
          <div id="input">
            <div id="textrow">
              <div id="cursor">${story.cursor}</div>
              <input id="text" autofocus></input>
            </div>
            <div id="buttons"></div>
          </div>
        </div>
      </div>
    </div>
    <script src='js/index.js'></script>
  </body>
</html>`;

const getJs = (story) => {
  const nodes = story.graph.nodes;
  const edges = story.graph.edges;
  const variables = story.graph.variables;

  const states = nodes.reduce(
    (acc, node) => ({
      ...acc,
      [node.id]: {
        id: node.id,
        type: node.type,
        pathType: node.data.pathType,
        ...(node.data.pathType !== "condition" && {
          text: node.data.text
            .reduce((acc, tNode) => acc + serialize(tNode), "")
            .replace(
              /{{(.*?)}}/g,
              (match, p1) => `{{${variables.find((v) => v.name === p1).id}}}`
            ),
        }),
        ...(node.data.pathType === "text" && {
          ignoreCapitalisation: node.data.ignoreCapitalisation,
          ignorePunctuation: node.data.ignorePunctuation,
          ignoreArticles: node.data.ignoreArticles,
        }),
        transitions:
          node.data.pathType === "text"
            ? edges
                .filter((e) => e.source === node.id)
                .reduce(
                  (acc, edge) => ({
                    ...acc,
                    ...edge.data.triggers.reduce(
                      (acc, trigger) => ({
                        ...acc,
                        [convertTrigger(trigger, node)]: {
                          to: edge.target,
                          actions: edge.data.actions,
                        },
                      }),
                      {}
                    ),
                  }),
                  {}
                )
            : node.data.pathType === "button"
            ? edges
                .filter((e) => e.source === node.id)
                .reduce(
                  (acc, edge) => ({
                    ...acc,
                    [edge.data.name]: {
                      to: edge.target,
                      actions: edge.data.actions,
                    },
                  }),
                  {}
                )
            : {
                default: edges.find(
                  (e) => e.source === node.id && e.data.isDefault
                ).target,
                conditions: edges
                  .filter((e) => e.source === node.id && !e.data.isDefault)
                  .map((e) => ({
                    to: e.target,
                    requires: e.data.conditions,
                  })),
              },
      },
    }),
    {}
  );
  return `const states = ${JSON.stringify(states)};

var variables = ${JSON.stringify(
    variables.reduce(
      (acc, variable) => ({
        ...acc,
        [variable.id]: { ...variable, value: variable.initialValue },
      }),
      {}
    )
  )};

var state = ${JSON.stringify(
    states[Object.keys(states).find((id) => states[id].type === "input")]
  )};

var lastInput = "";
var replaceContent = ${story.replaceNode};
var cursor = "${story.cursor}";
var errorMessages = [("${story.errorMessages.join(`", "`)}")];

$(document).ready(function () {
  const convertInput = (input) => {
    let string = input;
    if (state.pathType === "text") {
      if (state.ignoreCapitalisation) string = string.toLowerCase();
      if (state.ignorePunctuation)
        string = string.replace(
          ${/['!"#$%&\\'()\*+,\-\.\/:;<=>?@\[\\\]\^_`{|}~']/g},
          ""
        );
      if (state.ignoreArticles)
        string = string.replace(/(?:(the|a|an) +)/gi, "");
      string = string.replace(/\\s+/g, " ");
    }
    return string;
  };

  const getText = (text) =>
    text.replace(/{{(.*?)}}/g, (match, p1) =>
      p1 === "response" ? \`\${lastInput}\` : \`\${variables[p1].value}\`
    );

  const trueValue = (value, type) => {
    let trueValue = value;
    if (typeof trueValue === "string") {
      trueValue = getText(trueValue);
      switch (type) {
        case "Number":
          trueValue = Number(trueValue);
          break;
        case "Boolean":
          trueValue = trueValue === "true";
          break;
        case "List":
          trueValue = value.split(",");
          break;
      }
    }
    return trueValue;
  };

  const doAction = (action) => {
    const variable = variables[action.variable];
    const value = trueValue(action.value, variable.type);
    switch (variable.type) {
      case "Text":
        switch (action.action) {
          case "Set":
            variable.value = value;
            return;
          case "Append":
            variable.value += value;
            return;
        }
      case "Number":
        switch (action.action) {
          case "Set":
            variable.value = value;
            return;
          case "Add":
            variable.value += value;
            return;
          case "Subtract":
            variable.value -= value;
            return;
          case "Multiply":
            variable.value * value;
            return;
          case "Divide":
            variable.value /= value;
            return;
        }
      case "Boolean":
        switch (action.action) {
          case "Set":
            variable.value = value;
            return;
          case "Not":
            variable.value = !value;
            return;
          case "And":
            variable.value = variable.value && value;
            return;
          case "Or":
            variable.value = variable.value || value;
            return;
        }
      case "List":
        switch (action.action) {
          case "Set":
            variable.value = action.value;
            return;
          case "Append":
            variable.value = variable.value.concat(value);
            return;
          case "Remove":
            variable.value = variable.value.filter(
              (item) => !value.includes(item)
            );
            return;
        }
    }
  };

  const next = (input) => {
    const nextTransition =
      state.transitions[convertInput(input)] || state.transitions[""];
    if (nextTransition) {
      return [states[nextTransition.to], nextTransition.actions];
    } else {
      return [undefined, undefined];
    }
  };

  const met = (condition) => {
    const variable = variables[condition.variable];
    const v1 = variable.value;
    const v2 = trueValue(condition.value, variable.type);
    switch (condition.condition) {
      case "equal to":
        return v1 === v2;
      case "not equal to":
        return v1 !== v2;
      case "greater than":
        return v1 > v2;
      case "less than":
        return v1 < v2;
      case "greater than or equal to":
        return v1 >= v2;
      case "less than or equal to":
        return v1 <= v2;
      case "contains":
        return v1.includes(v2);
      case "doesn't contain":
        return !v1.includes(v2);
    }
  };

  const meets = (conditions) => {
    if (conditions.length === 0) return false;
    let groups = [[conditions[0]]];
    for (let i = 1; i < conditions.length; i++) {
      if (conditions[i].connective === "or") {
        groups.push([conditions[i]]);
      } else {
        groups[groups.length - 1].push(conditions[i]);
      }
    }
    for (let i = 0; i < groups.length; i++) {
      let satisfied = true;
      for (let c = 0; c < groups[i].length; c++) {
        if (!met(groups[i][c])) {
          satisfied = false;
          break;
        }
      }
      if (satisfied) {
        return true;
      }
    }
    return false;
  };

  const transition = (input) => {
    lastInput = input;
    $("#buttons").empty();
    const [nextState, actions] = next(input);
    if (nextState) {
      actions.forEach(doAction);
      state = nextState;
      if (state.pathType === "condition") {
        let nextState = states[state.transitions.default];
        let conditions = state.transitions.conditions;
        for (let i = 0; i < conditions.length; i++) {
          if (meets(conditions[i].requires)) {
            nextState = states[conditions[i].to];
            break;
          }
        }
        state = nextState;
      }
      if (replaceContent) {
        $("#output").empty();
      }
      $("#output").append(\`<div class="previousResponse"><p>\${cursor}\${input}</p></div>\`);
      $("#output").append(\`<div class="node" id="\${state.id}">\${getText(state.text)}</div>\`);
      if (state.type === "output") $("#input").hide();
      showInput(state);
    } else {
      $("#output").append(\`<div class="previousResponse"><p>\${cursor}\${input}</p></div>\`);
      $("#output").append(
        \`<div class="node errorMessage"><p>\${
          errorMessages[Math.floor(Math.random() * errorMessages.length)]
        }</p></div>\`
      );
    }
    $("body").animate({
      scrollTop: $("body").prop("scrollHeight"),
    });
    $("#text").get(0).focus();
  };

  const showInput = () => {
    switch (state.pathType) {
      case "text":
        $("#buttons").hide();
        $("#textrow").show();
        $("#text")
          .val("")
          .unbind()
          .keypress((e) => {
            if (e.keyCode === 13) {
              transition(e.target.value.replace(/\\s+/g, " ").trim());
              $("#text").val("");
            }
          })
        break;
      case "button":
        $("#textrow").hide();
        $("#buttons").show();
        Object.keys(state.transitions).forEach((name) => {
          $("#buttons").append(
            $(\`<button>\${name}</button>\`)
              .attr({
                type: "button",
                id: name,
                value: name,
              })
              .click(() => transition(name))
          );
        });
        break;
    }
  };

  $("#output").html(\`<div class="node" id="\${state.id}">\${getText(state.text)}</div>\`);
  showInput();
});`;
};

const downloadStory = async (story) => {
  // Create directories
  var zip = new JSZip();
  var js = zip.folder("js");
  var css = zip.folder("css");
  var img = zip.folder("img");

  // Download external files
  const jqueryRes = await fetch(
    "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"
  );
  const jquery = await jqueryRes.text();
  const cssUrl = await getDownloadURL(ref(storage, story.theme));
  const cssRes = await fetch(cssUrl);
  const cssText = await cssRes.text();

  // Add files to directory and zip
  css.file("style.css", cssText);
  js.file("jquery.min.js", jquery);
  js.file("index.js", getJs(story));
  zip.file("index.html", getHtml(story));
  zip.generateAsync({ type: "blob" }).then(function (content) {
    saveAs(content, story.title + ".zip");
  });
};

export default downloadStory;
