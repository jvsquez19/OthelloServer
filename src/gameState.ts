// imports necesarios para el correcto funcionamiento de la clase

import tablero from './tablero';
import pieza from './pieza';
import AIPlayer from './AIPlayer';

export default class GameState {
  tableroGS: tablero;
  turnoJugador: number;
  puntaje: Array<number>;
  public posiblesJugadas: pieza[];
  gameStatus: number; // 1 = jugando 2 = gameover
  winner: number; // player 1/2 o empate 3
  modoJuego: number; // 1 pvp o 2 pve
  dificultad: number;
  config:any;
  uids: string[];

  // funcion que crea una nueva partida con un tamanyo variable, comenzando con el jugador 1
  static nuevoJuego(tamanio:number, modoJuego: number, dif: number, config:any): GameState {
    console.log("asdjh"+config['player1']);
    return new GameState(new tablero(tamanio), 1, modoJuego, dif, config);
  }
  // cada vez que se realiza un movimiento se crea un nuevo estado de juego
  constructor(tablero: tablero, turn: number, modo: number, difi: number, config: any) {
    this.tableroGS = tablero;
    this.turnoJugador = turn;
    this.puntaje = tablero.getScore();
    this.posiblesJugadas = tablero.getPosiblesJugadas(turn);
    this.modoJuego = modo;
    this.dificultad = difi;
    this.config = config;
    this.uids = [config['player1uid'],config['player2uid']];
    console.log("ASD"+this.uids);
  // si no hay posibles jugadas, game over... si no, se continua jugando...
    if (this.posiblesJugadas.length > 0) {
      this.gameStatus = 1;
    } else {
      console.log('No hay jugadas posibles... C mamo!');
      this.gameStatus = 2;
      this.turnoJugador = null;
      // se determina cual jugador es el ganador
      if (this.puntaje[0] > this.puntaje[1]) {
        this.winner = 1;
      } else if (this.puntaje[0] < this.puntaje[1]) {
        this.winner = 2;
      } else {
        this.winner = 3;
      }
    }
  }
  
  // funcion que se encarga de realizar la jugada y crear un nuevo estado de juego
  jugadaRealizada(movimiento:Array<number>): GameState {
    //console.log(this.tableroGS.tableroJuego);
    if (this.modoJuego == 1) {
      // cuando se crea el nuevo estado de juego, se cambia el juegador...
      if ((this.turnoJugador == 1) && (this.cambioTurno(movimiento))){
        return new GameState(
          this.tableroGS.movida(movimiento, 1),
          2, this.modoJuego, this.dificultad,this.config
        )
      } else if ((this.turnoJugador == 2) && (this.cambioTurno(movimiento))) {
        return new GameState(
          this.tableroGS.movida(movimiento, 2),
          1, this.modoJuego, this.dificultad, this.config
        )
      } else {
        return this;
      }
    }
    else{
      if ((this.turnoJugador == 1) && (this.cambioTurno(movimiento))){
        console.log("Turno Player");
        return new GameState(
          this.tableroGS.movida(movimiento, 1),
          2, this.modoJuego, this.dificultad, this.config
        )
      }
      else if (this.turnoJugador == 2){
        console.log("Turno AI");
        let AI: AIPlayer = new AIPlayer(this.dificultad,this);
        //console.log(AI.getJugada());
        return new GameState(
          this.tableroGS.movida(AI.getJugada(), 2),
          1, this.modoJuego, this.dificultad, this.config
        )
      }
      else {
        console.log("La PTM!!");
        return this;
      }
    }
  }

  cambioTurno(movimiento:Array<number>):boolean {
    for (const posibleJugAct of this.posiblesJugadas){
        if(movimiento.toString() == posibleJugAct.getPos().toString()){
          console.log("Chupala!");
          return true;
        }
    }
    return false;
  }

  dataAct() {
    return { board: this.tableroGS.tableroJuego, 
      score: this.puntaje, 
      stat: this.gameStatus, 
      win: this.winner,
      player: this.turnoJugador,
      uids: this.uids
    };
  }

  getJugadas(){
    return this.posiblesJugadas;
  }
};
