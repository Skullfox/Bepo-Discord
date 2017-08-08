function getTrack(guildID){

  var playlist = global.utils.loadJson(global._playlist + "/" + guildID,{ "tracks" : [] });

  console.log("Playlist size " + playlist.tracks.length );
  if(playlist.tracks.length == 0){
    return false;
  }else{
    return playlist.tracks[0];
  }

}

module.exports = getTrack;
