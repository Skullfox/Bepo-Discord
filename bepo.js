const Discord = require('discord.js');
const config = require('./config.json');
bepo = new Discord.Client();
bepo.login(config.token);



bepo.on('ready', () => {
  console.log('Aye!');
});

// Create an event listener for messages
bepo.on('message', message => {
  // If the message is "ping"
  if (message.content === 'ping') {
    // Send "pong" to the same channel
    message.channel.send('pong');
  }
});

// Log our bot in
