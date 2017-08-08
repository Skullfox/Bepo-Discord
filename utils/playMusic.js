function playMusic(track,message){

  var url = track.url;

  var connection = bepo.voiceConnections.get(message.guild.id);

  var stream = global.ytdl(url, { filter: 'audioonly' });
  message.channel.send( ":loud_sound: " + track.title);

  var dispatcher = connection.playStream(stream);

  global.utils.removeTrack(message,0);


  dispatcher.on("end", end => {
    console.log("dispatcher ending is last ? ");

    //message.channel.send(track.title + " :end: " );

    var isLastTrack = global.utils.isPlaylistEmpty(message.guild.id);
    console.log("isLastTrack " + isLastTrack);

    if( isLastTrack  ){
      message.channel.send("Playlist is empty :grimacing: ");
      return false;
    }else{
      console.log( "we have moar tracks" );
      var track = global.utils.getTrack(message.guild.id);

      console.log("next track" + track.title);
      global.utils.playMusic( track , message );
    }

  });

}

module.exports = playMusic;
