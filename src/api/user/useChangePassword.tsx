import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useChangePassword = (
  successCallBack: (data: string, status: number) => void,
  userUuid: string | null,
  authToken: string | null,
) => {
  let config = {
    headers: { authToken: authToken },
  }
  const myPasswordUrl: string = `http://localhost:3306/user/change-password/${userUuid}`
  return useMutation(
    ['change-password-key'],
    (newPassword: any) => axios.put(myPasswordUrl, newPassword, config),
    {
      onSuccess: (data) => {
        successCallBack(data.data.response, data.data.status)
      },
    },
  )
}
