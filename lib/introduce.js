#!/usr/bin/env node
import chalk from "chalk";
import figlet from "figlet";
import clear from "clear";
import inquirer from "inquirer";
import { questionInputFolderName } from "./react-native-structure.js";

clear();

console.log(
  chalk.yellow(figlet.textSync("vietdung97", { horizontalLayout: "full" }))
);

const runCommand = (key) => {
  switch (key) {
    case "react-native-structure":
      questionInputFolderName();
      break;
    default:
      console.log("Command not found");
      break;
  }
};

inquirer
  .prompt([
    {
      type: "list",
      name: "value",
      message: "What do you want to do?",
      choices: [
        {
          key: "react-native-structure",
          name: "Install React Native Structure",
          value: "react-native-structure",
        },
        new inquirer.Separator(),
      ],
    },
  ])
  .then((answ) => {
    runCommand(answ.value);
  });
