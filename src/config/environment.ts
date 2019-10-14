import chalk from "chalk";
const version = "ALFA 0.0.9";
const welcome = `${chalk.gray(
  "Thanks for using the tx project. Please leave us"
)} ${chalk.green("feedback.")} \n\n\n`;
const noSuchCommand = `No such command try ${chalk.cyan(
  "tx-cli help"
)} to see all commands\n\n\n`;

export { version, welcome, noSuchCommand };
