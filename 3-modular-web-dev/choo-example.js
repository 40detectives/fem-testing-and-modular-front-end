const choo = require('choo');
const html = require('choo/html');
const wsock = require('websocket-stream');
const reducer = require('./reducer')
const split = require('split2');
const to = require('to2');

const app = choo();
app.route('/', function(state, emit) {
    return html`
      <body>
        <h1>choo example</h1>
        <h1>${state.visitors}</h1>
        <div>${state.x}</div>
        <button onclick=${onclick}>CLICK ME!</button>
      </body>
    `;
    function onclick(ev) {
      // now we only have access to the emit function
      // we don't have access to the bus object anymore, 
      // so we won't be adding hacky listeners to the render callback, which is good
      emit('increment-x');
    }
});
app.mount(document.body);

const stream = wsock('ws://' + location.host);
stream.pipe(split()).pipe(to(function(buffer, enc, next) {
  app.emit('set-visitors', Number(buffer.toString()));
  next();
}));

// app wide events - start
app.use(reducer);
// app wide events - end

/* setInterval(function () {
  bus.emit('set-visitors');
}, 1000); */