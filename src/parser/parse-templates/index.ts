import * as fs from "fs";
import * as fse from "fs-extra";
import {
  OUTPUT_PATH,
  TEMPLATE_PATH,
  DEFAULT_PATH,
  LIB_PATH
} from "../config/file-paths";
import retriveObjects from "../utils/retrive-objects";
import parseTemplate from "./parse-templates";
export default function() {
  const object: any = retriveObjects({});
  const buildPath = object.outdir || OUTPUT_PATH;
  const fromPath = object.dir || DEFAULT_PATH;

  if (!fs.existsSync(buildPath)) fs.mkdirSync(buildPath);
  if (!fs.existsSync(buildPath + TEMPLATE_PATH))
    fs.mkdirSync(buildPath + TEMPLATE_PATH);

  parseTemplate(fromPath + TEMPLATE_PATH, buildPath + TEMPLATE_PATH);
  parseTemplate(fromPath + TEMPLATE_PATH, buildPath + LIB_PATH);
}
