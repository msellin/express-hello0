import tap from "tap";
import app from "../app.js";
import request from "request";
import nock from "nock";

tap.test('responds to ping', (t) => {
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
        t.equal(res.body, "pong");
    })
});

tap.test('returns temperature', (t) => {
    const server = app.listen()
    const port = server.address().port
    const url = `http://localhost:${port}/weather`

    t.plan(3);
    t.teardown(() => {
        server.close()
    })
    nock('https://api.open-meteo.com')
        .get('/v1/forecast?latitude=58.37&longitude=26.73&current_weather=true')
        .reply(200, {
            current_weather: {
                winddirection: 233, windspeed: 8.6, time: "2022-05-06T07:00", weathercode: 1, temperature: 12.5
            },
            latitude: 58.375,
            elevation: 47.75,
            utc_offset_seconds: 0,
            generationtime_ms: 0.1569986343383789,
            longitude: 26.75
        })

    request(url, (err, res, body) => {
        t.equal(err, null)
        t.equal(res.statusCode, 200)
        t.equal(res.body, "<html><body><p>Temperature in Tartu: 12.5°</p></body></html>");
    })
});



