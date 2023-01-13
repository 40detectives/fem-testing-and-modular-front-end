import http from 'http';

export function elevenizer (n, cb) {
    setTimeout(function () {
        cb(null, n*111);
    }, 750);
}

export function initServer () {
    const server = http.createServer(function (request, response) {
        const withoutLeadingSlash = request.url.slice(1);
        elevenizer(withoutLeadingSlash, function(err, result) {
            if (err) {
                response.statusCode = 400;
                response.end(err);
            } else {
                response.end(String(result));
            }
        });
    });

    return server;
}
