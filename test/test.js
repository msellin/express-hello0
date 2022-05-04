import tap from "tap";
import app from "../app.js";
import request from "request";

tap.test('responds to requests', (t) => {
    const server = app.listen()
    const port = server.address().port
    const url = `http://localhost:${port}/ping`

    t.plan(3);
    t.teardown(() => {
        server.close()
    })

    request(url, (err, res, body) => {
        t.equal(err, null)
        t.equal(res.statusCode, 200)
        t.equal(res.body,"pong");
    })
});

/*
tap.test('some long test', (t) => {
    t.plan(1);

    setTimeout(async () => {
        t.equal(1, 1);
    }, 10000);
});

tap.test('some other test', (t) => {
    t.plan(1);

    setTimeout(async () => {
        t.equal(2, 2);
    }, 10000);
});
*/


