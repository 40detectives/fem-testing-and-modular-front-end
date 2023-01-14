const html = require('yo-yo');
const wsock = require('websocket-stream');
const reducer = require('./reducer')
const EventEmitter = require('events');
const split = require('split2');
const to = require('to2');

const stream = wsock('ws://' + location.host);
stream.pipe(split()).pipe(to(function(buffer, enc, next) {
  bus.emit('set-visitors', Number(buffer.toString()));
  bus.emit('update');
  next();
}));

const state = {
  visitors: 0,
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
    <h1>${state.visitors}</h1>
    <div>${state.x}</div>
    <button onclick=${onclick}>CLICK ME!</button>
  </div>`);
  function onclick(ev) {
    bus.emit('increment-x');
  }
}

update();
/* setInterval(function () {
  bus.emit('set-visitors');
}, 1000); */