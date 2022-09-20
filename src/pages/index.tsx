import React, { useState } from "react";
import Timer from "../components/Timer";
import { Button, Flex, Text } from '@chakra-ui/react'
import { BsFillGearFill } from "react-icons/bs";

const stateColor = {
  'initial': 'white',
  'holding': 'yellow.300',
  'running': 'red.300',
  'finished': 'green.300'
}

export default function Home() {
  const [ siteState, setSiteState ] = useState<'initial'|'holding'|'running'|'finished'>('initial'); 

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
      <Text 
        pb='80px' 
        px='20px'
        fontWeight='normal' 
        fontSize={['2xl','2xl','2xl','3xl','4xl']} 
        opacity={siteState === 'running' ? '0.3' : '1'}
      >
        {"D B U D2 B' U2 B2 L2 U2 F' D2 U2 B2 L2 R' U' F2 D B' L2 R"}
      </Text>
    </Flex>
  )
}