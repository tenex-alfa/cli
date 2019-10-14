import * as fs from "fs";
import * as fse from "fs-extra";
import parseYML from "../utils/parse-yml";
const parseTemplate = (from: string, to: string) => {
  fs.readdirSync(from).map(name => {
    const string: string = fs.readFileSync(from + "/" + name, "utf-8");
    const obj: object = parseYML(string);
    fse.writeFileSync(
      to + "/" + name.replace(".yml", ".json"),
      JSON.stringify(obj)
    );
    fs.writeFileSync(to + "/" + name, string);
  });
};

export default parseTemplate;
