import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useUpdateListOfDates = (
  successCallBack: (data: string, status: number) => void,
  gainerUuid: string | null,
) => {
  const myAccount: string = `http://localhost:3306/gainer/update/list-of-dates/${gainerUuid}`
  return useMutation((body: { listOfDates: string }) => axios.put(myAccount, body), {
    onSuccess: (data) => {
      successCallBack(data.data.response, data.data.status)
    },
  })
}
