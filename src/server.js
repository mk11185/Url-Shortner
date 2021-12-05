const express = require('express');
const mongoose = require('mongoose');
const redis = require("redis");
const app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://user-open-to-all-trainees:AutogenerateSecurePassword@training-cluster.xohin.mongodb.net/mk111Database?retryWrites=true&w=majority", { useNewUrlParser: true })
    .then(() => console.log('mongodb running on 27017'))
    .catch(err => console.log(err))


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});

const redisClient = redis.createClient({
    host: 'localhost',
    port: 6379,
    pass: ""
});

redisClient.on("connect", async function () {
    console.log("Connected to Redis..");
});

module.exports = { app,redisClient }