//Dependencias
const express = require('express')
const app = express()
const http = require('http').Server(app);
var socket = require('./api/routes/webSocket')
var routes = require("./api/routes/WSRoutes")
var cors = require("cors")

//Variables Globales



app.use(express.json())
app.use(cors())
routes(app)
socket(http)

http.listen(process.env.PORT || 3000, () => {
  console.log('Server started');
});

