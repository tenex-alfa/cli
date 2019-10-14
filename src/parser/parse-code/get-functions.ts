import { RESERVED_NAMES } from "../config/system-varibles";
import * as _ from "lodash";
import CodeInterface from "./interfaces/CodeInterface";

const getFunctions = (object: any): Array<CodeInterface> => {
  const functionObject: any = _.clone(object);
  const { varibles, include, resources, templates } = object;

  RESERVED_NAMES.map((value): boolean => delete functionObject[value]);
  return Object.keys(functionObject).map(key => {
    const input = functionObject[key].input;
    delete functionObject[key].input;
    return {
      input,
      name: key,
      varibles: Object.keys(varibles || {}).map(key => ({
        key,
        value: varibles[key]
      })),
      resources: Object.keys(resources || {}).map(key => ({
        key,
        value: resources[key]
      })),
      templates: Object.keys(templates || {}).map(key => ({
        key,
        value: templates[key]
      })),
      includes: Object.keys(include || {}).map(key => ({
        key,
        value: include[key]
      })),
      commands: Object.keys(functionObject[key]).map(value => ({
        function: functionObject[key][value].split("(")[0],
        input:
          functionObject[key][value].split("(")[1] &&
          functionObject[key][value]
            .split("(")[1]
            .split(")")[0]
            .split(","),
        output: value
      }))
    };
  });
};
export default getFunctions;
