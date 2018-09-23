"use strict";
exports.__esModule = true;
// importaciones necesarias para el funcionamiento adecuado de la clase
var pieza_1 = require("./pieza");
var tablero = /** @class */ (function () {
    // constructor que recibe el tamanyo del tablero como parametro
    function tablero(size) {
        this.Directions = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]];
        this.tableroJuego = new Array(size);
        this.tamanyo = size;
        for (var row = 0; row < this.tamanyo; row++) {
            this.tableroJuego[row] = new Array(this.tamanyo);
        }
        // se rellena la matriz con null
        for (var row = 0; row < this.tamanyo; row++) {
            for (var col = 0; col < this.tamanyo; col++) {
                this.tableroJuego[row][col] = new pieza_1["default"](0, row, col);
            }
        }
        // se colocan las piezas iniciales en las posiciones por defecto
        this.tableroJuego[Math.round((this.tamanyo / 2) - 1)][Math.round((this.tamanyo / 2) - 1)] = new pieza_1["default"](1, /*'img player 1',*/ Math.round((this.tamanyo / 2) - 1), Math.round((this.tamanyo / 2) - 1));
        this.tableroJuego[Math.round((this.tamanyo / 2) - 1)][Math.round(this.tamanyo / 2)] = new pieza_1["default"](2, /*'img player 2',*/ Math.round((this.tamanyo / 2) - 1), Math.round(this.tamanyo / 2));
        this.tableroJuego[Math.round(this.tamanyo / 2)][Math.round((this.tamanyo / 2) - 1)] = new pieza_1["default"](2, /*'img player 2',*/ Math.round(this.tamanyo / 2), Math.round((this.tamanyo / 2) - 1));
        this.tableroJuego[Math.round(this.tamanyo / 2)][Math.round(this.tamanyo / 2)] = new pieza_1["default"](1, /*'img player 1',*/ Math.round(this.tamanyo / 2), Math.round(this.tamanyo / 2));
    }
    // funcion que recorre el array en busca de piezas y tiene un contador para
    // cada score por jugador y retorna un array con los 2 contadores
    tablero.prototype.getScore = function () {
        var scorePlayer1 = 0;
        var scorePlayer2 = 0;
        var scores = new Array(2);
        for (var row = 0; row < this.tamanyo; row++) {
            for (var col = 0; col < this.tamanyo; col++) {
                // si la posicion no esta vacia se incrementa un contador, para el player 1 o 2
                if (!this.campoVacio(row, col)) {
                    if (this.tableroJuego[row][col].getPlayer() == 1) {
                        scorePlayer1++;
                    }
                    else {
                        scorePlayer2++;
                    }
                }
            }
        }
        scores[0] = scorePlayer1;
        scores[1] = scorePlayer2;
        return scores;
    };
    // funcion que recorre la matriz llamando a la funcion auxiliar
    // revisando si la jugada es legal, en ese caso, se inserta en el array de posibles jugadas
    tablero.prototype.getPosiblesJugadas = function (player) {
        var posiblesJugadas = [];
        for (var row = 0; row < this.tamanyo; row++) {
            for (var col = 0; col < this.tamanyo; col++) {
                var move = new pieza_1["default"](player, row, col);
                if (this.movimientoLegal(move)) {
                    posiblesJugadas.push(move);
                }
            }
        }
        return posiblesJugadas;
    };
    // funcion que inserta en la matriz la nueva ficha y llama a otra funcion auxiliar
    // para determinar si se deben "voltear" alguna(s) ficha(s) y retorna el estado del juego actual
    tablero.prototype.movida = function (newMovi, player) {
        console.log("Player Actual " + player);
        var nuevaPieza = new pieza_1["default"](player, newMovi[0], newMovi[1]);
        // se coloca la pieza
        this.tableroJuego[newMovi[0]][newMovi[1]] = nuevaPieza;
        // sedan vuelta las piezas necesarias
        var piezasACambiar = this.getPiezasACambiar(nuevaPieza);
        for (var _i = 0, piezasACambiar_1 = piezasACambiar; _i < piezasACambiar_1.length; _i++) {
            var piezaAct = piezasACambiar_1[_i];
            this.tableroJuego[piezaAct.row][piezaAct.col] = new pieza_1["default"](nuevaPieza.getPlayer(), piezaAct.row, piezaAct.col);
        }
        // console.log(this.tableroJuego);
        return this;
    };
    // funcion que revisa en todas las 8 direcciones posibles a la hora de insertar una nueva pieza
    // y retorna un array con las posiciones de las piezas que deben ser cambiadas...
    tablero.prototype.getPiezasACambiar = function (newPieza) {
        var coordenadas = [];
        // se revisa cada direccion en busca de piezas de color contrario
        for (var _i = 0, _a = this.Directions; _i < _a.length; _i++) {
            var direction = _a[_i];
            if (this.revisaDirecciones(newPieza, direction[0], direction[1])) {
                var filaAct = newPieza.getPos()[0];
                var colAct = newPieza.getPos()[1];
                do {
                    // se toma la posicion de la pieza recien ingresada y se le suma la direccion correspondiente para cada caso
                    filaAct += direction[0];
                    colAct += direction[1];
                    // si se llega a un extremo del tablero (fila o columna) se rompe el ciclo y se sigue con la siguiente direccion
                    if (filaAct < 0 || filaAct > this.tamanyo - 1 || colAct < 0 || colAct > this.tamanyo - 1) {
                        break;
                    }
                    // si se encuentra con una ficha del mismo color se rompe el ciclo de igual manera
                    if (this.tableroJuego[filaAct][colAct].getPlayer() === newPieza.getPlayer()) {
                        break;
                    }
                    // si la pieza actual es de color distinto, se apuntan sus coordenadas para su posterior cambio
                    coordenadas.push({ row: filaAct, col: colAct });
                } while (true);
            }
        }
        return coordenadas;
    };
    // funcion auxiliar que revisa si la pieza recien colocada es legal o no
    tablero.prototype.movimientoLegal = function (newPieza) {
        // si el campo no esta vacio, se retorna un false y se cancela la jugada
        if (!this.campoVacio(newPieza.getPos()[0], newPieza.getPos()[1])) {
            return false;
        }
        // si se revisan todas las direcciones y si es legal la jugada se retorna true
        for (var _i = 0, _a = this.Directions; _i < _a.length; _i++) {
            var direction = _a[_i];
            if (this.revisaDirecciones(newPieza, direction[0], direction[1])) {
                return true;
            }
        }
        return false;
    };
    // funcion auxiliar que chequea si la posicion enviada por parametros esta vacia o no
    tablero.prototype.campoVacio = function (row, col) {
        return this.tableroJuego[row][col].getPlayer() === 0;
    };
    // funcion auxiliar que revisa si la posicion en la direccion enviada por parametro
    // es vacia, del mismo color o del color contrario
    tablero.prototype.revisaDirecciones = function (newPieza, rowDirection, colDirection) {
        // bandera que indica si se encuentra con una ficha de otro color
        var fichaOtroColor = false;
        var fila = newPieza.getPos()[0];
        var col = newPieza.getPos()[1];
        do {
            // se toma la posicion de la pieza recien ingresada y se le suma la direccion correspondiente para cada caso
            fila += rowDirection;
            col += colDirection;
            // si se excede de los limites se retorna un false que indica que la direccion no es legal
            if (fila < 0 || fila > this.tamanyo - 1 || col < 0 || col > this.tamanyo - 1) {
                return false;
            }
            // si el campo en la direccion siguiente es vacio, no es legal
            if (this.campoVacio(fila, col)) {
                return false;
            }
            // si se encontro con una pieza del mismo color se retorna una bandera que indica si se encontro una pieza de otro color...
            else if (this.tableroJuego[fila][col].getPlayer() === newPieza.getPlayer()) {
                return fichaOtroColor;
            }
            // si se encontro con una ficha del color contrario, se cambia la bandera y el movimiento en esa direccion es legal
            else {
                fichaOtroColor = true;
            }
        } while (true);
    };
    return tablero;
}());
exports["default"] = tablero;
