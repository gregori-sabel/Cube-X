import React, { useState } from "react";
import { Stats } from "./Stats.tsx";
import { BsFillPieChartFill, BsArrowUpCircleFill } from "react-icons/bs";
import { ResultList } from "../pages";
import { Button, Text, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tooltip, useDisclosure } from '@chakra-ui/react'


interface HeaderProps{
  resultList: ResultList[]
  formatTime(time: number): string
}

export function Header({ formatTime, resultList }:HeaderProps){
  const [ showStats, setShowStats ] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()


  return (
    <>
      <Flex w='100%' justify='center'> 
        <Tooltip label='Estatísticas'>
          <Flex 
            justify='center'
            w='100px' 
            py='20px'
            >
            { !showStats && 
              <Flex onClick={() => setShowStats(!showStats)} >
                <BsFillPieChartFill size='24px' opacity='0.5'/>  
              </Flex>
            }
            { showStats && 
              <Flex flexDir='column' align='center'>
                <Flex onClick={onOpen}>
                  <Stats  formatTime={formatTime} resultList={resultList}/> 
                </Flex>
                <Flex onClick={() => setShowStats(!showStats)} >
                  <BsArrowUpCircleFill size='24px' opacity='0.5'/>  
                </Flex>  
              </Flex>
            }        
          </Flex>     
        </Tooltip>                                
      </Flex>


      <Modal isOpen={isOpen} onClose={onClose} size='2xl'>
        <ModalOverlay />
        <ModalContent bg='gray.100' >
          <ModalHeader>Histórico</ModalHeader>
          <ModalCloseButton />
          <ModalBody py='40px'>
            
            { resultList.map(result => (
              <Text key={result.time}><strong>{formatTime(result.time)}:</strong> {result.scramble}.</Text>
            ))}
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