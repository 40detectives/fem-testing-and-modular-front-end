// Switch between tap (node) and tape (node & browser) libraries here:
import test from 'tape';
// import {test} from 'tap';
// const test = require('tap').test; // commonjs style for tap
import {elevenizer} from '../index.js';

/*
This is an example of how you would split you main code and your test suite and use it with tap/tape.
    - The app code would be the one in index.js (in parent directory), 
    which exports a function called 'elevenizer' that we want to test.
    - The test suite is composed of the .js files in the test directory.
    In the current file we're going to test 'elevenizer' so we have imported it.
    
We later can run all test in the suite at once by using this commands (install or npx them):
    tape test/*.js
    tap test/*.js
*/

test('single digits', function(t) {
    t.plan(8);
    elevenizer(0, function (err, n) {
        t.error(err);
        t.equal(n, 0, 'n=' +n);
    });
    elevenizer(2, function (err, n) {
        t.error(err);
        t.equal(n, 222, 'n=' +n);
    });
    elevenizer(4, function (err, n) {
        t.error(err);
        t.equal(n, 444, 'n=' +n);
    });
    elevenizer(7, function (err, n) {
        t.error(err);
        t.equal(n, 777, 'n=' +n);
    });
});