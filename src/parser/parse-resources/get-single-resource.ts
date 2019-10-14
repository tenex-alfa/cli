import ArchitectureInterface from "./interfaces/ArchitectureInterface";
import {
  DEFAULT_RESOURCE_PATH,
  LIB_PATH,
  RESOURCES_PATH
} from "../config/file-paths";
const getResource = (resource: {
  name: string;
  type: string;
  path?: string;
}): ArchitectureInterface => {
  const name = resource.name;
  const type = resource.type;
  const path = resource.path || DEFAULT_RESOURCE_PATH + type;
  const imports = RESOURCES_PATH + type;
  return {
    name: name,
    imports: imports,
    path: path
  };
};

export default getResource;
