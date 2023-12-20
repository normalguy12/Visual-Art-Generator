import Bust from "./bust"
import DancingDot from "./dancingDot"
import Particle from "./particles"
import { Model } from "./Xbot"
import Explosion from "./explosion"
export const ModelList = [
  {
    type: 'Bust',
    element(){
      return <Bust/>
    }
  },
  {
    type: 'DancingDot',
    element(){
      return <DancingDot/>
    }
  },
  {
    type: 'Particle',
    element(){
      return <Particle/>
    }
  },
  {
    type: 'Model',
    element(){
      return <Model/>
    }
  },
  {
    type: 'Explosion',
    element(){
      return <Explosion/>
    }
  },
  
]

