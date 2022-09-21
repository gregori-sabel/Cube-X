import { Flex, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

type SiteState = 'initial'|'holding'|'running'|'finished'

interface SiteStateProps{
  siteState: SiteState,
  setSiteState(state: SiteState): void
}

export default function Timer({ setSiteState, siteState}: SiteStateProps){ 
  const [ time, setTime ] = useState(0)
  const [ timerOn, setTimerOn ] = useState(false)

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
      <Flex
        fontWeight='black' 
        // fontSize='3xl' 
        transition=' 0.2s ease-in-out'
        // fontSize={Math.min(200, 30+(time/1000))+'px'} 
        // marginTop={Math.max(-100, (-1*(50+(time/1000))/4)) +'px'}
        fontSize='24px' 
        marginTop='12px'
        // _hover={{
        //   fontSize: Math.min(300, 50+(time/1000))+'px',
        //   marginTop: Math.max(-100, (-1*(50+(time/1000))/4)) +'px'
        // }}      
      >      
          { time > 60000 &&
            <Text>
              {("0" + Math.floor((time / 60000) % 600)).slice(-2)}:
            </Text>      
          }
          <Text>
            {("0" + Math.floor((time / 1000) % 60)).slice(-2)}:
          </Text>
          <Text>
            {("0" + ((time / 10) % 100)).slice(-2)}
          </Text>
      </Flex>

  )
}

