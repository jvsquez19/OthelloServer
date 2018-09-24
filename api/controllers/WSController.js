// Controlador del servidor Web

// lista de sesiones activas, un array de estados de juego
var sesiones = new Array();

// funcion que recibe del front el request para retornar el estado de juego actual de la sesion seleccionada
exports.getGamesStatus = (req, res) => {
    var game2 = sesiones[parseInt(req.params.id)];
    res.json(game2.dataAct());
};

// funcion que recibe del front el request para retornar la configuracion actual de la sesion seleccionada
exports.getGameConfig = (req, res) => {
    var game2 = sesiones[parseInt(req.params.id)];
    res.json(game2.config);
}

// funcion que recibe del front el request para crear una nueva sesion de juego y retornar el ud de la sesion creada
exports.newGame = (req, res) => {
    var newGame = require('../../src/gameState');
    var config = req.body['config'];
    var newGameState = newGame["default"].nuevoJuego(parseInt(config['size']), parseInt(config['gameMode']), parseInt(config['dificultad']), config);
    sesiones.push(newGameState);
    res.json({ "id": sesiones.length - 1 });

}

// funcion que recibe del front el request para realizar un movimiento en el tablero de juego y retornar el nuevo estado
// de juego de la sesion modificada
exports.positionMarked = (req, res) => {
    var game = sesiones[req.body["id"]];
    sesiones[req.body["id"]] = game.jugadaRealizada([req.body["row"], req.body["column"]]);
    res.json(game.dataAct());
}

// funcion que recibe del front el request para realizar un movimiento automatico
exports.moveAI = (req, res) => {
    var game = sesiones[req.body["id"]];
    sesiones[req.body["id"]] = game.jugadaRealizada([0, 0]);
    res.json(game.dataAct());
}