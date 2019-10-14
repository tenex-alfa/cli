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
        fse.moveSync(`${tmp}/node_modules/@tenex/${name}`, `lib/${name}`);
        fse.moveSync(`${tmp}/node_modules/`, `lib/${name}/node_modules/`);


    } catch (err) {
        console.log(chalk.red(`Can't find the requested module ${name}.`));
    }
    fse.removeSync(tmp);
};

export const command: CommandInterface = {
    name: "add-lib",
    shortcut: "al",
    executable: getResource,
    description: "Adds a new library to the project",
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
