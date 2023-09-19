import BoxOperator from "./operators/boxOperator"
import SphereOperator from "./operators/sphereOperator"
import CapsuleOperator from "./operators/capsuleOperator"
import PlaneOperator from "./operators/planeOperator"
import CircleOperator from "./operators/circleOperator"
import CylinderOperator from "./operators/cylinderOperator"
import IscoOperator from "./operators/iscoOperator"
import OctaOperator from "./operators/octaOperator"
import RingOperator from "./operators/ringOperator"
import ModelLoadOperator from "./operators/modelLoadOperator"

export const GeometryOpsList = [
  {
    optype: 'box',
    element(){
      return <BoxOperator/>
    }
  },
  {
    optype: 'sphere',
    element(){
      return <SphereOperator/>
    }
  },
  {
    optype: 'capsule',
    element(){
      return <CapsuleOperator/>
    }
  },
  {
    optype: 'plane',
    element(){
      return <PlaneOperator/>
    }
  },
  {
    optype: 'circle',
    element(){
      return <CircleOperator/>
    }
  },
  {
    optype: 'cylinder',
    element(){
      return <CylinderOperator/>
    }
  },
  {
    optype: 'isco',
    element(){
      return <IscoOperator/>
    }
  },
  {
    optype: 'octa',
    element(){
      return <OctaOperator/>
    }
  },
  {
    optype: 'ring',
    element(){
      return <RingOperator/>
    }
  },
  {
    optype: 'loader',
    element(){
      return <ModelLoadOperator/>
    }
  },
  
]