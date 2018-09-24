import gameState  from './gameState';
import pieza from './pieza';


// clase que se encarga de lo relacionado con el jugador automatico
export default class AIPlayer {

    // declaracion de varaibles necesarias
    public mejorJugada: Array<number>;
    public dificultad: number; //1 ez 2 med 3 gg
    public GS: gameState;

    // se recibe la dificultad seleccionada por el user y el estado actual del tablero de juego
    constructor(dificultadSelec: number, stateAct: gameState) {
        this.dificultad = dificultadSelec;
        this.GS = stateAct;
        this.mejorJugada = this.escogerJugada();
    }

    // funcion que busca la jugada a realizar por la IA segun la dificultad
    escogerJugada(): Array<number> {

        let posiblesJugadasAI: pieza[];
        let cantPiezasAMover: { row: number, col: number }[];
        let melhorjogada: number = 0;
        let mejotJugadaV2: Array<number>;
        posiblesJugadasAI = this.GS.getJugadas();

        // condicionales segun la dificultad
        switch (this.dificultad) {
            case 1: // facil : se busca la jugada que menos piezas pueda cambiar
                melhorjogada = 100;
                for (const posibleJugAct of posiblesJugadasAI) {
                    cantPiezasAMover = this.GS.tableroGS.getPiezasACambiar(posibleJugAct);
                    if (cantPiezasAMover.length < melhorjogada) {
                        melhorjogada = cantPiezasAMover.length;
                        mejotJugadaV2 = posibleJugAct.getPos();
                    }
                }
                break;
        
            case 2:  // medium : se escoge una jugada al azar entre las posibles, lo que da un sentido de equilibrio
                melhorjogada = Math.floor(Math.random() * posiblesJugadasAI.length) + 1;
                mejotJugadaV2 = posiblesJugadasAI[melhorjogada].getPos();
                break;

            case 3:   // dificil : se busca la jugada que mas piezas pueda cambiar
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

    // funcion que retorna la jugada seleccionada por la AI.
    getJugada(): Array<number> {
        return this.mejorJugada;
    }
}