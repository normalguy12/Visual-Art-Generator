import { useControls } from 'leva'
import React from 'react'
import { useMemo } from 'react'

function DirectionalLight() {
  const options = useMemo(()=>{
    return {
      color: { value: 'white' },
      intensity: { value: 0.5},
    }
  }, [])

  const control = useControls('DirectionalLight', options)
  return (
    <directionalLight args={[control.color, control.intensity]}/>
  )
}

export default DirectionalLight