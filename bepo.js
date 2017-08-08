const Discord = require('discord.js');


const path = require("path")
const join = path.join;



global = {};
global._root = __dirname;
global._playlist = __dirname + "/playlist";
global.fs = require('fs');
global.ytsearch = require('youtube-search');
global.ytdl = require('ytdl-core');
global.config = require('./config.json');
global.utils = {};


for (let file of global.fs.readdirSync(join(__dirname, "utils"))){
    global.utils[file.replace(".js", "")] = require(join(__dirname, "utils", file));
}

//link https://discordapp.com/oauth2/authorize?client_id=334684328078475267&scope=bot&permissions=104164416


/* Settings & other stuff*/
_root = __dirname;
_b = require('./core/functions.js');


bepo = new Discord.Client();
bepo.login(global.config.token);

bepo.on('ready', () => {
  console.log("---------------------")
  console.log('Aye!');
});


/* Play Music */
bepo.on('message', message => {
  if (message.content.startsWith('b.play')) {

    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.reply(`Please be in a voice channel first!`);

    var track = global.utils.getTrack(message.guild.id);
    global.utils.playMusic( track , message );

  }
});

bepo.on('message', message => {
  if (message.content.startsWith('b.add')) {
    global.utils.searchTrack(message);
  }
});


bepo.on('message', message => {
  if (message.content.startsWith('b.join')) {
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.reply(`Please be in a voice channel first!`);

    voiceChannel.join()
      .then(connnection => {});

  }
});

bepo.on('message', message => {
  if (message.content.startsWith('b.stop')) {
    global.utils.stopMusic(message);
  }
});






bepo.on('message', message => {
  if (message.content.startsWith('b.leave')) {
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.reply(`Please be in a voice channel first!`);
    voiceChannel.leave();
  }
});

bepo.on('message', message => {
  if (message.content.startsWith('b.remove')) {

    var args = message.content.split(/\s+/g).slice(1);
    var index = (args.length > 0)? args[0]  :  0;

    if(index < 0){
      message.channel.send("invalid negativ number");
      return false;
    }

    _b.removeTrack(message,index,true);

  }
});



bepo.on('message', message => {
  if (message.content.startsWith('b.skip')) {


    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.reply(`Please be in a voice channel first!`);


    var connection = bepo.voiceConnections.get(message.guild.id);
    connection.dispatcher.end();
    message.channel.send("Skipping song");

    try {
      var playlist = _b.loadJson(global._playlist + "/" + message.guild.id);
      var track = playlist.tracks[0];
    } catch (e) {
      message.channel.send("Playlist is empty");
      return false;
    }

    _b.playMusic( track , message );

  }
});

bepo.on('message', message => {
  if (message.content.startsWith('b.plist')) {

    try {
      var playlist = _b.loadJson(global._playlist + "/" + message.guild.id);

      if(playlist.tracks.length == 0){
        message.channel.send("Playlist is empty");
        return false;
      }

    } catch (e) {

      message.channel.send("Playlist is empty");
      return false;


    }

    console.log( playlist.tracks );

    var list = "";
    for (var i = 0; i < playlist.tracks.length; i++) {
        console.log(playlist.tracks[i]);


        list+= "["+i+"] " + playlist.tracks[i].title + "\n";


    }

    message.channel.send(list);

  }
});

bepo.on('message', message => {
  if (message.content.startsWith('b.start')) {
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.reply(`Please be in a voice channel first!`);
    voiceChannel.join()
      .then(connnection => {
        /*
        const stream = ytdl("https://www.youtube.com/watch?v=dQw4w9WgXcQ", { filter: 'audioonly' });
        const dispatcher = connnection.playStream(stream);
        dispatcher.on('end', () => voiceChannel.leave());
        */

        connnection.on('speaking',(user,speaking) => {
          console.log(user.username);
          console.log(speaking);


          /* Get user in channels */
          var channelUser = {};
          voiceChannel.members.map(function(user){
            console.log("+++++ user in channel +++++");
            console.log(user.user.username);

            var index = user.user.id;
            console.log(index);
            var usr = {
              index : user.user.username
            };
            //Object.assign(channelUser,usr);
            channelUser[index] = usr;
          });

          console.log( channelUser );

          socket.emit({
            "event" : "talkStatus",
            "user" : {
            "displayAvatarURL" : user.displayAvatarURL,
            "id" : user.id,
            "username" : user.username
          }, "speaking" : speaking});

        } );

      });
  }
});

/* OUTDATED
bepo.on('message', message => {


  socket.emit({
    "event" : "message",
    "data" : {
      "channelID" : message.channel.id,
      "message" : message.content,
      "userID" : message.author.id,
      "username" : message.author.username,
      "createdTimestamp" : message.createdTimestamp / 1000
    }
  });

});

var web = require('./core/web.js');
var socket = require('./core/socket.js');

web.start();
socket.start();
*/
