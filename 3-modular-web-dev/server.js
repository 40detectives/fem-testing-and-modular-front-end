const http = require('http');
const wsock = require('websocket-stream');
const ecstatic = require('ecstatic');
const onend = require('end-of-stream');
const router = require('routes')();

const st = ecstatic(__dirname + '/public');

router.addRoute('GET /user/:name', function(req, res, m) {
  res.end('name=' + m.params.name + '\n');
});

const server = http.createServer(function (req, res) {
  const theresMatch = router.match(req.method + ' ' + req.url);
  if (theresMatch) {
    theresMatch.fn(req, res, theresMatch);
  } else {
    st(req, res);
  }
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