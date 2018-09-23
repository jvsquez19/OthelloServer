import gameState  from './gameState';
import pieza from './pieza';

export default class AIPlayer {

    public mejorJugada: Array<number>;
    public dificultad: number; //1 ez 2 med 3 gg
    public GS: gameState;

    constructor(dificultadSelec: number, stateAct: gameState) {
        this.dificultad = dificultadSelec;
        this.GS = stateAct;
        this.mejorJugada = this.escogerJugada();
    }


    escogerJugada(): Array<number> {
        let posiblesJugadasAI: pieza[];
        let cantPiezasAMover: { row: number, col: number }[];
        let melhorjogada: number = 0;
        let mejotJugadaV2: Array<number>;
        posiblesJugadasAI = this.GS.getJugadas();
        switch (this.dificultad) {
            case 1: // facil
                melhorjogada = 100;
                for (const posibleJugAct of posiblesJugadasAI) {
                    cantPiezasAMover = this.GS.tableroGS.getPiezasACambiar(posibleJugAct);
                    if (cantPiezasAMover.length < melhorjogada) {
                        melhorjogada = cantPiezasAMover.length;
                        mejotJugadaV2 = posibleJugAct.getPos();
                    }
                }
                break;
        
            case 2:  //medium
                melhorjogada = Math.floor(Math.random() * posiblesJugadasAI.length) + 1;
                mejotJugadaV2 = posiblesJugadasAI[melhorjogada].getPos();
                break;

            case 3:    // c mamo
                for (const posibleJugAct of posiblesJugadasAI) {
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
    }

    getJugada(): Array<number> {
        return this.mejorJugada;
    }
}