import https from "https";

const HtmlService = function () {

    this.formatAsPage = function (temp) {
        let text = `Temperature in Tartu: ${temp}°`
        if (temp === -1) {
            text = "Temperature not received"
        }
        return `<html><body><p>${text}</p></body></html>`
    };
};

const WeatherService = function () {

    this.getTemperature = function (callback) {
        let data = '';
        const url = "https://api.open-meteo.com/v1/forecast?latitude=58.37&longitude=26.73&current_weather=true"

        const req = https.request(url, res => {

            if (res.statusCode !== 200) {
                callback(-1)
            } else {
                res.on('data', (chunk) => {
                    data = data + chunk.toString();
                });
            }

            res.on('end', () => {
                const body = JSON.parse(data);
                callback(body["current_weather"]["temperature"])
            });
        });

        req.on('error', error => {
            callback(-1)
        });

        req.end();
    };
};

export {WeatherService, HtmlService};
