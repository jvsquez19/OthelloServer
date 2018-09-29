//Dependencias
const express = require('express')
const app = express()
const http = require('http').createServer(app);
var socket = require('./api/routes/webSocket')
var routes = require("./api/routes/WSRoutes")
var cors = require("cors")

//Variables Globales



app.use(express.json())
app.use(cors())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

routes(app)
socket(http)

http.listen(5000, () => {
  console.log('Server started on port 3000');
});

