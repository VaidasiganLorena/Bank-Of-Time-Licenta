import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export type IErrorRegister = {
  response: string
  status: number
}
export const usePostRegister = (
  successCallBack: (data: string, status: number) => void,
  errorCallBack: (data: IErrorRegister) => void,
) => {
  return useMutation(
    (dataRegistration: {
      firstName: string
      lastName: string
      email: string
      phoneNumber: string
      password: string
      city: string
      gender: string
    }) => axios.post('http://localhost:3306/user/register', dataRegistration),
    {
      onSuccess: (data) => {
        successCallBack(data.data.response, data.data.status)
      },
      onError: (error: any) => errorCallBack(error?.response.data),
    },
  )
}
