
// Switch between tap (node) and tape (node & browser) libraries here:
// import test from 'tape';
import {test} from 'tap';
// const test = require('tap').test; // commonjs style

test('<name of test goes here>', function(t) {
    t.equal(1+1,2);
    t.equal(1+2,3);
    t.equal(2+2,4);
    t.end(); // you need to either t.plan() at the begining or signaling with t.end() at the end of your tests
});

test('This is a test with a plan', function(t) {
    t.plan(3); // this means 3 tests will be expected less or more will result in error
    t.equal(1+1,2);
    t.equal(1+2,3);
    t.equal(2+2,4);
});

// a name for your test is completely optional:
test(function(t) {
    t.equal(1+1,2);
    t.equal(1+2,3);
    t.ok([], 'objects in js always are truthy'); // you can enter a description as a secound parameter
    t.end();
});

// async example 
test('Async example (3rd assertion is async)', function(t) {
    t.plan(3);
    t.equal(2+2, 4);
    t.equal(2-2, 0);
    setTimeout(function(){
        t.ok(true, 'async with setTimeout: true is ok');
    }, 1000);
});

// tap & tape execute tests serially:
// that means the next test will run after the async part in the 
// previous test has been executed
test('Test after async one', function(t) {
    t.equal(3+3, 6, 'six');
    t.end();
});
