import { Flex, Text, Tooltip } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { SiteState } from '../pages'


interface SiteStateProps{
  siteState: SiteState,
  setSiteState(state: SiteState): void,
  addNewResult(newResult: number): void,
  formatTime(time:number): string,
}

export default function Timer({ setSiteState, siteState, addNewResult, formatTime }: SiteStateProps){ 
  const [ time, setTime ] = useState(0)
  const [ holdingTime, setHoldingTime ] = useState(0)
  const [ timerOn, setTimerOn ] = useState(false)
  let initialTime = 0
  let currentTime = 0

  useEffect(()=>{
    let interval: (NodeJS.Timer | null) = null;

    if(timerOn){
      // eslint-disable-next-line react-hooks/exhaustive-deps
      initialTime = new Date().getTime()
      interval = setInterval(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        currentTime = new Date().getTime()
        setTime(currentTime - initialTime )
        // setTime(prevTime => prevTime + 10 )
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
          setHoldingTime(new Date().getMilliseconds())
          setSiteState('holding')
          break;
        case 'running':
          setSiteState('finished')          
          setTimerOn(false)
          break;
        case 'finished':
          setTime(0) 
          initialTime = 0
          currentTime = 0
          setHoldingTime(new Date().getTime())
          setSiteState('holding')
          break;        
      }
      
    }
  }  
  const detectKeyUp = (e: { key: any; }) => {
    if(e.key === ' '){
      if(siteState === 'holding'){           
        //this makes the user wait a little in space-bar 
        if(holdingTime < (new Date().getTime() - 500)){
          setSiteState('running')
          setTimerOn(true)
        } else {          
          setSiteState('finished')          
          setTimerOn(false)
        }
      }
      
    }
  }  

  function saveNewResult(){
    if(siteState === 'finished'){
      addNewResult(time)
    }    
  }


  useEffect(()=>{
    saveNewResult()

    document.addEventListener('keydown', detectKeyDown, true);
    document.addEventListener('keyup', detectKeyUp, true);
    return () => {
      document.removeEventListener('keydown', detectKeyDown, true);
      document.removeEventListener('keyup', detectKeyUp, true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[siteState])  

  return (
      <Flex
        fontWeight='black' 
        // fontSize='3xl' 
        transition=' 0.2s ease-in-out'
        // fontSize={Math.min(200, 30+(time/1000))+'px'} 
        // marginTop={Math.max(-100, (-1*(50+(time/1000))/4)) +'px'}
        fontSize='40px' 
        marginTop='20px'
        // _hover={{
        //   fontSize: Math.min(300, 50+(time/1000))+'px',
        //   marginTop: Math.max(-100, (-1*(50+(time/1000))/4)) +'px'
        // }}      
      >      
        <Tooltip label='Segure espaço para começar' placement='top'>
          <Text 
            // _after={ siteState === 'initial' ? {
            //   content:`'[ Espaço ]'`,
            //   width: '200px',
            //   fontSize: '18px',
            //   fontWeight: 'light',
            //   position: 'absolute',
            //   top: '80px',
            //   left: '25px'
            // }: { }}
          >
            {formatTime(time)}
          </Text>
        </Tooltip >
      </Flex>

  )
}

