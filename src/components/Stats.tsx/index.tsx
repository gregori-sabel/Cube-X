import { Box, Flex, Tooltip, useBreakpointValue } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import AoStat from "./AoStat";
import LineGraph from "./LineGraph";
interface StatsProps{
  resultList: number[],
  formatTime(time: number): string,
}

export function Stats({ formatTime, resultList }: StatsProps) {
  const smallStats = useBreakpointValue({
    sm: true,
    md: false,
  })

  return (
    <>
      <Flex gap={smallStats ? '0px' : '40px'} flexDir={smallStats ? 'column' : 'row'}>

        <LineGraph formatTime={formatTime} resultList={resultList} />

        <Tooltip label='O pior e o melhor tempo são desconsiderados' placement="right">
          <Flex 
            gap={smallStats ? '20px' : '10px'}  
            flexDir={smallStats ? 'row' : 'column'} 
            justify={smallStats ? 'center' : ''}
          >
            <AoStat amount={5} formatTime={formatTime} resultList={resultList}/>
            <AoStat amount={12} formatTime={formatTime} resultList={resultList}/>   
            <AoStat amount={20} formatTime={formatTime} resultList={resultList}/>   
          </Flex>
        </Tooltip>
      </Flex>
    </>    
  )
}