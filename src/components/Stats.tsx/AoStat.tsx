import React from 'react'
import { Flex, Text } from '@chakra-ui/react'

interface AoStatProps{
  resultList: number[],
  amount: number,
  formatTime(time: number): string
}

export default function AoStat({ amount, resultList, formatTime }:AoStatProps) {
  const lastResults = resultList.slice(resultList.length-amount, resultList.length)
  let formattedAverage = ''

  if(resultList.length >= amount){
    let bestTime = lastResults[0]
    let worstTime = lastResults[0]

    formattedAverage = formatTime(
      (
        lastResults.reduce((sum,value) => {
          bestTime = value < bestTime ? value : bestTime
          worstTime = value > worstTime ? value : worstTime

          return sum+value 
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
