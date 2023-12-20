import { GeometryOpsList } from "./ops/geometries/geometryOpsList"
import { LightOpList } from "./ops/lights/LightOpList"
import { ModelOpList } from "./ops/models/modelOpList"
export const NodeCategory = [
  {
    name: 'Geometry',
    list: GeometryOpsList,
  },
  {
    name: 'Light',
    list: LightOpList,
  },
  {
    name: 'Models',
    list: ModelOpList,
  },
]