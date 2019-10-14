import fallback from "./fallbacks";

const FALLBACK_NAMES: Array<string> = Object.keys(fallback);
const RESERVED_NAMES: Array<string> = [
  "include",
  "varibles",
  "resources",
  "outdir",
  "dir",
  "templates",
  ...FALLBACK_NAMES
];

export { RESERVED_NAMES };
