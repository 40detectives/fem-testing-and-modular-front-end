const test = require("tape"); // commonJS style needed for browserify

/*
use this command to get a file usable in the browser
    $ npx browserify one.js > bundle.js
then put that bundled file in your script tag in your html
*/
test('whatever', function (t) {
    t.equal(1 + 1, 2);
    t.equal(555, 5*111);
    t.end();
});
