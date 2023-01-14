const http = require('http');
const wsock = require('websocket-stream');
const ecstatic = require('ecstatic');
const onend = require('end-of-stream');

const st = ecstatic(__dirname + '/public');


const server = http.createServer(function (req, res) {
  st(req, res);
});
server.listen(8888);

let count = 0;
const streams = [];
wsock.createServer({server}, function (stream) {
  count++;
  streams.push(stream);
  streams.forEach((s) => s.write(count + '\n'));
  onend(stream, () => {
    const ix = streams.indexOf(stream);
    streams.splice(ix, 1);
  })
});