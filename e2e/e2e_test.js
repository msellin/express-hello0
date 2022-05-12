import tap from "tap";
import request from "request";

tap.test('weather test', (t) => {
    const url = `https://growup-demo.herokuapp.com/weather`
    t.plan(3);
    request(url, (err, res, body) => {
        t.equal(err, null)
        t.equal(res.statusCode, 200)
        t.equal(/Temperature in Tartu: \d*\.?\d*°/.test(res.body), true)
    })
});