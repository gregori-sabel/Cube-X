import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  // config: {
  //   initialColorMode: 'light',
  //   useSystemColorMode: false,    
  // },
  fonts: {
    heading: 'Rubik, sans-serif',
    body: 'Rubik, sans-serif',
  },
  styles: {
    global: {
      'body': {
        // bg: 'white',
        // color: 'gray.900',
        height: '100%'
      },
      'html': {
        height: '100%'
      },
      'body > div:first-child': {
        height: '100%'
      },
      'div#__next': {
        height: '100%'
      },
      'div#__next > div': {
        height: '100%'
      },
    }
  },
})