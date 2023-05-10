import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useSendMail = (successCallBack: (data: string) => void) => {
  return useMutation(
    (dataMail: {
      email: string
      adress: string
      firstName: string
      nameGainer: string
      dateOfAppointment: string
      cityGainer: string
    }) => axios.post('http://localhost:3306/mailAppointment', dataMail),
    {
      onSuccess: (data) => {
        successCallBack(data.data.response)
      },
    },
  )
}
