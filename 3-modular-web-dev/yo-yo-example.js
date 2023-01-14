const html = require('yo-yo');
const reducer = require('./reducer')
const EventEmitter = require('events');
 
const state = {
  n: 5,
  x: 0
};

// app wide events - start
const bus = new EventEmitter();
reducer(bus, state);
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