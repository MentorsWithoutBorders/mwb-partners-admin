export interface Centre {
  id: number
  name: string
  organization_id: number | null
  address: string | null
}
export interface CenterTableEntry {
  id: number
  name: string
  country: number | null
  manager: number | null
  status: string | null
}

export type CenterStatus = 'Up to date' | 'In progress'
