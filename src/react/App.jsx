import React from 'react'

import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'

import { CssBaseline } from '@mui/material'

import { createTheme, ThemeProvider } from '@mui/material/styles'

import AppLayout from './AppLayout'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      light: '#28278a',
      main: '#1e1c87',
      dark: '#1b1a55',
      contrastText: '#cac7fc'
    },
    secondary: {
      light: '#626d99',
      main: '#3e5094',
      dark: '#3e5094',
      contrastText: '#cac7fc'
    },
    background: {
      default: '#070f2b',
      paper: '#1b1a55'
    },
    text: {
      primary: '#cac7fc',
      secondary: '#9290c3'
    }
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',
    h4: {
      fontWeight: 600
    },
    body1: {
      fontSize: '1rem'
    }
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: defaultTheme => ({
        html: {
          width: '100%',
          height: '100%'
        },
        body: {
          width: '100%',
          height: '100%',
          background: defaultTheme.palette.grey[200]
        },
        '#app': {
          width: '100%',
          height: '100%'
        }
      })
    }
  }
})

const container = document.getElementById('app')
const root = createRoot(container)
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
      <AppLayout />
    </Router>
  </ThemeProvider>
)
