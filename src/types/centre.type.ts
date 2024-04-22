export interface Centre {
  id: number
  name: string
  country: number | null
  manager: number | null
  status: string | null
}

export type CenterStatus = 'Up to date' | 'In progress'
