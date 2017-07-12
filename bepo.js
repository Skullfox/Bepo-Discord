const Discord = require('discord.js');
const config = require('./config.json');
var web = require('./core/web.js');
var socket = require('./core/socket.js');

/* Settings & other stuff*/
_root = __dirname;

web.start();
socket.start();

bepo = new Discord.Client();
bepo.login(config.token);



bepo.on('ready', () => {
  console.log('Aye!');
});



bepo.on('message', message => {
  // If the message is "ping"
  if (message.content === 'ping') {
    // Send "pong" to the same channel
    message.channel.send('pong');
  }
});
