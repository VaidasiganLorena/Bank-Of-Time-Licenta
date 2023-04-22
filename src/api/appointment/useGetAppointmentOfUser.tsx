import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useGetAppointment = (
  successCallBack: (data: any) => void,
  userUuid: string | null,
  authToken: string | null,
) => {
  let config = {
    headers: { authToken: authToken },
  }
  return useQuery(
    [`http://localhost:3306/appointment/${userUuid}`],
    () => axios.get(`http://localhost:3306/appointment/${userUuid}`, config),
    {
      retry: false,
      staleTime: 18 * 100000,
      onSuccess: (data) => {
        successCallBack(data)
      },
    },
  )
}
