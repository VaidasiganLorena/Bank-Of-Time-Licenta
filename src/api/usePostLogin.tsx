import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export type IErrorRegister = {
  response: string
  status: number
}
export const usePostLogin = (
  successCallBack: (data: string, status: number) => void,
  errorCallBack: (data: IErrorRegister) => void,
) => {
  return useMutation(
    (dataLogin: { email: string; password: string }) =>
      axios.post('http://localhost:3306/user/login', dataLogin),
    {
      onSuccess: (data) => {
        successCallBack(data.data.response, data.data.status)
      },
      onError: (error: any) => errorCallBack(error?.response.data),
    },
  )
}
