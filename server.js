var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const methodOverride = require('method-override');


app.use(bodyParser.json());

var userRoutes = require('./api-routes/Routes');

app.get('/healthz',function(req, res) {
    res.status(200).send(); 
});

app.use(methodOverride());
app.use((err, req, res, next) => {

  return res.status(400).json({message: "Bad Request"});
});
app.use('/v1/user',userRoutes);

module.exports = app;