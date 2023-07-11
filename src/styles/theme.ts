import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'] })

export const theme = createTheme({
  typography: {
    fontFamily: montserrat.style.fontFamily
  },
  components: {
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'inherit'
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
          boxShadow: 'none',
          color: '#0A0047'
        }
      }
    }
  }
})
