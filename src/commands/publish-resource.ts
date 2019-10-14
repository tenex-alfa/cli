import _parse from "../parser/index";
import chalk from "chalk";
import ArgumentInterface from "./ArgumentInterface";
import * as AWS from "aws-sdk";
import CommandInterface from "./CommandInterface";
import * as util from "util";

const publishResource = (args: ArgumentInterface) => {
  console.log(chalk.gray("uploading resource"));
};

export const command: CommandInterface = {
  name: "publish",
  shortcut: "pub",
  executable: publishResource,
  description: "Uploads the resource to a resource database ",
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
