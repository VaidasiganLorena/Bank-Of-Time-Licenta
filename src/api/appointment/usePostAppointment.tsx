import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export type IErrorRegister = {
  response: string
  status: number
}
export const usePostAppointment = (
  successCallBack: (data: string, status: number) => void,
  errorCallBack: (data: IErrorRegister) => void,
) => {
  return useMutation(
    (dataAppointment: {
      userUuid: string
      gainerUuid: string
      dateOfAppointment: string
      status: string
    }) => axios.post('http://localhost:3306/appointment', dataAppointment),
    {
      onSuccess: (data) => {
        successCallBack(data.data.response, data.data.status)
      },
      onError: (error: any) => errorCallBack(error?.response.data),
    },
  )
}
