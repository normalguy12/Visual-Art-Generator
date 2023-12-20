'use client'
import React, { memo } from 'react'
import RenderPlace from '@/components/render'
import OpsList from '@/components/others/opsList'
import { ChakraProvider } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { Cateogry } from '@/components/opsTypes'
import { NodeCategory } from '@/components/opsNodes'


import store from '@/redux/store'
import { useDispatch } from "react-redux";
import { getRenderItem, getCount, getUpdate } from '@/redux/renderReducer'
import { getNodeItem } from '@/redux/operatorReducer' 
import ModalSound from '@/components/ops/audio/modalSound'
import { Leva } from 'leva'
import SoundOperator from '@/components/ops/geometries/operators/soundOperator'
// import audioHandler from '@/components/ops/loaders/sounds/audioHandler'
import WebMidiTest from '@/webmidi/webmidiTest'

const Edit = React.memo(props=> {

  // const api = audioHandler((state)=>state.api)

  // useEffect(()=>{
  //   api.loaded()
  //   api.start()
  // }, [])

  const [isRender, setIsRender] = useState(false);

  const [isShown, setIsShown] = useState(false)

  const [isMidi, setIsMidi] = useState(false)

  //scene.add()
  const dispatch = useDispatch();

  const nodeList = []

  const opsFunction = () => {
    // console.log(isShown)
    setIsShown(!isShown)
    // for(var i = 0; i < NodeCategory.length; i++){
    //   for(var y = 0; y< NodeCategory[i].list.length; y++){
    //     if(NodeCategory[i].list[y].optype === store.getState().idGet.value){
    //       nodeList.push(NodeCategory[i].list[y].element());
    //       dispatch(getNodeItem(nodeList))
    //     }
    //   }
    // }
}

  function renderFunction(){
    setIsRender(true)
    for(var i =0; i<Cateogry.length; i++){
      for(var y = 0; y<Cateogry[i].list.length; y++){
        if(Cateogry[i].list[y].type === store.getState().idGet.value)
        {
          // setRenderItem(Cateogry[i].list[y].element()) ;
          // renderList.push(Cateogry[i].list[y]);
          dispatch(getRenderItem(Cateogry[i].list[y]));
          dispatch(getCount());
        }
      }
    }
  }

  function deleteRender(){
    setIsRender(true)
    for(var i = 0; i < store.getState().renderGet.value.length; i++){
      if (store.getState().idGet.value === store.getState().renderGet.value[i].type){
        const renderAgain = store.getState().renderGet.value.filter(el=>el.type !== store.getState().renderGet.value[i].type)
        console.log(renderAgain)
        dispatch(getUpdate(renderAgain))
      }
    }
    
  }

  console.log(store.getState().renderGet.value)

  function midiFunction(){
    setIsMidi(true)
    console.log(isMidi)
  }

  function midiShit(){
    setIsMidi(false)
  }


  return (
      // <ChakraProvider>
      
      // </ChakraProvider>
      <ChakraProvider>
        <OpsList renderPlace={renderFunction} opPlace={opsFunction} deleteRender={deleteRender}/>
        <ModalSound isMidi={isMidi} midiShit={midiShit}/>
        <div class="a-block" >
          <div class="render_place">
            <RenderPlace selectedRender={isRender}/>    
            {/* <script src='@/script/script.js' type='module'></script> */}
          </div>
          <div class="ops_area">
            {/* <SoundOperator modalSound={midiFunction} /> */}
            <br/>
            <Leva fill/>
            {/* <OpPlace opPlace={isShown}/> */}
          </div>
        </div>
        <WebMidiTest/>
      </ChakraProvider>
  )
})

export default Edit
