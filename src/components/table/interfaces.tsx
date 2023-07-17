export interface Column {
  id: string
  label: string
  minWidth?: number
  align?: 'right' | 'center' | 'left'
  format?: (value: number) => string
}

export interface APIListResponse {
  results: any
  count: number
}

export type OrderType = 'asc' | 'desc'
