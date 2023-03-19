import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { TInfoUser } from '../Components/personalData/AvaibleFormPersonalData'

export const useUpdateInfoUser = (
  successCallBack: (data: string, status: number) => void,
  userUuid: string | null,
  authToken: string | null,
) => {
  let config = {
    headers: { authToken: authToken },
  }
  const myAccount: string = `http://localhost:3306/user/update/${userUuid}`
  return useMutation((dataMyAccount: TInfoUser) => axios.put(myAccount, dataMyAccount, config), {
    onSuccess: (data) => {
      successCallBack(data.data.response, data.data.status)
    },
  })
}
