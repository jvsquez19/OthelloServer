"use strict";
exports.__esModule = true;
var pieza = /** @class */ (function () {
    function pieza(playo, row, col) {
        this.player = playo;
        this.pos = new Array(2);
        this.pos = [row, col];
    }
    pieza.prototype.getPlayer = function () {
        return this.player;
    };
    pieza.prototype.getPos = function () {
        return this.pos;
    };
    return pieza;
}());
exports["default"] = pieza;
