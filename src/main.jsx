import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, extendTheme, ColorModeScript } from '@chakra-ui/react'
import App from './App'
import './index.css'

// Fonts
import '@fontsource/inter/400.css'
import '@fontsource/inter/600.css'
import '@fontsource/rajdhani/600.css'
import '@fontsource/rajdhani/700.css'
import '@fontsource/space-grotesk/400.css'

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false
  },
  colors: {
    brand: {
      primary: '#4F46E5',
      secondary: '#6366F1'
    }
  },
  fonts: {
    heading: "'Rajdhani', sans-serif",
    body: "'Inter', sans-serif",
    mono: "'Space Grotesk', monospace"
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'dark' ? '#0F172A' : '#F5F7FA',
        color: props.colorMode === 'dark' ? '#E5E7EB' : '#111827'
      }
    })
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
)
