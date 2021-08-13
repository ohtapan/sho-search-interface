import {h, text, app} from "hyperapp"

app({
  view: () => h("main", {}, [
    h("div", {class: "person"}, [
      h("p", {}, text("Hello world")),
    ]),
  ]),
  node: document.getElementById("app"),
})