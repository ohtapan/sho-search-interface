import {h, text, app} from "hyperapp"

app({
  view: () => h("main", {}, [
    h("div", {class: "person"}, [
      h("p", {}, text("Hello mei chan")),
    ]),
  ]),
  node: document.getElementById("app"),
})