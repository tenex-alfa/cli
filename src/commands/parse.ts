import _parse from "../parser/index";
import chalk from "chalk";
import ArgumentInterface from "./ArgumentInterface";
import CommandInterface from "./CommandInterface";

const parse = (args: ArgumentInterface) => {
  console.log(chalk.gray("parsing project"));
  _parse(args);
};

export const command: CommandInterface = {
  name: "parse",
  shortcut: "p",
  executable: parse,
  description: "parse all the files and creates an serverless project ",
  args: []
};
