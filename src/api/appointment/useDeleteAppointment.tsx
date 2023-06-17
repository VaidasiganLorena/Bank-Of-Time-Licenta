import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useDeleteAppointment = (
  successCallBack: (data: any) => void,
  errorCallBack: (data: any) => void,
  appointmentUuid: number,
) => {
  return useMutation(
    ['delete-appointment-key'],
    () => axios.delete(`http://localhost:3306/appointment/delete/${appointmentUuid}`, {}),
    {
      onSuccess: (data) => {
        successCallBack(data.data.response)
      },
      onError: (error: any) => errorCallBack(error?.response.data),
    },
  )
}
