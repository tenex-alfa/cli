import CommandInterface from "./CommandsInterface";
import ImportInterface from "./ImportInterface";
import VaribleInterface from "./VaribleInterface";

export default interface CodeInterface {
  name: string;
  input: string;
  includes: Array<ImportInterface>;
  templates: Array<ImportInterface>;
  resources: Array<ImportInterface>;
  varibles?: Array<VaribleInterface>;
  commands: Array<CommandInterface>;
}
