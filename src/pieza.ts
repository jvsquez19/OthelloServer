
export default class pieza {
    private player: number;
    private pos: Array<number>;

    constructor( playo:number, row: number, col: number) {
        this.player = playo;
        this.pos = new Array(2);
        this.pos = [row,col];
    }

    getPlayer() {
        return this.player;
    }

    getPos() {
        return this.pos;
    }
}