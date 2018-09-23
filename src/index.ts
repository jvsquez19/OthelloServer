import tablero from './tablero';
import gs from './gameState';

let sd = gs.nuevoJuego(8);

let asd = new gs(sd.tableroGS,1);

//console.log(asd.getLegalMoves(1));
console.log('Inicio de juego...');
console.log(asd.tableroGS);
asd.jugadaRealizada([4,2]);
console.log('Turno 1: Blanco');
console.log(asd.tableroGS);
asd.jugadaRealizada([5,2]);
console.log('Turno 2: Negro');
console.log(asd.tableroGS);