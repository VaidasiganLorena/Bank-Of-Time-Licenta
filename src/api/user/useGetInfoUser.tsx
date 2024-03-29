import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const useGetInfoUser = (successCallBack: (data: any) => void, userUuid?: string | null) => {
  const authToken = sessionStorage.getItem('userToken')
  let config = {
    headers: { authToken: authToken },
  }
  const navigate = useNavigate()
  return useQuery(
    ['get-info-user-key'],
    () => axios.get(`http://localhost:3306/user/${userUuid}`, config),
    {
      retry: false,
      staleTime: 18 * 100000,
      onSuccess: (data) => {
        if (data.status) {
          successCallBack(data)
        } else if (data.status === 401) {
          navigate('/login')
        }
      },
    },
  )
}
