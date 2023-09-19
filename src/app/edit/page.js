'use client'
import React from 'react'
import {RenderPlace} from '@/components/render'
import { OpPlace } from '@/components/opPlace'
// import OpsPlace from '@/components/opsplace'
import OperatorTemplate from '@/components/others/opTemplate'
import OpsList from '@/components/others/opsList'
import { ChakraProvider } from '@chakra-ui/react'
import { useState } from 'react'
import { Cateogry } from '@/components/opsTypes'
import { NodeCategory } from '@/components/opsNodes'

import { getID } from '@/redux/idReducer'

import store from '@/redux/store'

import { useDispatch } from "react-redux";
import { getRenderItem, getCount } from '@/redux/renderReducer'
import { getNodeItem } from '@/redux/operatorReducer' 
import {ParameterPlace} from '@/components/parameter'
import ReactWebMidi from '@/webmidi/webmidi'
import MidiScript from '@/webmidi/midiScript'

function Edit() {

  const [isRender, setIsRender] = useState(false);

  const [isShown, setIsShown] = useState(false)

  //scene.add()

  const dispatch = useDispatch();

  const renderList = []

  const nodeList = []

  const opsFunction = () => {
    // console.log(isShown)
    setIsShown(!isShown)
    for(var i = 0; i < NodeCategory.length; i++){
      for(var y = 0; y< NodeCategory[i].list.length; y++){
        if(NodeCategory[i].list[y].optype === store.getState().idGet.value){
          nodeList.push(NodeCategory[i].list[y].element());
          dispatch(getNodeItem(nodeList))
        }
      }
    }
}

  function renderFunction(){
    setIsRender(true)
    for(var i =0; i<Cateogry.length; i++){
      for(var y = 0; y<Cateogry[i].list.length; y++){
        if(Cateogry[i].list[y].type === store.getState().idGet.value)
        {
          // setRenderItem(Cateogry[i].list[y].element()) ;
          renderList.push(Cateogry[i].list[y].element());
          dispatch(getRenderItem(renderList));
          dispatch(getCount());
        }
      }
    }
  }



  return (
      // <ChakraProvider>
      
      // </ChakraProvider>
      <ChakraProvider>
        <OpsList renderPlace={renderFunction} opPlace={opsFunction}/>
        <div class="a-block" >
          <div class="render_place">
            <RenderPlace selectedRender={isRender}/>    
            {/* <script src='@/script/script.js' type='module'></script> */}
          </div>
          <div class="ops_area">
            <OpPlace opPlace={isShown}/>
          </div>
          
        </div>
      </ChakraProvider>
  )
}

export default Edit
