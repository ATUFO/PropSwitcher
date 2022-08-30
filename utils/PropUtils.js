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
        if(tmpKV.length == 2 && tmpKV[1]!==""){
            propMap[tmpKV[0]] = tmpKV[1].replace("\r","").replace("\n","")
        }
    }
    return propMap;
}

function writeProps(props){
    let lines = []
    for (k in props){
        lines.push(k+"="+props[k])
    }
    let content = lines.join("\n")
    fs.writeFileSync(config.PROP_FILE_PATH,content)
}

module.exports ={
    getProps,
    writeProps
}


