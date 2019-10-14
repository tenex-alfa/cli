import retriveObjects from "../utils/retrive-objects";
import parseArchitecture from "./parse-architecitecture";
import ArchitectureInterface from "./interfaces/ArchitectureInterface";
import * as fs from "fs";
import { OUTPUT_PATH } from "../config/file-paths";

export default function() {
  const object: any = retriveObjects({});
  const yml: ArchitectureInterface = parseArchitecture(object);
  const outdir = object.outdir || OUTPUT_PATH;

  const buildPath = object.outdir || OUTPUT_PATH;
  if (!fs.existsSync(buildPath)) fs.mkdirSync(buildPath);

  console.log(`${outdir}/${yml.nameJSON}`);
  fs.writeFileSync(`${outdir}/${yml.nameYML}`, `${yml.dataYML}`);
  fs.writeFileSync(`${outdir}/${yml.nameJSON}`, `${yml.dataJSON}`);
}
