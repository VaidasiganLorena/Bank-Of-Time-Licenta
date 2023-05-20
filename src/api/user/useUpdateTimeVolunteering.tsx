import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useUpdateTimeVolunteering = (
  successCallBack: (data: string, status: number) => void,
  userUuid: string | null,
) => {
  const pathUpdateTime: string = `http://localhost:3306/users/update/time-volunteering/${userUuid}`
  return useMutation((body: { timeVolunteering: number }) => axios.put(pathUpdateTime, body), {
    onSuccess: (data) => {
      successCallBack(data.data.response, data.data.status)
    },
  })
}
