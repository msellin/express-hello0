import express from "express";

const app = express.createServer()

app.get('/ping', (req, res) => {
    res.send('pong')
})

export default app