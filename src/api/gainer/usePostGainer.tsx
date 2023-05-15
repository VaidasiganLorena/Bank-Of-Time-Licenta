import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { IGainerUpdate } from '../../type'

export type IErrorRegister = {
  response: string
  status: number
}
export const usePostGainer = (
  successCallBack: (data: string, status: number) => void,
  errorCallBack: (data: IErrorRegister) => void,
) => {
  return useMutation(
    (dataGainer: IGainerUpdate) => axios.post('http://localhost:3306/newgainer', dataGainer),
    {
      onSuccess: (data) => {
        successCallBack(data.data.response, data.data.status)
      },
      onError: (error: any) => errorCallBack(error?.response.data),
    },
  )
}
