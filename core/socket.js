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

      socket.on('changeChannel', function(obj) {
        socket.broadcast.emit('remoteChannelChange', obj);

      });

      socket.on('playMusic', function(obj) {
        console.log(obj);
        _b.playMusic(obj.video);

      });


    });





  },

  emit : function(obj){
    console.log("send socket");
    io.sockets.emit(obj.event, obj);

  }
};
