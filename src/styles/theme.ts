import { createTheme } from '@mui/material'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'] })

export const theme = createTheme({
  palette: {
    primary: {
      main: '#0046CF'
    },
    secondary: {
      main: '#0A0047'
    },
    text: {
      primary: '#000',
      secondary: '#989595'
    },
    zircon: '#F1F4FF',
    mineShaft: 'Mine Shaft'
  },
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
        root: ({ theme }) => ({
          backgroundColor: 'white',
          boxShadow: 'none',
          color: theme.palette.secondary.main
        })
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: ({ theme }) => ({
          backgroundColor: theme.palette.secondary.main,
          color: 'white'
        })
      }
    }
  }
})
