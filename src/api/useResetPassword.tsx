import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useResetPassword = (successCallBack: (data: string) => void) => {
  return useMutation(
    (dataReset: { email: string }) => axios.post('http://localhost:3306/forgotPassword', dataReset),
    {
      onSuccess: (data) => {
        successCallBack(data.data.response)
      },
    },
  )
}
