import NameToFileInterface from "../parse-architecture/interfaces/NameToFileInterface";
import * as _ from "lodash";
import { RESERVED_NAMES } from "./system-varibles";
import { FUNCTIONS_PATH } from "./file-paths";
export default (key: string, whole: any): NameToFileInterface => {
  const functions = _.clone(whole);
  RESERVED_NAMES.map((value): boolean => delete functions[value]);
  // console.log(functions);
  switch (key) {
    case "serverless":
      return {
        nameYML: "serverless.yml",
        addOnYML: {
          service: "${service}",
          plugins: [
            "serverless-dotenv-plugin",
            "serverless-offline-lambda",
            "serverless-offline"
          ],
          provider: {
            name: "aws",
            runtime: "${runtime}",
            region: "${region}"
          },

          functions: _.transform(functions, (r: any, v, k: string) => {
            r[k] = {
              handler: `${FUNCTIONS_PATH}${k}.default`,
              events: [
                {
                  http: {
                    path: `\${api}/${k}`,
                    method: "post",
                    cors: true
                  }
                },
                {
                  http: {
                    path: `\${api}/${k}`,
                    method: "get",
                    cors: true
                  }
                }
              ]
            };
          })
        },
        dataJSON: JSON.stringify({
          name: "${service}",
          devDependencies: {
            "serverless-dotenv-plugin": "^2.1.1",
            "serverless-offline-lambda": "^1.0.4",
            "recursive-install": "^1.4.0"
          },
          scripts: {
            setup: "npm install && npm-recursive-install --skip-root",
            start: "sls offline"
          }
        }),
        nameJSON: "package.json"
      };
  }
};
