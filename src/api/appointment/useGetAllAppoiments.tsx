import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useGetAllAppointment = (successCallBack: (data: any) => void) => {
  return useQuery([], () => axios.get(`http://localhost:3306/appointments/`), {
    retry: false,
    staleTime: 18 * 100000,
    onSuccess: (data) => {
      successCallBack(data)
    },
  })
}
