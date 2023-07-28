import { createTheme } from '@mui/material'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'] })

export const palette = {
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
  background: {
    paper: '#F9F9F9'
  },
  zircon: '#F1F4FF',
  mineShaft: '#232323',
  doveGray: '#6F6B6B',
  nobel: '#B5B5B5'
} as const

export const theme = createTheme({
  palette,
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
