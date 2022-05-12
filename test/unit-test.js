import tap from "tap";

import nock from "nock";
import {HtmlService, WeatherService} from "../service.js";

tap.jobs = 2

tap.test('get temperature', (t) => {
    t.plan(1);

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
    const weatherService = new WeatherService();
    weatherService.getTemperature((res) => {
        t.equal(res, 12.5)
    })
});

tap.test('query error returns -1', (t) => {
    t.plan(1);

    nock('https://api.open-meteo.com')
        .get('/v1/forecast?latitude=58.37&longitude=26.73&current_weather=true')
        .reply(500)
    const weatherService = new WeatherService();
    weatherService.getTemperature((res) => {
        t.equal(res, -1)
    })
});

tap.test('formats html', (t) => {
    t.plan(1);
    const htmlService = new HtmlService();
    const resp = htmlService.formatAsPage(3)
    t.equal(resp, "<html><body><p>Temperature in Tartu: 3°</p></body></html>")
});

tap.test('formats invalid temperature', (t) => {
    t.plan(1);
    const htmlService = new HtmlService();
    const resp = htmlService.formatAsPage(-1)
    t.equal(resp, "<html><body><p>Temperature not received</p></body></html>")
});

tap.test('some long test', (t) => {
    t.plan(1);

    setTimeout(async () => {
        t.equal(true, true);
    }, 5000);
});

tap.test('some other long test', (t) => {
    t.plan(1);

    setTimeout(async () => {
        t.equal(true, true);
    }, 5000);
});


