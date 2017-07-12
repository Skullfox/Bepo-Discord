module.exports = {

  start : function() {

    var port = 4242;

    socket  = require('socket.io').listen( port );

    socket.on('connection', function(client){
        console.log('Connection to client established');

        client.on('getServerList', function(){
          console.warn("getServerList");
          client.emit('getServerList',{"servers" : maiq.servers,"users" : maiq.users});
        });

    });


  },

};
