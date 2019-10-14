import ArgumentInterface from "./ArgumentInterface";
import * as fse from "fs-extra";
import getArgs from "../lib/get-args";
import CommandInterface from "./CommandInterface";
const init = (args: Array<ArgumentInterface>) => {
  const name = getArgs(args, "--name", "-n").default;
  const path = getArgs(args, "--path", "-p").default;
  console.log(args);
  const initPackagePath: string = __dirname + "/../../res/init/";

  fse.copySync(initPackagePath, path + name);
};

export const command: CommandInterface = {
  name: "new",
  shortcut: "n",
  executable: init,
  description: "parse all the files and creates an serverless project ",
  args: [
    {
      name: "--name",
      shortcut: "-n",
      description: "name of the new package.",
      default: "my-project",
      type: "string",
      optional: true
    },
    {
      name: "--path",
      shortcut: "-p",
      description: "path to the new package",
      default: "",
      type: "string",
      optional: true
    }
  ]
};
