import { version } from "../config/environment";
import chalk from "chalk";
import CommandInterface from "./CommandInterface";
const getVersion = () => {
  console.log(chalk.gray("The current tx project running is "));
  console.log(chalk.red(version));
};

export const command: CommandInterface = {
  name: "version",
  shortcut: "v",
  executable: getVersion,
  description: "View the current version of the tx"
};
