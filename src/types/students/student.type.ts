export type StudentCertificationStatus =
  | 'SENT'
  | 'IN_PROGRESS'
  | 'CANCELLED'
  | 'UNKNOWN'

export interface Student {
  id: string
  email: string
  name: string
  phoneNumber?: number
  certificationStatus: StudentCertificationStatus
  organizationName: string
  testimonials: {
    url: string
    uploadedDateTime: string
  }[]
  totalCoursesAttended: number
}
