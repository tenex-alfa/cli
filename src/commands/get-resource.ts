import execute from "../lib/default-execute";
import ArgumentInterface from "./ArgumentInterface";
import getArgs from "../lib/get-args";
import * as fs from "fs";
import * as fse from "fs-extra";
import CommandInterface from "./CommandInterface";
import chalk from "chalk";

const getResource = async (args: Array<ArgumentInterface>) => {
  const name = getArgs(args, "--name", "-n").default;
  const tmp = fs.mkdtempSync("temp");
  const cmd = `npm i --prefix ${tmp} @tenex/${name} --no-save`;
  try {
    await execute(cmd);
    fse.moveSync(`${tmp}/node_modules/@tenex/${name}`, `resources/${name}`);
    fse.moveSync(`${tmp}/node_modules/`, `resources/${name}/node_modules/`);


  } catch (err) {
    console.log(chalk.red(`Can't find the requested module ${name}.`));
  }
  fse.removeSync(tmp);
};

export const command: CommandInterface = {
  name: "get-resource",
  shortcut: "gr",
  executable: getResource,
  description: "Get a resource based on the name",
  args: [
    {
      name: "--name",
      shortcut: "-n",
      description: "name of the inputted resources.",
      type: "string",
      optional: false
    }
  ]
};
