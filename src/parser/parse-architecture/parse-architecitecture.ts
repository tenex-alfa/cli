import ArchitectureInterface from "./interfaces/ArchitectureInterface";
import fallback from "../config/fallbacks";
import * as _ from "lodash";
import * as fs from "fs";
import {
  DEFAULT_PATH,
  TEMPLATE_PATH,
  RESOURCES_PATH,
  TYPE_PATH
} from "../config/file-paths";
import replace from "../utils/replace-in-string";
import getYML from "../utils/parse-yml";
import * as deepmerge from "deepmerge";
import * as yml from "js-yaml";
import nameToFile from "../config/name-to-file";

const parseArchitecture = (res: any): ArchitectureInterface => {
  const { resources, type, dir } = _.merge(fallback, res);
  const dirPath = dir || DEFAULT_PATH;
  let wholeResources: any = {};

  for (const res in resources) {
    const name = res;
    const pathToType: string = getYML(
      fs.readFileSync(
        dirPath + RESOURCES_PATH + resources[res] + "/tx.yml",
        "utf-8"
      )
    ).types[type];

    const obj = getYML(
      replace(
        { ...fallback, name: name.toLowerCase() },
        fs.readFileSync(
          dirPath + RESOURCES_PATH + resources[res] + TYPE_PATH + pathToType,
          "utf-8"
        )
      )
    );
    wholeResources = deepmerge.all([wholeResources, obj]);
  }
  const extraInformations = nameToFile(type, res);
  return {
    dataYML: yml.safeDump(
      JSON.parse(
        replace(
          { ...fallback, ...res },
          JSON.stringify(
            deepmerge.all([extraInformations.addOnYML, wholeResources])
          )
        )
      )
    ),
    nameYML: replace({ ...fallback, ...res }, extraInformations.nameYML),
    nameJSON: replace({ ...fallback, ...res }, extraInformations.nameJSON),
    dataJSON: replace({ ...fallback, ...res }, extraInformations.dataJSON)
  };
};

export default parseArchitecture;
