#!/usr/bin/env node
import { execSync } from "child_process";
import inquirer from "inquirer";
import clear from "clear";
import chalk from "chalk";

const urlGithub = "https://github.com/vietdung97/react-native-structure.git";
const preCommand = "git clone";
let cmd = preCommand + " " + urlGithub;
let nextCmd = "";

const isContainSpaces = (string) => {
  const regex = /\s/g;
  return regex.test(string);
};

function checkAppName(appName) {
  const validationResult = isContainSpaces(appName);
  if (validationResult) {
    console.error(
      chalk.red(
        `Cannot create a project named ${chalk.green(
          `"${appName}"`
        )} because of naming restrictions: Spaces are not allowed in project names.`
      )
    );
    console.error(chalk.red("\nPlease choose a different project name."));
    process.exit(1);
  }

  // TODO: there should be a single place that holds the dependencies
  const dependencies = ["react", "react-dom", "react-scripts"].sort();
  if (dependencies.includes(appName)) {
    console.error(
      chalk.red(
        `Cannot create a project named ${chalk.green(
          `"${appName}"`
        )} because a dependency with the same name exists.\n` +
          `Due to the way npm works, the following names are not allowed:\n\n`
      ) +
        chalk.cyan(dependencies.map((depName) => `  ${depName}`).join("\n")) +
        chalk.red("\n\nPlease choose a different project name.")
    );
    process.exit(1);
  }
  return true;
}

export const commandRNStructure = (folderName) => {
  try {
    if (folderName) {
      if (checkAppName(folderName)) {
        cmd += " " + folderName;
        nextCmd = `cd ${folderName} && yarn && npx react-native-rename@latest ${folderName} -b "com.${folderName.toLowerCase()}"`;
        console.log(`Cloning React Native project into '${folderName}'...`);
      }
    }
    execSync(cmd, { stdio: "inherit" });
    console.log("Run command: ", nextCmd);
    execSync(nextCmd, { stdio: "inherit" });
    console.log(
      `Success! Created project '${folderName}' at ${process.cwd()}/${folderName}`
    );
    console.log(
      "Inside that directory, you can run several commands in package.json"
    );
    process.exit(1);
  } catch (error) {
    console.log("📢[react-native-structure.js:78]: Failed to execute: ", error);
    process.exit(1);
  }
};

export const questionInputFolderName = () => {
  clear();
  inquirer
    .prompt([
      {
        type: "input",
        name: "folderName",
        message: "What is your folder name (optional)?",
        validate: (folderName) => {
          if (!folderName) {
            return true;
          }
          return checkAppName(folderName);
        },
        filter: (inp) => {
          return inp.trim();
        },
      },
    ])
    .then((answ) => {
      commandRNStructure(answ.folderName);
    });
};
