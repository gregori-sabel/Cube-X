import React, { useState } from "react";
import { Flex, Tooltip } from '@chakra-ui/react'
import { Stats } from "./Stats.tsx";
import { BsFillPieChartFill } from "react-icons/bs";


interface HeaderProps{
  resultList: number[]
  formatTime(time: number): string
}

export function Header({ formatTime, resultList }:HeaderProps){
  const [ showStats, setShowStats ] = useState(false)


  return (
    <Flex w='100%'> 

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


      </Flex>

  )
}