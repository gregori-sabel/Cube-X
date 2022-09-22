import React, { useEffect, useState } from "react";
import { Button, Flex, Text } from '@chakra-ui/react'
import AoStat from "./AoStat";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
interface StatsProps{
  resultList: number[],
  formatTime(time: number): string,
}

export function Stats({ formatTime, resultList }: StatsProps) {

  const data = resultList.map(result => {
    const resultFormatted = {
      time: result,
      formattedTime: formatTime(result)
    }
    return resultFormatted
  })

  return (
    <>

      <LineChart width={400} height={200} data={data}>
        <Line 
          type="linear" 
          dataKey="time" 
          stroke='#141414' 
          animationDuration={100} 
        />
        <CartesianGrid stroke="#05050545" strokeDasharray="3 3" />
        <Tooltip  isAnimationActive
          formatter={(time) => {
            return formatTime(time as number)
          }} 
        />
        <XAxis dataKey="name" tick={false} axisLine={false} label='' />
        <YAxis 
          axisLine 
          tickLine={false}  
          tickFormatter={time => {
            return formatTime(time)
          }}     
        />
      </LineChart>
      <AoStat amount={5} formatTime={formatTime} resultList={resultList}/>
      <AoStat amount={12} formatTime={formatTime} resultList={resultList}/>   
    </>    
  )
}