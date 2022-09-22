import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

interface LineGraphProps{
  resultList: number[],
  formatTime(time: number): string
}

export default function LineGraph({ resultList, formatTime }:LineGraphProps) {
  const data = resultList.map(result => {
    const resultFormatted = {
      time: result,
      formattedTime: formatTime(result)
    }
    return resultFormatted
  })

  return (
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
  )
}