export interface StudentTableRows {
  id: string
  name: string
  email: string
  whatsapp: string
  courses: number
  status: StudentStatusType
  testimonials: string[]
}

export type StudentStatusType = 'Certificate sent' | 'In progress' | 'Cancelled'
