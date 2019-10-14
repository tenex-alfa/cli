import ArgumentInterface from "./ArgumentInterface";

export default interface CommandInterface {
  executable: Function;
  name: string;
  shortcut?: string;
  description: string;
  args?: Array<ArgumentInterface>;
}
