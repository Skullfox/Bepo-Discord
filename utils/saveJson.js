function saveJson(path,object,callback = function(err){console.log(err)},obj = {}){

  try {

    global.fs.writeFile( path + '.json', JSON.stringify(object), 'utf8',function(err){

        if(err){
          callback(true,obj);
        }else{
          callback(false,obj);
        }

    });

  } catch (e) {
    console.log(">>"+e);
  }

}

module.exports = saveJson;
