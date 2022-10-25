const express = require('express');
const axios = require('axios');
require('./interceptor');

const app = express();
const port = 3000;

const sendRequest= async () => {
    const requestConfig = {
        method: 'get',
        url: 'https://mock.codes/503',
        retryCount : 3,
        retryStatusCodes: ['408', '429'],
        backoff: 200,
        timeout: 5000
    };

    const response = await axios(requestConfig);
    return response.data;
}

app.get('/retry', async (_req, res) => {
    const output = await sendRequest();
    res.send(output);
})

app.get('/', (_req, res) => {
    res.send({
        message: 'Hello World!'
    });
})

app.listen(port, _ => {
    console.log(`App listening on port: ${port}`);
})