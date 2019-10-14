import retriveObjects from "../utils/retrive-objects";
import getArchitecture from "./get-architecture";
export default function() {
  console.log("RUNNING PARSE ARCTECTURE");
  const objects: object = retriveObjects({});
  const functions: object = getArchitecture(objects);

  console.log(functions);
}
