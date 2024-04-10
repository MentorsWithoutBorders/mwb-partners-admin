import { useGetProjectDetails } from '@/lib/mentors/mentors-client'

const useMentorDetails = () => {
  const { data, isLoading, error } = useGetProjectDetails()
  return {
    data,
    isLoading,
    error
  }
}

export default useMentorDetails
