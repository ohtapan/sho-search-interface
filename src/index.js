import { h, app } from 'hyperapp';

app({
  container: document.getElementById('app'),
  init: 'World',
  view: message => <div>Hello {message} !</div>,
});
