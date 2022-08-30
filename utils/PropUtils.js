var fs =require("fs")
const config = require("../config/config.js")

function readFile(){
    var str = new String(fs.readFileSync(config.PROP_FILE_PATH))
    return str
}

function getProps(){
    var propContent = readFile()
    var lines = propContent.split("\n")
    var propMap = {}
    for(idx in lines){
        let line = lines[idx]
        if(line.startsWith("#")){
            continue;
        }
        let tmpKV = line.split("=")
        if(tmpKV.length == 2){
            propMap[tmpKV[0]] = tmpKV[1]
        }
    }
    return propMap;
}

module.exports ={
    getProps
}
