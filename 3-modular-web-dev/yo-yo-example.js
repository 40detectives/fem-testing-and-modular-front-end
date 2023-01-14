const html = require('yo-yo');
 
const state = {
  n: 5,
  x: 0
};
const root = document.body.appendChild(document.createElement('div'));

function update(){
  html.update(root, html`<div>
    <h1>${state.n}</h1>
    <div>${state.x}</div>
    <button onclick=${onclick}>CLICK ME!</button>
  </div>`);
  function onclick(ev) {
    state.x++;
    update();
  }
}

update();
setInterval(function () {
  state.n++;
  update();
}, 1000);