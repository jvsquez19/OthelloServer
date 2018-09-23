// importaciones necesarias para el funcionamiento adecuado de la clase
import pieza from './pieza';

export default class tablero {
    // las direcciones posibles de cada casilla se ponen dentro de un array por conveniencia
    public tamanyo: number;
    public tableroJuego : Array<Array<pieza>>;
    Directions = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]];
    
    // constructor que recibe el tamanyo del tablero como parametro

    constructor(size:number) {
        this.tableroJuego = new Array(size);
        this.tamanyo = size;
        for (let row = 0; row < this.tamanyo; row++) {
            this.tableroJuego[row] = new Array(this.tamanyo);
          }

        // se rellena la matriz con null
        for (let row = 0; row < this.tamanyo; row++) {
            for (let col = 0; col < this.tamanyo; col++) {
              this.tableroJuego[row][col] = new pieza(0, row, col);
            }
          }
        // se colocan las piezas iniciales en las posiciones por defecto
        this.tableroJuego[Math.round((this.tamanyo/2)-1)][Math.round((this.tamanyo/2)-1)] = new pieza(1,/*'img player 1',*/Math.round((this.tamanyo/2)-1),Math.round((this.tamanyo/2)-1));
        this.tableroJuego[Math.round((this.tamanyo/2)-1)][Math.round(this.tamanyo/2)] = new pieza(2,/*'img player 2',*/Math.round((this.tamanyo/2)-1),Math.round(this.tamanyo/2));  
        this.tableroJuego[Math.round(this.tamanyo/2)][Math.round((this.tamanyo/2)-1)] = new pieza(2,/*'img player 2',*/Math.round(this.tamanyo/2),Math.round((this.tamanyo/2)-1));     
        this.tableroJuego[Math.round(this.tamanyo/2)][Math.round(this.tamanyo/2)] = new pieza(1,/*'img player 1',*/Math.round(this.tamanyo/2),Math.round(this.tamanyo/2));
    }
    
    // funcion que recorre el array en busca de piezas y tiene un contador para
    // cada score por jugador y retorna un array con los 2 contadores
    getScore(): Array<number> {
        let scorePlayer1:number = 0;
        let scorePlayer2:number = 0;
        let scores: Array<number> = new Array(2);
        for (let row = 0; row < this.tamanyo; row++) {
          for (let col = 0; col < this.tamanyo; col++) {
            // si la posicion no esta vacia se incrementa un contador, para el player 1 o 2
            if (!this.campoVacio(row, col)) {
              if (this.tableroJuego[row][col].getPlayer() == 1) {
                scorePlayer1++;
              } else {
                 scorePlayer2++;
              }
            }
          }
        }
        scores[0] = scorePlayer1;
        scores[1] = scorePlayer2;
        return scores;
    }
    
    // funcion que recorre la matriz llamando a la funcion auxiliar
    // revisando si la jugada es legal, en ese caso, se inserta en el array de posibles jugadas
    getPosiblesJugadas(player: number): pieza[] {
        const posiblesJugadas = [];
        for (let row = 0; row < this.tamanyo; row++) {
          for (let col = 0; col < this.tamanyo; col++) {
            const move = new pieza(player, row, col);
            if (this.movimientoLegal(move)) {
              posiblesJugadas.push(move);
            }
          }
        }
        return posiblesJugadas;
    }
    
    // funcion que inserta en la matriz la nueva ficha y llama a otra funcion auxiliar
    // para determinar si se deben "voltear" alguna(s) ficha(s) y retorna el estado del juego actual
    movida(newMovi: Array<number>,player: number):tablero {
      console.log("Player Actual "+ player);
        let nuevaPieza: pieza = new pieza(player,newMovi[0],newMovi[1]);
        // se coloca la pieza
        this.tableroJuego[newMovi[0]][newMovi[1]] = nuevaPieza;
        // sedan vuelta las piezas necesarias
        const piezasACambiar = this.getPiezasACambiar(nuevaPieza);
        for (const piezaAct of piezasACambiar) {
          this.tableroJuego[piezaAct.row][piezaAct.col] = new pieza(nuevaPieza.getPlayer(),piezaAct.row,piezaAct.col);
      }
      // console.log(this.tableroJuego);
      return this;
    }
    
    // funcion que revisa en todas las 8 direcciones posibles a la hora de insertar una nueva pieza
    // y retorna un array con las posiciones de las piezas que deben ser cambiadas...
    getPiezasACambiar(newPieza:pieza): { row: number, col: number }[] {
        const coordenadas = [];
        // se revisa cada direccion en busca de piezas de color contrario
        for (const direction of this.Directions) {
          if (this.revisaDirecciones(newPieza, direction[0], direction[1])) {
            let filaAct = newPieza.getPos()[0];
            let colAct = newPieza.getPos()[1];
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
    }

    // funcion auxiliar que revisa si la pieza recien colocada es legal o no
    movimientoLegal(newPieza:pieza) {
      // si el campo no esta vacio, se retorna un false y se cancela la jugada
        if (!this.campoVacio(newPieza.getPos()[0], newPieza.getPos()[1])) {
          return false;
        }
      // si se revisan todas las direcciones y si es legal la jugada se retorna true
        for (const direction of this.Directions) {
          if (this.revisaDirecciones(newPieza, direction[0], direction[1])) {
            return true;
          }
        }
    
        return false;
    }
    
    // funcion auxiliar que chequea si la posicion enviada por parametros esta vacia o no
    campoVacio(row: number, col: number) {
      return this.tableroJuego[row][col].getPlayer() === 0;
    }
    
    // funcion auxiliar que revisa si la posicion en la direccion enviada por parametro
    // es vacia, del mismo color o del color contrario
    private revisaDirecciones(newPieza:pieza, rowDirection, colDirection) {
        // bandera que indica si se encuentra con una ficha de otro color
        let fichaOtroColor = false;
        let fila = newPieza.getPos()[0];
        let col = newPieza.getPos()[1];
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
    }    
}
