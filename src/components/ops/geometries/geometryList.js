import Box from "./render/boxGeometry"
import Sphere from "./render/sphereGeometry"
import Capsule from "./render/capsuleGeometry"
import Plane from "./render/planeGeometry"
import Circle from "./render/circleGeometry"
import Cylinder from "./render/cylinderGeometry"
import Isco from "./render/icosahedronGeometry"
import Octa from "./render/octahedronGeometry"
import Ring from "./render/ringGeometry"

export const GeometryList = [
  {
    type: 'box',
    element(){
      return <Box/>
    }
  },
  {
    type: 'sphere',
    element(){
      return <Sphere/>
    }
  },
  {
    type: 'capsule',
    element(){
      return <Capsule/>
    }
  },
  {
    type: 'plane',
    element(){
      return <Plane/>
    }
  },
  {
    type: 'circle',
    element(){
      return <Circle/>
    }
  },
  {
    type: 'cylinder',
    element(){
      return <Cylinder/>
    }
  },
  {
    type: 'isco',
    element(){
      return <Isco/>
    }
  },
  {
    type: 'octa',
    element(){
      return <Octa/>
    }
  },
  {
    type: 'ring',
    element(){
      return <Ring/>
    }
  },
  
]