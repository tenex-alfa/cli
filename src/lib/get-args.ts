import ArgumentInterface from "../commands/ArgumentInterface";

const getArgs = (
  args: Array<ArgumentInterface>,
  name: string,
  shortcut?: string
): ArgumentInterface => {
  for (const value of args) {
    if (
      value.name == name ||
      value.shortcut == name ||
      shortcut == value.name ||
      value.shortcut == shortcut
    ) {
      return value;
    }
  }

  return null;
};

export default getArgs;
