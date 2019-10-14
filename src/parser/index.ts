import parseCode from "./parse-code/index";
import parseResources from "./parse-resources/index";
import parseTemplates from "./parse-templates/index";
import parseArchitecture from "./parse-architecture/index";
import { spawn } from "child_process";
import retriveObjects from "./utils/retrive-objects";
import { OUTPUT_PATH } from "./config/file-paths";
import ArgumentInterface from "../commands/ArgumentInterface";
import * as fse from "fs-extra";
export default function(args: ArgumentInterface) {
  const object: any = retriveObjects({});
  const outdir = object.outdir || OUTPUT_PATH;
  fse.removeSync(outdir);

  parseCode();
  parseResources();
  parseTemplates();
  parseArchitecture();

  const afterCommand = `cd ${outdir} && npm run setup && npm start`;

  const child = spawn(afterCommand, [], {
    shell: true
  });
  // use child.stdout.setEncoding('utf8'); if you want text chunks

  child.stdout.on("data", data => {
    console.log(`stdout: ${data}`);
  });

  child.stderr.on("data", data => {
    console.error(`stderr: ${data}`);
  });

  child.on("close", code => {
    console.log(`child process exited with code ${code}`);
  });
}
