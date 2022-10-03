import React, { useState } from "react";
import Timer from "../components/Timer";
import {  Flex } from '@chakra-ui/react'
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import HelpButton from "../components/HelpButton";

export type SiteState = 'initial'|'holding'|'running'

export interface ResultList{
  time: number;
  scramble: string;
}

const stateColor = {
  'initial': 'green.300',
  'holding': 'yellow.300',
  'running': 'red.300'
}

export default function Home() {
  const [ siteState, setSiteState ] = useState<SiteState>('initial'); 
  const [ resultList, setResultList ] = useState<ResultList[]>([]); 
  
  function formatTime(time: number){    
    const minutes = ("0" + Math.floor((time / 60000) % 600)).slice(-2)
    const seconds = ("0" + Math.floor((time / 1000) % 60)).slice(-2)
    const miliseconds = ("0" + Math.floor((time / 10) % 100)).slice(-2).replace('.','0')

    let formattedTime = ''
    if(time > 60000) {
      formattedTime += minutes + ':'
    }
    formattedTime += seconds + '.'
    formattedTime += miliseconds 

    return formattedTime
  }

  function addNewResult(newResult: number){
    const scramble = document.getElementById('scramble')?.innerText || ''

    setResultList([ ...resultList, {time: newResult, scramble}])
  }


  return (
    <Flex
      userSelect='none'
      flexDir='column'
      align='center' 
      justify='space-between'     
      transition={siteState === 'holding' ? '0.5s cubic-bezier(.71,.68,1,.13)' : '0s'}
      bg={stateColor[siteState]}
    >      

      <HelpButton />

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