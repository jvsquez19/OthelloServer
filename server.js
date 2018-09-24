//Dependencias
const express = require('express')
var port = process.env.PORT || 3000
const app = express()
const http = require('http').createServer(app);
var socket = require('./api/routes/webSocket')
var routes = require("./api/routes/WSRoutes")
var cors = require("cors")

//Variables Globales

app.get("/",(req,res)=>{
  res.send("Bienvenidos al server del Othello")
})

app.use(express.json())
app.use(cors())
routes(app)
socket(http)

http.listen(port, () => {
  console.log('Server started on port 3000');
});

