import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useGetGainerAllAppointment = (
  successCallBack: (data: any) => void,
  gainerUuid?: string,
) => {
  return useQuery(
    [['read-all-gainer-key']],
    () => axios.get(`http://localhost:3306/gainer-appointments/${gainerUuid}`),
    {
      retry: false,
      staleTime: 18 * 100000,
      onSuccess: (data) => {
        successCallBack(data.data.response)
      },
    },
  )
}
