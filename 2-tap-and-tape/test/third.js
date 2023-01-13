import http from 'http';
import concat from 'concat-stream'
// Switch between tap (node) and tape (node & browser) libraries here:
// import test from 'tape';
import {test} from 'tap';
// const test = require('tap').test; // commonjs style
import {elevenizer, initServer} from '../index.js';


/*
A less contrived example using a setup phase and a teardown phase for your tests.
*/

let server;
test('setup', function (t) {
    server = initServer();
    server.listen(0, function() {
        t.end();
    });
});

test('tests with HTTP Sever Up', function(t) {
    t.plan(6);
    testDigit(1, 111);
    testDigit(4, 444);
    testDigit(3, 333);
    function testDigit(n, expected) {
        const request = http.request({
            host: 'localhost',
            port: server.address().port,
            path: '/' + n,
        }, function(response) {
            t.equal(response.statusCode, 200);
            response.pipe(concat(function(body) {
                t.equal(Number(body.toString()), expected);
            }));
        });
        request.end();
    }
});

test('teardown', function (t) {
    server.close(function () {
        t.end();
    });
});