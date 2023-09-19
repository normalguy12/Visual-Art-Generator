import AmbientLightOps from "./operators/ambientOperator"
import AmbientLightProbeOps from "./operators/ambientProbeOperator"
import DirectionalLightOps from "./operators/directionalOperator"

export const LightOpList = [
  {
    optype: 'ambient',
    element(){
      return <AmbientLightOps/>
    }
  },
  {
    optype: 'ambientProbe',
    element(){
      return <AmbientLightProbeOps/>
    }
  },
  {
    optype: 'directional',
    element(){
      return <DirectionalLightOps/>
    }
  },
  
  
]