import { createTheme } from '@mui/material'
import type {} from '@mui/x-data-grid/themeAugmentation'
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
  success: {
    main: '#0FBA00'
  },
  error: {
    main: '#FF0000'
  },
  warning: {
    main: '#F49300'
  },
  zircon: '#F1F4FF',
  mineShaft: '#232323',
  doveGray: '#6F6B6B',
  nobel: '#B5B5B5',
  mariner: '#1D54E1',
  dustyGray: '#a29898',
  azureish: '#E0E8F8'
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
    },
    MuiDataGrid: {
      defaultProps: {
        rowSelection: false,
        disableColumnMenu: true
      },
      styleOverrides: {
        root: {
          borderRadius: 24,
          // borderColor: palette.doveGray,
          backgroundColor: 'white',
          overflow: 'hidden'
        },
        virtualScroller: {
          minHeight: 300
        },
        withBorderColor: {
          // borderColor: palette.doveGray
        },
        columnHeader: {
          paddingLeft: 24,
          paddingRight: 24,
          ':focus': {
            outline: 'none'
          }
        },
        cell: {
          borderBottomStyle: 'none',
          paddingLeft: 24,
          paddingRight: 24,
          ':focus': {
            outline: 'none'
          }
        }
      }
    }
  }
})
