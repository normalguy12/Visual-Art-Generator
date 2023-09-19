import { GeometryOpsList } from "./ops/geometries/geometryOpsList"
import { LightOpList } from "./ops/lights/LightOpList"
export const NodeCategory = [
  {
    name: 'Geometry',
    list: GeometryOpsList,
  },
  {
    name: 'Light',
    list: LightOpList,
  },
]