const inquirer = require("inquirer");
// const chalk = require("chalk");
const figlet = require("figlet");
const shell = require("shelljs");
const init = () => {
  console.log(
      figlet.textSync("Prop Swither", {
        font: "big",
        horizontalLayout: "default",
        verticalLayout: "default"
      })
  );
};

var cur = "local"

const askQuestions = () => {
    const questions = [
      {
        type: "list",
        name: "isSwitch",
        message: "当前为 < "+cur+" > 是否切换环境？",
        default:"No",
        choices: ["Yes","No","手动编辑"]
      },
      {
        type: "list",
        name: "fatEnv",
        message: "What is the file extension?",
        choices: ["fat11","fat5","AddNew"],
        when:function(ans){
            return ans.isSwitch==="Yes" && !cur.startsWith("fat")
        }
      },
      {
        type: "input",
        name: "fatEnvNew",
        message: "新增fat环境",
        when:function(ans){
            return ans.fatEnv == "AddNew"
        }
      },
    ];
    return inquirer.prompt(questions);
  };

init()
askQuestions().then(res=>{console.log(res);})