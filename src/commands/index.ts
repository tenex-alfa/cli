import { command as CreateCommand } from "../commands/create-resource";
import { command as HelpCommand } from "./help";
import { command as VersionCommand } from "./version";
import { command as ParseCommand } from "./parse";
import { command as InitCommand } from "./init";
import { command as PublishCommand } from "./publish-resource";
import { command as AddLibCommand } from "./add-lib";
import { command as GetResourceCommand } from "./get-resource";
import CommandInterface from "./CommandInterface";

const whole: Map<string, CommandInterface> = new Map<
  string,
  CommandInterface
>();

export const noDuplicate: Map<string, CommandInterface> = new Map<
  string,
  CommandInterface
>();

add(HelpCommand);
add(PublishCommand);
add(InitCommand);
add(CreateCommand);
add(ParseCommand);
add(GetResourceCommand);
add(AddLibCommand);
add(VersionCommand);

function add(resource: CommandInterface) {
  whole.set(resource.name, resource);
  whole.set(resource.shortcut, resource);
  noDuplicate.set(resource.name, resource);
}

export default whole;
