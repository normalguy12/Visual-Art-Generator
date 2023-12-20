import { GeometryList } from "./ops/geometries/geometryList"
import { LightList } from "./ops/lights/lightList"

export const AudioCategory = [
  {
    name: 'Kick',
    list: GeometryList,
  },
  {
    name: 'Snare',
    list: LightList,
  },
  {
    name: 'Synth',
    list: LightList,
  },
  {
    name: 'FX',
    list: LightList,
  },
  {
    name: 'Piano',
    list: LightList,
  },
]