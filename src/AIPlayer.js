"use strict";
exports.__esModule = true;
var AIPlayer = /** @class */ (function () {
    function AIPlayer(dificultadSelec, stateAct) {
        this.dificultad = dificultadSelec;
        this.GS = stateAct;
        this.mejorJugada = this.escogerJugada();
    }
    AIPlayer.prototype.escogerJugada = function () {
        var posiblesJugadasAI;
        var cantPiezasAMover;
        var melhorjogada = 0;
        var mejotJugadaV2;
        posiblesJugadasAI = this.GS.getJugadas();
        switch (this.dificultad) {
            case 1: // facil
                melhorjogada = 100;
                for (var _i = 0, posiblesJugadasAI_1 = posiblesJugadasAI; _i < posiblesJugadasAI_1.length; _i++) {
                    var posibleJugAct = posiblesJugadasAI_1[_i];
                    cantPiezasAMover = this.GS.tableroGS.getPiezasACambiar(posibleJugAct);
                    if (cantPiezasAMover.length < melhorjogada) {
                        melhorjogada = cantPiezasAMover.length;
                        mejotJugadaV2 = posibleJugAct.getPos();
                    }
                }
                break;
            case 2: //medium
                melhorjogada = Math.floor(Math.random() * posiblesJugadasAI.length) + 1;
                mejotJugadaV2 = posiblesJugadasAI[melhorjogada].getPos();
                break;
            case 3: // c mamo
                for (var _a = 0, posiblesJugadasAI_2 = posiblesJugadasAI; _a < posiblesJugadasAI_2.length; _a++) {
                    var posibleJugAct = posiblesJugadasAI_2[_a];
                    cantPiezasAMover = this.GS.tableroGS.getPiezasACambiar(posibleJugAct);
                    if (cantPiezasAMover.length > melhorjogada) {
                        melhorjogada = cantPiezasAMover.length;
                        mejotJugadaV2 = posibleJugAct.getPos();
                    }
                }
                break;
            default:
                break;
        }
        return mejotJugadaV2;
    };
    AIPlayer.prototype.getJugada = function () {
        return this.mejorJugada;
    };
    return AIPlayer;
}());
exports["default"] = AIPlayer;
