import retriveObjects from "../utils/retrive-objects";
import getFunctions from "./get-functions";
import * as fs from "fs";
import CodeInterface from "./interfaces/CodeInterface";
import buildFunctions from "./build-function";
import {
  OUTPUT_PATH,
  DEFAULT_PATH,
  LIB_PATH,
  FUNCTIONS_PATH
} from "../config/file-paths";
import * as fse from "fs-extra";

export default function() {
  const object: any = retriveObjects({});
  const parsed: any = parse(object);
  const functions: Array<CodeInterface> = getFunctions(parsed);

  const stringOfFunctions: Array<{
    name: string;
    file: string;
  }> = functions.map(buildFunctions);

  const buildPath = object.outdir || OUTPUT_PATH;
  const inputPath = object.dir || DEFAULT_PATH;

  if (!fs.existsSync(buildPath)) fs.mkdirSync(buildPath);
  if (!fs.existsSync(buildPath + "/lib")) fs.mkdirSync(buildPath + "/lib");
  fse.copySync(inputPath + LIB_PATH, buildPath + LIB_PATH);

  stringOfFunctions.map(v =>
    fs.writeFileSync(buildPath + "/" + FUNCTIONS_PATH + v.name + ".js", v.file)
  );
}

function parse(object: object) {
  return JSON.parse(JSON.stringify(object).replace(" ", ""));
}
