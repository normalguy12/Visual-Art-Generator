import React from 'react'
import { ModalCloseButton, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@chakra-ui/react'

function ModalModel() {
  return (
    <Modal
        isCentered
        motionPreset='slideInBottom'
        variant="black"
        scrollBehavior='inside'
      >
        <ModalOverlay 
          bg='blackAlpha.300'
        />
        <ModalContent maxH="400px" maxW="500px">
        <ModalHeader>Models</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={2} spacing={10}>
              
            </SimpleGrid>
          </ModalBody>
        </ModalContent>
      </Modal>
  )
}

export default ModalModel