import React, { useEffect, useState } from "react";
import { Button, Flex, Text, Tooltip } from '@chakra-ui/react'
import { ResultList, SiteState } from "../pages";
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";

interface FooterProps{
  siteState: SiteState,
  resultList: ResultList[], 
  formatTime(time: number): string
}

export function Footer({ resultList, siteState, formatTime }:FooterProps) {
  const [ scrambleList, setScrambleList ] = useState<String[]>([]); 
  const [ scramblePosition, setScramblePosition ] = useState(0); 

  // for(c=b=j=25,r=Math.random;j;c+b-5|c-m&&b-m?document.write("URFBLD"[j--,c=b,b=m]+" 2'"[0|r()*3]+" "):0)m=0|r()*6
  function getScramble(){
    let c, b, j = 25
    let r = Math.random
    let m = 0    
    let newScramble = ''
    for(c=b=j=25,r=Math.random;j;c+b-5|c-m&&b-m ? newScramble = newScramble + ("URFBLD"[j--,c=b,b=m]+" 2'"[0|r()*3]+" ") :0)m=0|r()*6
    setScrambleList([...scrambleList, newScramble])
    setScramblePosition(scramblePosition +1)
  }  

  function prevScramble() {
    if(scramblePosition > 0){
      setScramblePosition(scramblePosition -1)
    }
  }

  function nextScramble() {
    if(scramblePosition < (scrambleList.length - 1)){
      setScramblePosition(scramblePosition +1)
    } else {
      getScramble()
      setScramblePosition(scramblePosition +1)
    }
  }  



  useEffect(() => {
    getScramble()
    setScramblePosition(0)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return(
    <Flex 
    pb={['20px','40px','60px' ]}
    px='20px'
    flexDir='column'
    align='center'
    gap='10px'
  >    

    <Tooltip label='Embaralhamento' placement="top">
      <Text
        id='scramble'
        fontWeight='normal' 
        fontSize={['2xl','2xl','2xl','3xl','4xl']} 
        opacity={siteState === 'running' ? '0.3' : '1'}        
      >
        {scrambleList[scramblePosition]}
      </Text>    
    </Tooltip>
    <Flex 
      gap='20px'
      opacity={siteState === 'running' ? '0.3' : '1'}           
    >
      <Button 
        bg='none' 
        onClick={prevScramble} 
        disabled={scramblePosition === 0 || siteState !== 'initial' ? true : false}
      >
        <BsCaretLeftFill size='20px' />
      </Button>
      <Button 
        bg='none' 
        onClick={nextScramble}
        disabled={siteState !== 'initial' ? true : false}
      >
        <BsCaretRightFill size='20px' />
      </Button>
    </Flex>   
  </Flex>    
  )
}