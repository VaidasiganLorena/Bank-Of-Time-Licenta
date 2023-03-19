import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useGetInfoGainers = (successCallBack: (data: any) => void) => {
  return useQuery(
    [`http://localhost:3306/gainers`],
    () => axios.get(`http://localhost:3306/gainers`),
    {
      retry: false,
      onSuccess: (data) => {
        successCallBack(data)
      },
    },
  )
}
