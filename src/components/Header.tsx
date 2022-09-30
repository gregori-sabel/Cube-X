import React, { useState } from "react";
import { Button, Text, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tooltip, useDisclosure } from '@chakra-ui/react'
import { Stats } from "./Stats.tsx";
import { BsQuestionCircleFill, BsFillPieChartFill } from "react-icons/bs";


interface HeaderProps{
  resultList: number[]
  formatTime(time: number): string
}

export function Header({ formatTime, resultList }:HeaderProps){
  const [ showStats, setShowStats ] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()


  
  return (
    <Flex w='100%' px={['10px','40px']}> 
      <Flex justify='flex-start' w='200px' pt='20px'>

      </Flex>

        <Tooltip label='Estatísticas'>
          <Flex 
            justify='center'
            w='100%' 
            py='20px'
            onClick={() => setShowStats(!showStats)} 
          >
            { !showStats && 
                <BsFillPieChartFill size='24px' opacity='0.5'/>  
              }
            { showStats && 
                <Stats  formatTime={formatTime} resultList={resultList}/>   
            }        
          </Flex>     
        </Tooltip>                      

        <Flex justify='flex-end' w='200px' pt='20px'>
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
            <Text>Segure a tecla <strong>espaço</strong> por 0.5s para começar.</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Fechar
            </Button>
            {/* <Button variant='ghost'>Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>        

      </Flex>

  )
}