import React, { useEffect, useState } from "react";
import Timer from "../components/Timer";
import { Button, Flex, Text } from '@chakra-ui/react'
import { BsFillGearFill, BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";
import { Footer } from "../components/Footer";

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
    const miliseconds = ("0" + ((time / 10) % 100)).slice(-2)

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
      <Flex 
        position='absolute'
        top='45%'
        // bottom='50%'
        // margin={window.innerHeight/2 - time}
        // sx={{
        //   translateX: '100px'
        // }}
      >
        <Timer 
          setSiteState={setSiteState} 
          siteState={siteState} 
          addNewResult={addNewResult}
          formatTime={formatTime}
        />
      </Flex>
      
      <Flex w='100%' justify='flex-end' pt='20px' pr='20px' >        
        <Button variant='unstyled' opacity='0.5' _hover={{ opacity:'1' }} m='0' p='0'>
          <BsFillGearFill size='30px'/>
        </Button>
      </Flex>

      <Footer formatTime={formatTime} resultList={resultList} siteState={siteState}/>

    </Flex>
  )
}