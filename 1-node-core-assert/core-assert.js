#!/usr/bin/env node

/*
TAKEAWAYS with ASSERT:

- Failed tests throw erros that stop execution, so there might be test that do not execute till previous test pass.
- If you forget to call some functions or any branching that inadvertently prevents some test to run, would cause FALSE POSITIVES!
*/

const assert = require('assert'); // is part of nodejs core
const fs = require('fs');

// example:
assert.equal(1+2, 3)


function countLines(cb) { // will work
  fs.readFile('textfile.txt', 'utf-8', function(err, src) {
    if(err) cb(err);
    else cb(null, src.trim().split('\n').length); // src.trim() needed to remove the trailing '\n' at the end of file
  });
}

function flawedCountLines(cb) { // won't work
  fs.readFile('textfile.txt', 'utf-8', function(err, src) {
    if(err) cb(err);
    else cb(null, src.trim().split('\n').length + 1e10);
  });
}

// use flawedCountLines() instead of countLines() to provoke a fail with assert
countLines(function(err, n) {
  assert.ifError(err);
  assert.equal(n, 6);
});
