import React from 'react'
import { Flex, Text } from '@chakra-ui/react'
import { ResultList } from '../../pages'

interface AoStatProps{
  resultList: ResultList[],
  amount: number,
  formatTime(time: number): string
}

export default function AoStat({ amount, resultList, formatTime }:AoStatProps) {
  const lastResults = resultList.slice(resultList.length-amount, resultList.length)
  let formattedAverage = ''

  if(resultList.length >= amount){
    let bestTime = lastResults[0].time
    let worstTime = lastResults[0].time

    const timeList = lastResults.map((result) => {
      bestTime = result.time < bestTime ? result.time : bestTime
      worstTime = result.time > worstTime ? result.time : worstTime

      return result.time 
    }) 

    formattedAverage = formatTime(
      (
        timeList.reduce((sum,result) => {
          bestTime = result < bestTime ? result : bestTime
          worstTime = result > worstTime ? result : worstTime

          return sum+result 
        }) - (bestTime + worstTime)
      )/(amount-2)
    )

  }

  return (
    <Flex flexDir='column' align='center'>
      <Text fontWeight='bold' fontSize='xl'>
        { formattedAverage !== '' &&
          formattedAverage
        }            
        { formattedAverage === '' &&
          '00:00'
        }
      </Text>
      <Text mt='-5px'>{`ao${amount}`}</Text>
    </Flex> 
  )
}
