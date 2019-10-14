interface ArgumentInterface {
  name: string;
  shortcut?: string;
  type?: "number" | "string" | "array";
  default?: string;
  optional: boolean;
  description?: string;
}

export default ArgumentInterface;
