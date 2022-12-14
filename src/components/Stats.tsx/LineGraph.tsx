import { Box, useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { ResultList } from "../../pages";

interface LineGraphProps{
  resultList: ResultList[],
  formatTime(time: number): string
}

export default function LineGraph({ resultList, formatTime }:LineGraphProps) {
  const data = resultList.map(result => {
    const resultFormatted = {
      time: result.time,
      formattedTime: formatTime(result.time)
    }
    return resultFormatted
  })
  
  const breakPointX = useBreakpointValue({
    base: 300,
    sm: 300,
    md: 350,
    lg: 400, 
  })

  const breakPointY = useBreakpointValue({
    base: 150,
    sm: 150,
    md: 200,
  })
  
  return (

      <LineChart width={breakPointX} height={breakPointY} data={data} compact>
        <Line 
          type="linear" 
          dataKey="time" 
          stroke='#141414' 
          animationDuration={100} 
          activeDot={{
            r: 6,
            enableBackground: '#fff'
          }}
        />
        <CartesianGrid stroke="#05050545" strokeDasharray="3 3" />
        <Tooltip          
          isAnimationActive
          offset={0}
          contentStyle={{
            backgroundColor: 'transparent',
            border: 'none',
            fontWeight: 'bold'
          }}
          formatter={(time: string) => {
            return formatTime(parseInt(time))
          }} 
        />
        <XAxis 
          dataKey="name"  
          axisLine={false} 
          label='' 
          tickLine={false}
          fontSize='12px'
          tickFormatter={(time, i) => {
            return (i!==0 && i%5===0) ? ''+i : ' '
          }}  
        />
        <YAxis 
          fontSize='15px'
          axisLine 
          tickLine={false} 
          
          tickFormatter={time => {
            return formatTime(time)
          }}     
        />
      </LineChart>
  )
}