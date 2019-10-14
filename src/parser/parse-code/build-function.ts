import CodeInterface from "./interfaces/CodeInterface";
import { VARIBLE_PREFIX, IMPORT_PREFIX } from "../config/prefixes";
import CommandInterface from "./interfaces/CommandsInterface";
import VaribleInterface from "./interfaces/VaribleInterface";
import ImportInterface from "./interfaces/ImportInterface";
import * as path from "path";
import { LIB_PATH, TEMPLATE_PATH, RESOURCES_PATH } from "../config/file-paths";
const buildFunction = (
  singleFunction: CodeInterface
): { file: string; name: string } => {
  const {
    name,
    commands,
    varibles,
    input,
    includes,
    resources,
    templates
  } = singleFunction;
  const generatedString: Array<string> = [];

  generatedString.push(buildImports(includes));
  generatedString.push(buildResources(resources));
  generatedString.push(buildTemplates(templates));
  generatedString.push(buildVaribles(varibles));
  generatedString.push(buildHeader(name));
  generatedString.push(buildBody(commands));
  generatedString.push(buildFooter(name));
  generatedString.push(buildTest(input, name));

  return { file: generatedString.join("\n"), name };
};

function buildImports(imports: Array<ImportInterface>): string {
  return imports
    .map(singleImport => {
      return `const ${IMPORT_PREFIX}${
        singleImport.key
        } = require("./${LIB_PATH}${path.basename(
          singleImport.value
        )}").default.bind({id:"${singleImport.key &&
        singleImport.key.toLowerCase()}"});`;
    })
    .join("\n");
}
function buildResources(imports: Array<ImportInterface>): string {
  return imports
    .map(singleImport => {
      return `const ${IMPORT_PREFIX}${
        singleImport.key
        } = require("./${RESOURCES_PATH}${path.basename(
          singleImport.value
        )}").default.bind({id:"${singleImport.key &&
        singleImport.key.toLowerCase()}"});;`;
    })
    .join("\n");
}
function buildTemplates(imports: Array<ImportInterface>): string {
  return imports
    .map(singleImport => {
      return `const ${VARIBLE_PREFIX}${
        singleImport.key
        } = require("./${TEMPLATE_PATH}${path.basename(singleImport.value)}");`;
    })
    .join("\n");
}

function buildHeader(name: string): string {
  return `async function ${name}(${VARIBLE_PREFIX}input){`;
}

function buildVaribles(varibles: Array<VaribleInterface>): string {
  return varibles
    .map(v => {
      return `var ${IMPORT_PREFIX}${v.key} = ${JSON.stringify(v.value)}`;
    })
    .join("\n");
}

function buildBody(commads: Array<CommandInterface>): string {
  const stringArray: Array<string> = [];
  for (const command of commads) {
    const { output, input } = command;
    stringArray.push(`
      var ${VARIBLE_PREFIX}${output} = await ${IMPORT_PREFIX}${command.function}(${
      !input
        ? ""
        : input[0] &&
        `${input &&
        input[0] &&
        input.map(v => VARIBLE_PREFIX + v.replace(" ", "")).join(`,`)}`
      });`);
  }

  return stringArray.join("");
}

function buildFooter(name: string): string {
  return `return {statusCode:200, body:JSON.stringify(${VARIBLE_PREFIX}return)}}
module.exports.default = ${name};
    `;
}

function buildTest(input: string, name: string): string {
  return !input
    ? ""
    : `(function(){
    console.log("testing ${name}");
    process.env.test = true;
    if(${IMPORT_PREFIX}${input} && ${IMPORT_PREFIX}${input}.mock)
      ${name}(${IMPORT_PREFIX}${input}.mock);
    process.env.test = false;
  })()`;
}

export default buildFunction;
