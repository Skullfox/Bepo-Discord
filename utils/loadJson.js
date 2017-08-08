function loadJson( file,onError = false ){

  try {
    return JSON.parse(global.fs.readFileSync( file + '.json', 'utf8'));
  } catch (e) {
    console.log(">>"+e);
    return onError;
  }

}

module.exports = loadJson;
