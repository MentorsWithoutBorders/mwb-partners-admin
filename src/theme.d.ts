import { PaletteOptions, Theme, ThemeOptions } from '@mui/material/styles'

interface CustomPalette extends PaletteOptions {
  zircon?: string
  mineShaft?: string
}

declare module '@mui/material/styles' {
  interface CustomTheme extends Theme {
    palette: CustomPalette
  }
  interface CustomThemeOptions extends ThemeOptions {
    palette?: CustomPalette
  }

  export function createTheme(options?: CustomThemeOptions): CustomTheme
  export function useTheme(): CustomTheme
}
