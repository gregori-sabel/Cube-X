import React, { useState } from "react";
import Timer from "../components/Timer";
import {  Flex } from '@chakra-ui/react'
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export type SiteState = 'initial'|'holding'|'running'|'finished'

const stateColor = {
  'initial': 'white',
  'holding': 'yellow.300',
  'running': 'red.300',
  'finished': 'green.300'
}

export default function Home() {
  const [ siteState, setSiteState ] = useState<SiteState>('initial'); 
  const [ resultList, setResultList ] = useState<number[]>([]); 
  
  function formatTime(time: number){    
    const minutes = ("0" + Math.floor((time / 60000) % 600)).slice(-2)
    const seconds = ("0" + Math.floor((time / 1000) % 60)).slice(-2)
    const miliseconds = ("0" + Math.floor((time / 10) % 100)).slice(-2).replace('.','0')

    let formattedTime = ''
    if(time > 60000) {
      formattedTime += minutes + ':'
    }
    formattedTime += seconds + ':'
    formattedTime += miliseconds

    return formattedTime
  }

  function addNewResult(newResult: number){
    setResultList([ ...resultList, newResult])
  }


  return (
    <Flex
      flexDir='column'
      align='center' 
      justify='space-between'     
      bg={stateColor[siteState]}
    >      

      <Header formatTime={formatTime} resultList={resultList}/>
      
      <Flex 
        position='absolute'
        top='45%'
      >
        <Timer 
          setSiteState={setSiteState} 
          siteState={siteState} 
          addNewResult={addNewResult}
          formatTime={formatTime}
        />
      </Flex>

      <Footer formatTime={formatTime} resultList={resultList} siteState={siteState}/>

    </Flex>
  )
}