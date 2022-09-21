import React, { useEffect, useState } from "react";
import Timer from "../components/Timer";
import { Button, Flex, Text } from '@chakra-ui/react'
import { BsFillGearFill, BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";

const stateColor = {
  'initial': 'white',
  'holding': 'yellow.300',
  'running': 'red.300',
  'finished': 'green.300'
}

export default function Home() {
  const [ siteState, setSiteState ] = useState<'initial'|'holding'|'running'|'finished'>('initial'); 
  const [ scrambleList, setScrambleList ] = useState<String[]>([]); 
  const [ scramblePosition, setScramblePosition ] = useState(0); 
  
  let c = 25
  let b = 25
  let j = 25 
  let r = Math.random
  let m = 0
  
  // for(c=b=j=25,r=Math.random;j;c+b-5|c-m&&b-m?document.write("URFBLD"[j--,c=b,b=m]+" 2'"[0|r()*3]+" "):0)m=0|r()*6
  function getScramble(){
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
  }, [])
  

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
        <Timer setSiteState={setSiteState} siteState={siteState}/>
      </Flex>
      <Flex w='100%' justify='flex-end' pt='20px' pr='20px' >
        <Button variant='unstyled' opacity='0.5' _hover={{ opacity:'1' }} m='0' p='0'>
          <BsFillGearFill size='30px'/>
        </Button>
      </Flex>
      <Flex 
        pb='60px' 
        px='20px'
        flexDir='column'
        align='center'
        gap='10px'
      >
        <Text
          fontWeight='normal' 
          fontSize={['2xl','2xl','2xl','3xl','4xl']} 
          opacity={siteState === 'running' ? '0.3' : '1'}        
        >
          {scrambleList[scramblePosition]}
        </Text>    
        <Flex gap='20px'>
          <Button bg='none' onClick={prevScramble} disabled={scramblePosition === 0 ? true : false}>
            <BsCaretLeftFill size='20px' />
          </Button>
          <Button bg='none' onClick={nextScramble}>
            <BsCaretRightFill size='20px' />
          </Button>
        </Flex>   
      </Flex>
    </Flex>
  )
}