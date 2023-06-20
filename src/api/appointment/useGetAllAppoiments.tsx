import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useGetAllAppointment = (
  successCallBack: (data: any) => void,
  authToken: string | null,
) => {
  let config = {
    headers: { authToken: authToken },
  }
  return useQuery(
    ['read-all-appointments-key'],
    () => axios.get(`http://localhost:3306/appointments/`, config),
    {
      retry: false,
      staleTime: 18 * 100000,
      onSuccess: (data) => {
        successCallBack(data)
      },
    },
  )
}
