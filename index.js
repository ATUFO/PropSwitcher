const figlet = require("figlet");
const biz = require("./biz")
const propUtil = require("./utils/PropUtils.js")


const init = () => {
  console.log(
    figlet.textSync("Prop Swither", {
      font: "big",
      horizontalLayout: "default",
      verticalLayout: "default"
    })
  );
};

var propMap = propUtil.getProps()
var currentEnv = propMap["env"] !== "local" ? propMap["subenv"] : "local"
var subenvs = []
if (propMap["subenvs"] != undefined) {
    subenvs = JSON.parse(propMap["subenvs"])
}

init()
biz.askQuestions(currentEnv,subenvs).then(res => biz.process(res, subenvs))