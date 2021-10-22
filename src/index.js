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
    action: (state, content) => ({ ...state, fetching: false, sholist: content}),
    error: (state, error) => ({ ...state, fetching: false, error: error}),
  }),
]

const GetQ = state => {
  let arg = new Object;
  var pair=location.search.substring(1).split('&');
  for(var i=0;pair[i];i++) {
    var kv = pair[i].split('=');
    arg[kv[0]]=kv[1];
  }
  return {...state, q: 'q' in arg && decodeURI(arg.q)};
}

// --- VIEW CONPONENTS ---

const ShoItem = props => 
  h("div", {}, [
    h('li', {}, [
      h("h2", {}, text(props.name)),
      h("p", {}, text(props.description)),
      h("details", {}, [
        h("summary", {}, text("詳細")),
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
      h("p", {}, h("font", {color: "gray"}, text("出典： " + props.references)))
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

// --- APP COMPONENTS ---

app({
  init: GetShoList({q: "",sholist: [],fetching:false}),
  view: state => 
  h("main", {}, [
    h("h1", {}, text("証検索インターフェース")),
    SearchForm(state),
    state.fetching ? 
      h("h1", {}, text("loading")) : 
      state.error ? 
        h("h1", {}, text(state.error)) : 
        state.sholist && ShoList(state)
  ]),
  node: document.body,
})