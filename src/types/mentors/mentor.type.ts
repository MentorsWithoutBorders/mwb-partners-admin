export interface Mentor {
  id: string
  name: string
  email: string
  courses: number
  students: number
  hours: number
}

export interface MentorDetails {
  id: string
  name: string
  email: string
  courses: {
    id: string
    startDate: string
    canceledDate: string | null
    duration: 3 | 6
    completedHours: number
    project: {
      id: string
      name: string
    } | null
    students: {
      id: string
      name: string
      email: string
      testimonials: {
        id: string
        url: string
        uploadDate: string
      }[]
    }[]
  }[]
}
