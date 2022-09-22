import React, { useEffect, useState } from "react";
import { Button, Flex, Text } from '@chakra-ui/react'
import { Stats } from "./Stats.tsx";
import { BsFillGearFill, BsFillPieChartFill } from "react-icons/bs";


interface HeaderProps{
  resultList: number[]
  formatTime(time: number): string
}

export function Header({ formatTime, resultList }:HeaderProps){
  const [ showStats, setShowStats ] = useState(false)

  
  return (
    <Flex w='100%' px='40px'> 
      <Flex justify='flex-start' w='200px' pt='20px'>

      </Flex>

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

      <Flex justify='flex-end' w='200px' pt='20px'>
        <Flex opacity='0.5' _hover={{ opacity:'1' }} m='0' p='0'>
          <BsFillGearFill size='24px'/>
        </Flex>
      </Flex>
    </Flex>

  )
}