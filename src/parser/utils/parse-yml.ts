import { safeLoad } from "js-yaml";

const getYML = (yml: string): any => {
  const object: object = safeLoad(yml);
  return object;
};

export default getYML;
