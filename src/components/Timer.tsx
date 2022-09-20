import { Button, Flex, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

const design = {
  'initial': 'white',
  'holding': 'yellow.300',
  'running': 'red.300',
  'finished': 'green.300'
}

export default function Timer(){ 
  const [ siteState, setSiteState ] = useState<'initial'|'holding'|'running'|'finished'>('initial'); 
  const [time, setTime] = useState(0)
  const [timerOn, setTimerOn] = useState(false)

  useEffect(()=>{
    let interval: (NodeJS.Timer | null) = null;

    if(timerOn){
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 10 )
      }, 10)
    } else {
      clearInterval(interval as unknown as NodeJS.Timer)
    }

    return () => clearInterval(interval  as unknown as NodeJS.Timer)

  },[timerOn])

  const detectKeyDown = (e: { key: any; }) => {
    if(e.key === ' '){
      switch (siteState){
        case 'initial':
          setTime(0) 
          setSiteState('holding')
          break;
        case 'running':
          setSiteState('finished')
          setTimerOn(false)
          break;
        case 'finished':
          setTime(0) 
          setSiteState('holding')
          break;        
      }
      
    }
  }  
  const detectKeyUp = (e: { key: any; }) => {
    if(e.key === ' '){
      if(siteState === 'holding'){
        setSiteState('running')
        setTimerOn(true)
      }
      
    }
  }  

  useEffect(()=>{
    document.addEventListener('keydown', detectKeyDown, true);
    document.addEventListener('keyup', detectKeyUp, true);
    return () => {
      document.removeEventListener('keydown', detectKeyDown, true);
      document.removeEventListener('keyup', detectKeyUp, true);
    }
  },[siteState])  

  return (
    <Flex w='100%' h='100%' align='center' justify='center' bg={design[siteState]}>
      {/* <Text>{time}</Text> */}
      <Flex>
        { time > 60000 &&
          <Text 
            fontWeight='black' 
            fontSize='3xl' 
            // color={siteState==='finished'? 'green.600' : 'black'}
          >
            {("0" + Math.floor((time / 60000) % 600)).slice(-2)}:
          </Text>      
        }
        <Text 
          fontWeight='black' 
          fontSize='3xl' 
          // color={siteState==='finished'? 'green.600' : 'black'}
        >
          {("0" + Math.floor((time / 1000) % 60)).slice(-2)}:
        </Text>
        <Text 
          fontWeight='black' 
          fontSize='3xl' 
          // color={siteState==='finished'? 'green.600' : 'black'}
        >
          {("0" + ((time / 10) % 100)).slice(-2)}
        </Text>
      </Flex>
    </Flex>
  )
}

