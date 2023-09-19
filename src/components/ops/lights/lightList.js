import AmbientLight from "./render/ambientLight"
import AmbientLightProbe from "./render/ambientLightProbe"
import DirectionalLight from "./render/directionalLight"

export const LightList = [
  {
    type: 'ambient',
    element(){
      return <AmbientLight/>
    }
  },
  {
    type: 'ambientProbe',
    element(){
      return <AmbientLightProbe/>
    }
  },
  {
    type: 'directional',
    element(){
      return <DirectionalLight/>
    }
  }
]