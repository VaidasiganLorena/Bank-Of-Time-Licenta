import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useUpdateStatus = (
  successCallBack: (data: string, status: number) => void,
  appUuid: number,
) => {
  const pathUpdate: string = `http://localhost:3306/appointments/update/status/${appUuid}`
  return useMutation(
    ['update-status-key'],
    (body: { status: string }) => axios.put(pathUpdate, body),
    {
      onSuccess: (data) => {
        successCallBack(data.data.response, data.data.status)
      },
    },
  )
}
