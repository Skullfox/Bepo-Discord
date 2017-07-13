module.exports = {

  start : function() {

    var port = 4243;

    io  = require('socket.io').listen(port, {
      log : false
    });

    io.sockets.on('connection', function(socket) {

      console.log('Connection to client established');


      socket.on('getChannel', function(guildID) {
        console.log("req channel");
        var channel = _b.getChannel(guildID);
        socket.emit("setupChannel", channel);

      });

    });





  },

  emit : function(obj){
    console.log("send socket");
    io.sockets.emit(obj.event, obj);

  }
};
