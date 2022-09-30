import { Flex, Tooltip } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import AoStat from "./AoStat";
import LineGraph from "./LineGraph";
interface StatsProps{
  resultList: number[],
  formatTime(time: number): string,
}

export function Stats({ formatTime, resultList }: StatsProps) {


  return (
    <>
      <Flex gap='40px' >
        <LineGraph formatTime={formatTime} resultList={resultList}/>
        <Tooltip label='O pior e o melhor tempo são desconsiderados' placement="right">
          <Flex flexDir='column' gap='10px'>
            <AoStat amount={5} formatTime={formatTime} resultList={resultList}/>
            <AoStat amount={12} formatTime={formatTime} resultList={resultList}/>   
            <AoStat amount={20} formatTime={formatTime} resultList={resultList}/>   
          </Flex>
        </Tooltip>
      </Flex>
    </>    
  )
}