import React, {useState} from 'react'
import { ModalCloseButton, Button, Input, Text, Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@chakra-ui/react'
import { useDispatch } from 'react-redux';
import { getAudio } from '@/redux/audioReducer';


function ModalSound(props) {

  const dispatch = useDispatch()

  const [ok, setOk] = useState([]);
  
  const [count, setCount] = useState(0)

  const [file, setFile] = useState()

  const test1 = ['_.mp3', 'isaiah.mp3', 'rooting.mp3']

  const onSubmit = async(e) => {
    e.preventDefault()
    if (!file) return

    try {
      const data = new FormData()
      data.set('file', file)

      const res = await fetch('./api/upload', {
        method: 'POST',
        body: data
      })

      if (!res.ok) throw new Error(await res.text())
    }
    catch (e){
      console.error(e)
    }
};

  function handleClick(e){
    e.preventDefault()
    setOk([...ok, test1[count]])
    setCount(count + 1)
  }

  function getUrl(e){
    e.preventDefault()
    dispatch(getAudio(e.currentTarget.id))
    midiShit()
  }

  const {midiShit} = props

  function handleOut(){
    midiShit();
  }

  return (
    <Modal
        isCentered
        motionPreset='slideInBottom'
        onClose={handleOut}
        
        isOpen={props.isMidi}
        variant="black"
        scrollBehavior='inside'
      >
        <ModalOverlay 
          bg='blackAlpha.300'
        />
        <ModalContent height="400px" maxW="500px">
        <ModalHeader>Sounds</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* <Home/> */}
            <Box id='drums.mp3' display='inline-block' marginRight='2%' width='85px' cursor='pointer' alignContent='center'>
              <img width='48px' height='48px' src='https://static.javatpoint.com/computer/images/what-is-mp3.jpg'/>
              <Text fontSize='sm'>drums.mp3</Text>
            </Box>
            <Box id='snare.mp3' display='inline-block' marginRight='2%' width='85px' cursor='pointer' alignContent='center'>
              <img width='48px' height='48px' src='https://static.javatpoint.com/computer/images/what-is-mp3.jpg'/>
              <Text fontSize='sm'>snare.mp3</Text>
            </Box>
            <Box id='synth.mp3'  display='inline-block' marginRight='2%' width='85px' cursor='pointer' alignContent='center'>
              <img width='48px' height='48px' src='https://static.javatpoint.com/computer/images/what-is-mp3.jpg'/>
              <Text fontSize='sm'>synth.mp3</Text>
            </Box>
            {ok.map((comp)=><>
              <Box onClick={getUrl} id={comp} display='inline-block' marginRight='2%' marginTop='2%' width='85px' cursor='pointer' alignContent='center'>
              <img width='48px' height='48px' src='https://static.javatpoint.com/computer/images/what-is-mp3.jpg'/>
              <Text fontSize='sm'>{comp}</Text>
              </Box>
            </>)}
          </ModalBody>
          <ModalFooter>
            <form onSubmit={onSubmit}>
              <input type='file' name='file' onChange={e=> setFile(e.target.files)}/>
              <Button disabled={(count > 3) ? true : false} onClick={handleClick}>Upload</Button>
            </form>
          </ModalFooter>  
        </ModalContent>
      </Modal>
  )
}

export default ModalSound