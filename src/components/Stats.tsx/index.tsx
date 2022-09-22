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

      <LineGraph formatTime={formatTime} resultList={resultList}/>
      <AoStat amount={5} formatTime={formatTime} resultList={resultList}/>
      <AoStat amount={12} formatTime={formatTime} resultList={resultList}/>   
    </>    
  )
}