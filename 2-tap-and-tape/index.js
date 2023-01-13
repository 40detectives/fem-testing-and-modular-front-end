import http from 'http';

export function elevenizer (n, cb) {
    setTimeout(function () {
        cb(null, n*111);
    }, 750);
}
