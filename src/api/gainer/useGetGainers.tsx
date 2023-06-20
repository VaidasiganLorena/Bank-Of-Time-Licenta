import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useGetInfoGainers = (
  successCallBack: (data: any) => void,
  authToken: string | null,
) => {
  let config = {
    headers: { authToken: authToken },
  }
  return useQuery(['get-gainers-key'], () => axios.get(`http://localhost:3306/gainers`, config), {
    retry: false,
    onSuccess: (data) => {
      successCallBack(data)
    },
  })
}
