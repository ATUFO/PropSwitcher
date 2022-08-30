const inquirer = require("inquirer");
const propUtil = require("./utils/PropUtils.js")

function process(ans, subenvs) {
    if (ans.isSwitch.startsWith("手动")) {
        return;
    }
    if (subenvs == undefined || subenvs.length == 0) {
        subenvs = []
    }

    var props = {}
    if (ans.isSwitch === "local") {
        props["env"] = "local"
    } else if (ans.isSwitch.startsWith("添加")) {
        props["env"] = "fat"
        props["subenv"] = ans.fatEnvNew
        subenvs.push(ans.fatEnvNew)
    } else {
        props["env"] = "fat"
        props["subenv"] = ans.isSwitch
    }

    props["subenvs"] = JSON.stringify(subenvs)
    propUtil.writeProps(props)
    
    let currentEnv = props["env"] !== "local"?props["subenv"]:"local"
    console.log("\n\n已切换至 ===>  " + currentEnv+"\n");
}




const askQuestions = (currentEnv,subenvs) => {
    const questions = [
        {
            type: "list",
            name: "isSwitch",
            message: "当前为 <<=== " + currentEnv + " ===>>   切换至： \n",
            default: "local",
            choices: subenvs.concat(["local", "添加", "手动编辑soa.properties文件"])
        },
        {
            type: "input",
            name: "fatEnvNew",
            message: "新增fat环境",
            when: function (ans) {
                return ans.isSwitch.startsWith("添加")
            }
        },
    ];
    return inquirer.prompt(questions);
};


module.exports = {
    askQuestions,
    process
}