var e={},r=[],s=e=>e,t=r.map,n=Array.isArray,o="undefined"!=typeof requestAnimationFrame?requestAnimationFrame:setTimeout,i=e=>{var r="";if("string"==typeof e)return e;if(n(e))for(var s,t=0;t<e.length;t++)(s=i(e[t]))&&(r+=(r&&" ")+s);else for(var t in e)e[t]&&(r+=(r&&" ")+t);return r},l=(e,r)=>{for(var s in{...e,...r})if("function"==typeof(n(e[s])?e[s][0]:e[s]))r[s]=e[s];else if(e[s]!==r[s])return!0},a=e=>null==e?e:e.key,c=(e,r,s,t,n,o)=>{if("key"===r);else if("style"===r)for(var l in{...s,...t})s=null==t||null==t[l]?"":t[l],"-"===l[0]?e[r].setProperty(l,s):e[r][l]=s;else"o"===r[0]&&"n"===r[1]?((e.events||(e.events={}))[r=r.slice(2)]=t)?s||e.addEventListener(r,n):e.removeEventListener(r,n):!o&&"list"!==r&&"form"!==r&&r in e?e[r]=null==t?"":t:null==t||!1===t||"class"===r&&!(t=i(t))?e.removeAttribute(r):e.setAttribute(r,t)},u=(e,r,s)=>{var t=e.props,n=3===e.type?document.createTextNode(e.tag):(s=s||"svg"===e.tag)?document.createElementNS("http://www.w3.org/2000/svg",e.tag,{is:t.is}):document.createElement(e.tag,{is:t.is});for(var o in t)c(n,o,null,t[o],r,s);for(var i=0;i<e.children.length;i++)n.appendChild(u(e.children[i]=f(e.children[i]),r,s));return e.node=n},d=(e,r,s,t,n,o)=>{if(s===t);else if(null!=s&&3===s.type&&3===t.type)s.tag!==t.tag&&(r.nodeValue=t.tag);else if(null==s||s.tag!==t.tag)r=e.insertBefore(u(t=f(t),n,o),r),null!=s&&e.removeChild(s.node);else{var i,l,m,p,v=s.props,h=t.props,g=s.children,y=t.children,b=0,w=0,k=g.length-1,N=y.length-1;for(var C in o=o||"svg"===t.tag,{...v,...h})("value"===C||"selected"===C||"checked"===C?r[C]:v[C])!==h[C]&&c(r,C,v[C],h[C],n,o);for(;w<=N&&b<=k&&null!=(m=a(g[b]))&&m===a(y[w]);)d(r,g[b].node,g[b],y[w]=f(y[w++],g[b++]),n,o);for(;w<=N&&b<=k&&null!=(m=a(g[k]))&&m===a(y[N]);)d(r,g[k].node,g[k],y[N]=f(y[N--],g[k--]),n,o);if(b>k)for(;w<=N;)r.insertBefore(u(y[w]=f(y[w++]),n,o),(l=g[b])&&l.node);else if(w>N)for(;b<=k;)r.removeChild(g[b++].node);else{var q={},x={};for(C=b;C<=k;C++)null!=(m=g[C].key)&&(q[m]=g[C]);for(;w<=N;)m=a(l=g[b]),p=a(y[w]=f(y[w],l)),x[m]||null!=p&&p===a(g[b+1])?(null==m&&r.removeChild(l.node),b++):null==p||1===s.type?(null==m&&(d(r,l&&l.node,l,y[w],n,o),w++),b++):(m===p?(d(r,l.node,l,y[w],n,o),x[p]=!0,b++):null!=(i=q[p])?(d(r,r.insertBefore(i.node,l&&l.node),i,y[w],n,o),x[p]=!0):d(r,l&&l.node,null,y[w],n,o),w++);for(;b<=k;)null==a(l=g[b++])&&r.removeChild(l.node);for(var C in q)null==x[C]&&r.removeChild(q[C].node)}}return t.node=r},f=(e,r)=>!0!==e&&!1!==e&&e?"function"==typeof e.tag?((!r||null==r.memo||((e,r)=>{for(var s in e)if(e[s]!==r[s])return!0;for(var s in r)if(e[s]!==r[s])return!0})(r.memo,e.memo))&&((r=e.tag(e.memo)).memo=e.memo),r):e:v(""),m=r=>3===r.nodeType?v(r.nodeValue,r):p(r.nodeName.toLowerCase(),e,t.call(r.childNodes,m),1,r),p=(e,r,s,t,n)=>({tag:e,props:r,key:r.key,children:s,type:t,node:n}),v=(s,t)=>p(s,e,r,3,t),h=(e,s,t=r)=>p(e,s,n(t)?t:[t]);function g(e,r){var s,t={};for(s in e)t[s]=e[s];for(s in r)t[s]=r[s];return t}function y(e,r){fetch(r.url,r.options).then((function(e){if(!e.ok)throw e;return e})).then((function(e){return e[r.response]()})).then((function(s){e(r.action,s)})).catch((function(s){e(r.error,s)}))}const b=(e,r)=>({...e,value:r}),w=e=>{return r=r=>[e,r.target.value],(e,s)=>r(s);var r},k=e=>{return[{...e,fetching:!0},(r={url:"https://y3vglivbe6.execute-api.ap-northeast-1.amazonaws.com/Prod/search",options:{method:"POST",body:JSON.stringify({query:e.value})},action:(e,r)=>({...e,fetching:!1,sholist:r,error:!1}),error:(e,r)=>({...e,fetching:!1,error:r})},[y,g({options:{},response:"json",error:r.action},r)])];var r},N=e=>h("div",{class:"card mb-4"},[h("div",{class:"card-header"},v("詳細")),h("ul",{class:"list-group list-group-flush"},[h("li",{class:"list-group-item"},[h("div",{class:"row"},[h("b",{class:"col-sm-auto"},v("症状：　　")),h("div",{class:"col-sm"},v(e.symptoms))])]),h("li",{class:"list-group-item"},[h("div",{class:"row"},[h("b",{class:"col-sm-auto"},v("部位：　　")),h("div",{class:"col-sm"},v(e.region))])]),h("li",{class:"list-group-item"},[h("div",{class:"row"},[h("b",{class:"col-sm-auto"},v("主な薬物：")),h("div",{class:"col-sm"},v(e.crude_drags))])]),h("li",{class:"list-group-item"},[h("div",{class:"row"},[h("b",{class:"col-sm-auto"},v("方剤例：　")),h("div",{class:"col-sm"},v(e.prescriptions))])]),h("li",{class:"list-group-item"},[h("div",{class:"row"},[h("b",{class:"col-sm-auto"},v("治療法：　")),h("div",{class:"col-sm"},v(e.treatment))])])])]),C=e=>h("div",{},[...e.sholist.map((e=>JSON.parse(JSON.stringify(e)))).map((e=>(e=>h("div",{class:"card mt-3"},[h("div",{class:"card-body"},[h("h2",{class:"card-title"},v(e.name)),h("p",{class:"card-text"},v(e.description)),N(e),h("footer",{class:"blockquote-footer mb-0"},v("出典： "+e.references))])]))({name:e.name,similarity:e.similarity,description:e.description,symptoms:e.symptoms,region:e.region,crude_drags:e.crude_drags,prescriptions:e.prescriptions,treatment:e.treatment,references:e.references,q:null,error:null})))]);(({node:t,view:i,subscriptions:a,dispatch:c=s,init:u=e})=>{var f,p,v=t&&m(t),h=[],g=e=>{f!==e&&(null==(f=e)&&(c=a=y=s),a&&(h=((e,s=r,t)=>{for(var n,o,i=[],a=0;a<e.length||a<s.length;a++)n=e[a],o=s[a],i.push(o&&!0!==o?!n||o[0]!==n[0]||l(o[1],n[1])?[o[0],o[1],(n&&n[2](),o[0](t,o[1]))]:n:n&&n[2]());return i})(h,a(f),c)),i&&!p&&o(y,p=!0))},y=()=>t=d(t.parentNode,t,v,v=i(f),b,p=!1),b=function(e){c(this.events[e.type],e)};(c=c(((e,r)=>"function"==typeof e?c(e(f,r)):n(e)?"function"==typeof e[0]?c(e[0],e[1]):e.slice(1).map((e=>e&&!0!==e&&e[0](c,e[1])),g(e[0])):g(e))))(u)})({init:{value:"",sholist:[],fetching:!1},view:e=>{return h("div",{class:"container"},[h("div",{},[h("h1",{class:"m-3"},v("証情報検索システム"))]),(r=e,h("div",{class:"sticky-top"},[h("form",{onsubmit:(s=k,(e,r)=>[e,[e=>(r.preventDefault(),e(s))]]),class:"row row-cols-2 g-1 align-items-center"},[h("div",{class:"col-sm"},[h("div",{class:"input-group flex-nowrap"},[h("span",{class:"input-group-text"},[h("i",{class:"fas fa-search"})]),h("input",{class:"form-control",oninput:w(b),type:"search",placeholder:"症状を入力...",autofocus:!0,required:!0})])]),h("div",{class:"col-sm-auto"},[h("button",{class:"btn btn-primary",type:"submit",disabled:r.fetching},[r.fetching?h("div",{class:"spinner-border spinner-border-sm",role:"status"}):h("i",{class:"fas fa-search"})])])])])),e.fetching?h("div",{class:"d-flex justify-content-center"},[h("div",{class:"spinner-border m-5",role:"status"})]):e.error?h("h1",{},v(e.error)):e.sholist&&C(e)]);var r,s},node:document.getElementById("app")});
//# sourceMappingURL=index.a5f07c6e.js.map
