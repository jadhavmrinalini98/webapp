var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.json());

var userRoutes = require('./api-routes/Routes');

app.get('/healthz',function(req, res) {
    res.status(200).send(); 
});

app.use('/v1/user',userRoutes);

module.exports = app;