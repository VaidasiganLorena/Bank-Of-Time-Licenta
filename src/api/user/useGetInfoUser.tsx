import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useGetInfoUser = (successCallBack: (data: any) => void, userUuid?: string | null) => {
  const authToken = sessionStorage.getItem('userToken')
  let config = {
    headers: { authToken: authToken },
  }
  return useQuery(
    ['get-info-user-key'],
    () => axios.get(`http://localhost:3306/user/${userUuid}`, config),
    {
      retry: false,
      staleTime: 18 * 100000,
      onSuccess: (data) => {
        successCallBack(data)
      },
    },
  )
}
