import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useGetAppointmentComplete = (userUuid: string | null, authToken: string | null) => {
  let config = {
    headers: { authToken: authToken },
  }
  return useQuery(
    ['read-applointmentComplete-key'],
    () => axios.get(`http://localhost:3306/appointments-complete/${userUuid}`, config),
    {
      retry: false,
      staleTime: 18 * 100000,
      onSuccess: (data) => {
        return data.data.response
      },
    },
  )
}
