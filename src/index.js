import { app, h, text } from "hyperapp"
import { Http } from "hyperapp-fx"

// --- ACTIONS ---
const preventDefault = (action) => (state, event) => [
  state,
  [(dispatch) => (event.preventDefault(), dispatch(action))],
]

const NewValue = (state, value) => ({ ...state, value })
const withPayload = (filter) => (_, payload) => filter(payload)
const targetValue = (action) => withPayload((e) => [action, e.target.value])

const FetchSearch = state => [
  {...state, fetching: true},
  Http({
    url: "https://y3vglivbe6.execute-api.ap-northeast-1.amazonaws.com/Prod/search",
    //url: "http://127.0.0.1:3000/search",
    options: {
      method: "POST",
      body: JSON.stringify({
        query: state.value
      })
    },
    action: (state, content) => ({ ...state, fetching: false, sholist: content, error:false}),
    error: (state, error) => ({ ...state, fetching: false, error: error}),
  }),
]
// --- VIEW CONPONENTS ---

const DetailCard = props =>
h("div", {class:"card mb-4"}, [
  h("div", {class:"card-header"}, text("詳細")),
  h("ul", {class:"list-group list-group-flush"}, [
    h("li", {class:"list-group-item"}, [
      h("div", {class:"row"}, [
        h("b", {class:"col-sm-auto"}, text("症状：　　")),
        h("div", {class:"col-sm"},text(props.symptoms)),
      ]),
    ]),
    h("li", {class:"list-group-item"}, [
      h("div", {class:"row"}, [
        h("b", {class:"col-sm-auto"}, text("部位：　　")),
        h("div", {class:"col-sm"},text(props.region)),
      ]),
    ]),
    h("li", {class:"list-group-item"}, [
      h("div", {class:"row"}, [
        h("b", {class:"col-sm-auto"}, text("主な薬物：")),
        h("div", {class:"col-sm"},text(props.crude_drags)),
      ]),
    ]),
    h("li", {class:"list-group-item"}, [
      h("div", {class:"row"}, [
        h("b", {class:"col-sm-auto"}, text("方剤例：　")),
        h("div", {class:"col-sm"},text(props.prescriptions)),
      ]),
    ]),
    h("li", {class:"list-group-item"}, [
      h("div", {class:"row"}, [
        h("b", {class:"col-sm-auto"}, text("治療法：　")),
        h("div", {class:"col-sm"},text(props.treatment)),
      ]),
    ]),
  ]),
])


const ShoItem = props => 
  h("div", {class:"card mt-3"}, [
    h('div', {class:"card-body"}, [
      h("h2", {class:"card-title"}, text(props.name)),
      h("p", {class:"card-text"}, text(props.description)),
      DetailCard(props),
        h("footer", {class: "blockquote-footer mb-0"}, text("出典： " + props.references))
    ]),
  ])

const SearchForm = props =>
h("div", {class:"sticky-top"}, [
  h("form", {onsubmit: preventDefault(FetchSearch), class:"row row-cols-2 g-1 align-items-center has-search"}, [
    h("div", {class:"col-sm"}, [
      h("div", {class:"flex-nowrap"}, [
        h("i",{class:"fas fa-search form-control-feedback"}),
        h("input", {
            class:"form-control",
            oninput: targetValue(NewValue),
            type: "search", 
            placeholder: "症状を入力...",
            autofocus: true,
            required: true,
        })
      ]),
    ]),
    h("div", {class:"col-sm-auto"}, [
      h("button", {
        class:"btn btn-primary",
        type: "submit",
        disabled:props.fetching,
      }, [
        text("検索")
      ])
    ])
  ])
])

const ShoList = props =>
  h('div', {}, [
    ...props.sholist.map(sho => JSON.parse(JSON.stringify(sho))).map( sho => ShoItem({
      name: sho.name,
      similarity: sho.similarity,
      description: sho.description,
      symptoms: sho.symptoms,
      region: sho.region,
      crude_drags: sho.crude_drags,
      prescriptions: sho.prescriptions,
      treatment: sho.treatment,
      references: sho.references,
      q: null,
      error: null,
    })),
  ])

const view = state => 
h("div", {class:"container"}, [
  h("div", {}, [
    h("h1", {class:"m-3"}, text("証情報検索システム"))
  ]),
  SearchForm(state),
  state.fetching ?
  h("div", {class:"d-flex justify-content-center"}, [
    h("div", {class:"spinner-border m-5", role:"status"}) 
  ]): 
    state.error ? 
      h("h1", {}, text(state.error)) : 
      state.sholist && ShoList(state)
])

// --- APP COMPONENTS ---

app({
  init: {value:"",sholist: [],fetching:false},
  view,
  node: document.getElementById("app"),
})