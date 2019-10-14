import { DEFAULT_PATH, DEFAULT_INDEX } from "../config/file-paths";
import getYML from "./parse-yml";
import * as fs from "fs";
import transformToYmlFriendlyString from "./transform-string-to-yml";

let object: object;

const retriveObjects = (config: { dir?: string; index?: string }): object => {
  if (object) return object;
  const { dir, index } = config;
  const path: string = dir || DEFAULT_PATH;
  const fileName: string = index || DEFAULT_INDEX;
  const wholePath = path + fileName;
  const wholeObject: object = getYML(
    transformToYmlFriendlyString(fs.readFileSync(wholePath, "utf-8"))
  );
  return (object = wholeObject);
};

export default retriveObjects;
