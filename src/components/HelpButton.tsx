import React from 'react'
import { BsQuestionCircleFill } from 'react-icons/bs'
import { Button, Text, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tooltip, useDisclosure } from '@chakra-ui/react'

export default function HelpButton() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Flex 
        position='absolute'
        top='20px'
        right={['20px','40px']}
        justify='flex-end' 
        w='200px' 
      >
        <Flex opacity='0.5' _hover={{ opacity:'1' }} m='0' p='0' onClick={onOpen}>
          <BsQuestionCircleFill size='24px'/>
        </Flex>
      </Flex>


      <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent bg='gray.100'>
          <ModalHeader>Ajuda</ModalHeader>
          <ModalCloseButton />
          <ModalBody py='40px'>
            <Text>Clique e segure na tecla por 0.5s para começar, ou use a tecla <strong>Espaço</strong>.</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Fechar
            </Button>
            {/* <Button variant='ghost'>Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>        
    </>

  )
}