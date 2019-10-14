import getSingleResource from "./get-single-resource";
import { OUTPUT_PATH, LIB_PATH, TEMPLATE_PATH } from "../config/file-paths";
import * as fs from "fs";
import * as fse from "fs-extra";
import ArchitectureInterface from "./interfaces/ArchitectureInterface";
const getArchitecture = (object: any): object => {
  const resources = object.resources;
  const parseResources: Array<ArchitectureInterface> = Object.keys(
    resources || {}
  ).map(v => getSingleResource({ name: v, type: resources[v] }));

  const buildPath = object.outdir || OUTPUT_PATH;

  if (!fs.existsSync(buildPath + LIB_PATH)) fs.mkdirSync(buildPath + LIB_PATH);

  for (const resource of parseResources) {
    fse.copySync(resource.path, buildPath + resource.imports);
  }

  return {};
};

export default getArchitecture;
