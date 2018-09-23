'use strict';
module.exports = function(http){
//Dependencias
const io = require('socket.io')(http);
//Variables Globales 
var Conexiones = {}
var partidasPendientes = []
var partidasEnCurso = []


io.on('connection', (socket) => {

    console.log('user connected '+ socket.id);

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });

    socket.on("get-matches",()=>{
        io.emit('pendingMatches',{matches:partidasPendientes})
    })

    socket.on('join-match',(data)=>{
        Conexiones[data.user.uid]=socket.id
        console.log(data)
        var joined = partidasPendientes.pop(data.id)
        joined.player2 = data.user.displayName
        joined.player2uid = data.user.uid
        console.log(joined)
        //Se crea la nueva partida
        var newGame = require("../../src/gameState")
        var newGameState = newGame["default"].nuevoJuego(parseInt(joined['size']),1, parseInt(joined['dificultad']), joined);
        partidasEnCurso.push({gameState:newGameState,pActual:[joined.player1uid,joined.player2uid]})
        io.sockets.connected[Conexiones[joined.player1uid]].emit("match-created",{id:partidasEnCurso.length-1,state:newGameState.dataAct(),config:newGameState.config})
        io.sockets.connected[Conexiones[joined.player2uid]].emit("match-created",{id:partidasEnCurso.length-1,state:newGameState.dataAct(),config:newGameState.config})
    })

    socket.on("create-match",(nuevaPartida)=>{
        Conexiones[nuevaPartida.player1uid] = socket.id
        nuevaPartida.socketid = socket.id
        nuevaPartida.id = partidasPendientes.length
        console.log(nuevaPartida)
        partidasPendientes.push(nuevaPartida)
        io.emit('pendingMatches',{matches:partidasPendientes})
    })

    socket.on("played",(data)=>{
        var current = partidasEnCurso[data.id]
        if(Conexiones[current.pActual[0]]==socket.id){
            var ant = current.gameState.turnoJugador
            current.gameState = current.gameState.jugadaRealizada([data.row,data.column])
            if(current.gameState.turnoJugador != ant){
            current.pActual.reverse()
            }
            partidasEnCurso[data.id] = current
            io.sockets.connected[Conexiones[current.pActual[0]]]
            .emit("moved",current.gameState.dataAct())
            io.sockets.connected[Conexiones[current.pActual[1]]]
            .emit("moved",current.gameState.dataAct())
        }else{
            console.log("no es correcto")
        }
    })

    socket.on("new-connection", (uid)=>{
        console.log("idSocket: "+socket.id + " uid: "+uid)
        Conexiones[uid]=socket.id
        io.sockets.connected[socket.id].emit("message",{type:'new-message',text:"su uid es: "+uid});
        console.log(Conexiones)
    })

});


}