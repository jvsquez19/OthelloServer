
// clase que representa una Pieza de Juego con su jugador y posicion respectivas
export default class pieza {
    private player: number;
    private pos: Array<number>;

    constructor( playo:number, row: number, col: number) {
        this.player = playo;
        this.pos = new Array(2);
        this.pos = [row,col];
    }

    // funcion que retorna el dueño de la pieza en cuestion
    getPlayer() {
        return this.player;
    }
    // funcion que retorna la posicion de la pieza en cuestion
    getPos() {
        return this.pos;
    }
}