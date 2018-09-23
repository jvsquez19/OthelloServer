"use strict";
// imports necesarios para el correcto funcionamiento de la clase
exports.__esModule = true;
var tablero_1 = require("./tablero");
var AIPlayer_1 = require("./AIPlayer");
var GameState = /** @class */ (function () {
    // cada vez que se realiza un movimiento se crea un nuevo estado de juego
    function GameState(tablero, turn, modo, difi, config) {
        this.tableroGS = tablero;
        this.turnoJugador = turn;
        this.puntaje = tablero.getScore();
        this.posiblesJugadas = tablero.getPosiblesJugadas(turn);
        this.modoJuego = modo;
        this.dificultad = difi;
        this.config = config;
        this.uids = [config['player1uid'], config['player2uid']];
        console.log("ASD" + this.uids);
        // si no hay posibles jugadas, game over... si no, se continua jugando...
        if (this.posiblesJugadas.length > 0) {
            this.gameStatus = 1;
        }
        else {
            console.log('No hay jugadas posibles... C mamo!');
            this.gameStatus = 2;
            this.turnoJugador = null;
            // se determina cual jugador es el ganador
            if (this.puntaje[0] > this.puntaje[1]) {
                this.winner = 1;
            }
            else if (this.puntaje[0] < this.puntaje[1]) {
                this.winner = 2;
            }
            else {
                this.winner = 3;
            }
        }
    }
    // funcion que crea una nueva partida con un tamanyo variable, comenzando con el jugador 1
    GameState.nuevoJuego = function (tamanio, modoJuego, dif, config) {
        console.log("asdjh" + config['player1']);
        return new GameState(new tablero_1["default"](tamanio), 1, modoJuego, dif, config);
    };
    // funcion que se encarga de realizar la jugada y crear un nuevo estado de juego
    GameState.prototype.jugadaRealizada = function (movimiento) {
        //console.log(this.tableroGS.tableroJuego);
        if (this.modoJuego == 1) {
            // cuando se crea el nuevo estado de juego, se cambia el juegador...
            if ((this.turnoJugador == 1) && (this.cambioTurno(movimiento))) {
                return new GameState(this.tableroGS.movida(movimiento, 1), 2, this.modoJuego, this.dificultad, this.config);
            }
            else if ((this.turnoJugador == 2) && (this.cambioTurno(movimiento))) {
                return new GameState(this.tableroGS.movida(movimiento, 2), 1, this.modoJuego, this.dificultad, this.config);
            }
            else {
                return this;
            }
        }
        else {
            if ((this.turnoJugador == 1) && (this.cambioTurno(movimiento))) {
                console.log("Turno Player");
                return new GameState(this.tableroGS.movida(movimiento, 1), 2, this.modoJuego, this.dificultad, this.config);
            }
            else if (this.turnoJugador == 2) {
                console.log("Turno AI");
                var AI = new AIPlayer_1["default"](this.dificultad, this);
                //console.log(AI.getJugada());
                return new GameState(this.tableroGS.movida(AI.getJugada(), 2), 1, this.modoJuego, this.dificultad, this.config);
            }
            else {
                console.log("La PTM!!");
                return this;
            }
        }
    };
    GameState.prototype.cambioTurno = function (movimiento) {
        for (var _i = 0, _a = this.posiblesJugadas; _i < _a.length; _i++) {
            var posibleJugAct = _a[_i];
            if (movimiento.toString() == posibleJugAct.getPos().toString()) {
                console.log("Chupala!");
                return true;
            }
        }
        return false;
    };
    GameState.prototype.dataAct = function () {
        return { board: this.tableroGS.tableroJuego,
            score: this.puntaje,
            stat: this.gameStatus,
            win: this.winner,
            player: this.turnoJugador,
            uids: this.uids
        };
    };
    GameState.prototype.getJugadas = function () {
        return this.posiblesJugadas;
    };
    return GameState;
}());
exports["default"] = GameState;
;
