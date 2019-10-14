import execute from "../lib/default-execute";
import ArgumentInterface from "./ArgumentInterface";
import getArgs from "../lib/get-args";
import * as fs from "fs";
import * as fse from "fs-extra";
import CommandInterface from "./CommandInterface";

const createResource = async (args: Array<ArgumentInterface>) => {
  const name = getArgs(args, "--name", "-n").default;
  const tmp = fs.mkdtempSync("temp");
  const cmd = `npm i --prefix ${tmp} tx-empty-resource --no-save`;
  console.log("name:", name);
  await execute(cmd);
  fse.copySync(`${tmp}/node_modules/tx-empty-resource`, name);
  fse.removeSync(tmp);
};

export const command: CommandInterface = {
  name: "create-resource",
  shortcut: "cr",
  executable: createResource,
  description: "Creates an empty resource from npm. ",
  args: [
    {
      name: "--name",
      shortcut: "-n",
      description: "name of the inputted resources.",
      default: "my-resource",
      type: "string",
      optional: true
    }
  ]
};
