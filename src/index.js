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
    options: {
      method: "POST",
      body: JSON.stringify({
        word: state.value
      })
    },
    action: (state, content) => ({ ...state, fetching: false, sholist: content}),
    error: (state, error) => ({ ...state, fetching: false, error: error}),
  }),
]
// --- VIEW CONPONENTS ---

const ShoItem = props => 
  h("div", {class:"card mt-3"}, [
    h('div', {class:"card-body"}, [
      h("h2", {class:"card-title"}, text(props.name)),
      h("p", {class:"card-text"}, text(props.description)),
      h("div", {class:"card mb-3"}, [
        h("div", {class:"card-header"}, text("詳細")),
        h("div", {class:"card-body"}, [
          h("div", {class:"card-text"}, [
            h("p", {}, [
              h("b", {}, text("症状：")),
              text(props.symptoms),
            ]),
            h("p", {}, [
              h("b", {}, text("証が現れる部位：")),
              text(props.region),
            ]),
            h("p", {}, [
              h("b", {}, text("主な薬物：")),
              text(props.crude_drags),
            ]),
            h("p", {}, [
              h("b", {}, text("方剤例：")),
              text(props.prescriptions),
            ]),
            h("p", {}, [
              h("b", {}, text("治療法：")),
              text(props.treatment),
            ]),
          ]),
        ]),
      ]),
      h("p", {}, h("font", {color: "gray"}, text("出典： " + props.references)))
    ]),
  ])

const SearchForm = props =>
h("form", {onsubmit: preventDefault(FetchSearch), class:"row row-cols-2 g-1 align-items-center"}, [
    h("div", {class:"col-11"}, [
      h("input", {
          class:"form-control",
          oninput: targetValue(NewValue),
          type: "search", 
          placeholder: "症状を入力...",
          autofocus: true,
          required: true,
      })
    ]),
    h("div", {class:"col-1"}, [
      h("input", {
        class:"btn btn-primary",
        type: "submit",
        value: "検索",
      })
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
h("main", {class:"container"}, [
  h("h1", {class:"m-3"}, text("証情報検索システム")),
  SearchForm(state),
  state.fetching ? 
    h("h1", {}, text("loading")) : 
    state.error ? 
      h("h1", {}, text(state.error)) : 
      state.sholist && ShoList(state)
])

// --- APP COMPONENTS ---

app({
  init: {value:"",sholist: [],fetching:false},
  view,
  node: document.body,
})