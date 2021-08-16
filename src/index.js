import { app, h, text } from "hyperapp"
import { Http } from "hyperapp-fx"

// --- ACTIONS ---

const GetShoList = state => [
  {...state, fetching: true},
  Http({
    url: "https://y3vglivbe6.execute-api.ap-northeast-1.amazonaws.com/Prod/search",
    options: {
      method: "POST",
      body: JSON.stringify({
        word: GetQ(state).q
      })
    },
    action: (state, content) => {
      return{ ...state, fetching: false, sholist: content}
    },
    error: (state, error) => ({ ...state, fetching: false, sholist: "error"}),
  }),
]

const GetQ = state => {
  let q = new Object;
  var pair=location.search.substring(1).split('&');
  for(var i=0;pair[i];i++) {
    var kv = pair[i].split('=');
    q[kv[0]]=kv[1];
  }
  return {...state, q: decodeURI(q.q)};
}

// --- VIEW CONPONENTS ---

const ShoItem = props => 
  h("div", {}, [
    h('li', {}, [
      h("h2", {}, text(props.name)),
      h("p", {}, text(props.symptoms))
    ]),
    
  ])

const SearchForm = props =>
  h("form", {}, [
    h("input", {
      type: "search", 
      name: "q",
      placeholder: "症状を入力...",
      autofocus: true
    } ),
  ])

const ShoList = props =>
  h('ul', {}, [
    ...props.sholist.map(sho => JSON.parse(JSON.stringify(sho))).map( sho => ShoItem({
      name: sho.name,
      similarity: sho.similarity,
      symptoms: sho.symptoms
    })),
  ])

app({
  init: GetShoList({q: "",sholist: [],fetching:false}),
  view: state => 
  h("main", {}, [
    h("h1", {}, text("証検索インターフェース")),
    SearchForm(state),
    state.fetching ? h("h1", {}, text("loading")) : state.sholist && ShoList(state)
  ]),
  node: document.body,
})