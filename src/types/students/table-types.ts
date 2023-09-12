export interface StudentTableRows {
  id: string
  name: string
  email: string
  whatsapp: string
  courses: number
  status: 'Certificate sent' | 'In progress' | 'Cancelled'
  testimonials: string[]
}
