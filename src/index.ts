import commands from "./commands/index";
import ArgumentInterface from "./commands/ArgumentInterface";
import CommandInterface from "./commands/CommandInterface";
import { noSuchCommand, welcome } from "./config/environment";
const args = process.argv.splice(2);

(function() {
  console.log(welcome);
  let argument = [];
  let prev = null;
  let key = null;
  let value = null;

  for (const arg of args) {
    if (key && !value) {
      value = arg;
      argument.push({ name: key, default: value });
      key = null;
      value = null;
      continue;
    }
    if (arg[0] === "-") {
      key = arg;
      continue;
    }

    if (arg[0] !== "-") {
      if (prev) execute(prev, argument);
      else {
        prev = commands.get(arg);
        if (!prev) {
          console.log(noSuchCommand);
          return;
        }
      }
    }
  }
  if (prev) {
    execute(prev, argument);
  }
})();

function execute(command: CommandInterface, argument: Array<any>) {
  const args = [...argument, ...(command.args ? command.args : [])];
  const required = command.args && command.args.filter(v => !v.optional);
  const names = argument.map(v => v.name);

  if (required)
    for (const req of required) {
      if (names.indexOf(req.name) == -1 && names.indexOf(req.shortcut) == -1) {
        throw new Error(`Cant find required value ${req.name}`);
      }
    }
  command.executable(args);
}
