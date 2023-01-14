const html = require('yo-yo');
const EventEmitter = require('events');
 
const state = {
  n: 5,
  x: 0
};

// app wide events - start
const bus = new EventEmitter();
bus.on('increment-n', function() {
  state.n++;
  bus.emit('render');
});
bus.on('increment-x', function() {
  state.x = (state.x+1) % 5;
  bus.emit('render');
});
bus.on('render', update);
// app wide events - end

const root = document.body.appendChild(document.createElement('div'));

function update(){
  html.update(root, html`<div>
    <h1>${state.n}</h1>
    <div>${state.x}</div>
    <button onclick=${onclick}>CLICK ME!</button>
  </div>`);
  function onclick(ev) {
    bus.emit('increment-x');
  }
}

update();
setInterval(function () {
  bus.emit('increment-n');
}, 1000);