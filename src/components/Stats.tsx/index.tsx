import React, { useEffect, useState } from "react";
import { Button, Flex, Text } from '@chakra-ui/react'
import AoStat from "./AoStat";

interface StatsProps{
  resultList: number[],
  formatTime(time: number): string,
}

export function Stats({ formatTime, resultList }: StatsProps) {

  return (
    <>
      <AoStat amount={5} formatTime={formatTime} resultList={resultList}/>
      <AoStat amount={12} formatTime={formatTime} resultList={resultList}/>   
    </>    
  )
}