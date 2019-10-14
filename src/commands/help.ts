import { noDuplicate } from "./index";
import chalk from "chalk";
import CommandInterface from "./CommandInterface";
const help = () => {
  noDuplicate.forEach(value => {
    console.log(chalk.cyan(value.name));
    console.log(chalk.yellow(value.description));
    if (value.args) {
      value.args.map(value => {
        console.log(`${chalk.cyan(value.name)} ${value.description}`);
      });
    }
    console.log("\n");
  });
};

export const command: CommandInterface = {
  name: "help",
  shortcut: "h",
  executable: help,
  description: "Displays all the functions"
};
