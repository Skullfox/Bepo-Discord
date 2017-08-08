function removeTrack( message,index = 0,notification = false ){

  var playlist = global.utils.loadJson(global._playlist + "/" + message.guild.id ,{ "tracks" : [] });

  if(index > (playlist.tracks.length - 1) ){
    message.channel.send("Cant remove track with index " + index);
    return false
  }

  if(notification){
    message.channel.send(playlist.tracks[index].title + " was removed.");
  }

  try {
    playlist.tracks.splice(index,1)
    global.utils.saveJson(global._playlist + "/" + message.guild.id ,{ "tracks" : playlist.tracks } );
  } catch (e) {
    return false;
  }

}

module.exports = removeTrack;
