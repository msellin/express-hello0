import express from "express";
import {WeatherService, HtmlService} from "./service.js";


const app = express(), weatherService = new WeatherService(), htmlService = new HtmlService();

app.get('/ping', (req, res) => {
    res.send('pong')
})

app.get('/weather', (req, res) => {
    weatherService.getTemperature(function (response) {
        res.send(htmlService.formatAsPage(response))
    })
})

export default app