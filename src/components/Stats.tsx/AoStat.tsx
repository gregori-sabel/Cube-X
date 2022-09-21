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
  console.log(lastResults)

  if(resultList.length >= amount){
    formattedAverage = formatTime(
      lastResults.reduce((sum,value) => {
        return sum+value 
      })/amount
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
