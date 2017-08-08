function isPlaylistEmpty(guildID){

  var playlist = global.utils.loadJson(global._playlist + "/" + guildID,{ "tracks" : [] });

  if(playlist.tracks.length == 0){
    return true;
  }else{
    return false;
  }
}

module.exports = isPlaylistEmpty;
