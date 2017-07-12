module.exports = {

  start : function() {

    var port = 4242;

    socket  = require('socket.io').listen( port );

    socket.on('connection', function(client){
        console.log('Connection to client established');



    });


  },

  emitStatus : function(obj){

    socket.sockets.emit('talkStatus', obj);
    console.log("test");

  }
};
