import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useGetAppointmentAll = (userUuid: string | null, authToken: string | null) => {
  let config = {
    headers: { authToken: authToken },
  }
  return useQuery(
    ['read-applointmentall-key'],
    () => axios.get(`http://localhost:3306/appointments-all/${userUuid}`, config),
    {
      retry: false,
      staleTime: 18 * 100000,
      onSuccess: (data) => {
        return data.data.response
      },
    },
  )
}
