'use strict';
module.exports = function(app) {
  var gameServer = require('../controllers/WSController');
  //var CONSTANTS = require('../CONSTANTS')
  // todoList Routes
  app.post("/newGame",gameServer.newGame)

  app.route("/getGameStatus/:id")
  .get(gameServer.getGamesStatus)

  app.route('/positionMarked')
  .post(gameServer.positionMarked)

  app.route('/getGameConfig/:id')
  .get(gameServer.getGameConfig)
  

};