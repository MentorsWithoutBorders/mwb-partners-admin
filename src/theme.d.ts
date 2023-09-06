import { PaletteOptions, Theme, ThemeOptions } from '@mui/material/styles'

import { palette } from './styles/theme'

type CustomPalette = PaletteOptions & typeof palette

interface CustomTheme extends Theme {
  palette: CustomPalette
}
interface CustomThemeOptions extends ThemeOptions {
  palette?: CustomPalette
}
declare module '@mui/material/styles' {
  export function createTheme(options?: CustomThemeOptions): CustomTheme
  export function useTheme(): CustomTheme
}

declare module '@emotion/react' {
  export interface Theme extends CustomTheme {}
}
