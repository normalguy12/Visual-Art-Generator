import { useControls } from 'leva'
import React from 'react'
import { useMemo } from 'react'

function AmbientLightProbe() {
  const options = useMemo(()=>{
    return {
      color: { value: 'white' },
      intensity: { value: 0.5},
    }
  }, [])

  const control = useControls('ambientLight', options)
  return (
    <ambientLightProbe args={[control.color, control.intensity]}/>
  )
}

export default AmbientLightProbe