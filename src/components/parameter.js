import React from 'react'
import * as dat from 'dat.gui'

import { useControls } from 'leva'
import { useMemo, useState } from 'react'
import interact from 'interactjs'

import DatGui from 'react-dat-gui'

import store from '@/redux/store'

import BoxUI from './paramUI/sphereUI'
import { useDispatch } from 'react-redux'
import { updateState } from '@/redux/boxReducer'
import Box from './ops/geometries/render/boxGeometry'

function Component(props){
  const options = {
      x: { value: 1, min: 0, max: Math.PI * 2, step: 0.01 },
      y: { value: 1, min: 0, max: Math.PI * 2, step: 0.01 },
      z: { value: 1, min: 0, max: Math.PI * 2, step: 0.01 },
  }
  const control = useControls('box', options)
  
}

export function ParameterPlace() {
  const [state, setState] = useState(<></>)
  
  return (
    <div>
      <BoxUI/>
    </div>
  )
}

