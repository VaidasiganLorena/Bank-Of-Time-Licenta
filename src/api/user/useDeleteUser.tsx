import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
export type IDeleteAuth = {
  userUuid: string | null
  authToken: string | null
}
export const useDeleteUser = (
  successCallBack: (data: any) => void,
  errorCallBack: (data: any) => void,
) => {
  const queryClient = useQueryClient()
  return useMutation(
    ['delete-user-key'],
    (auth: IDeleteAuth) =>
      axios.delete(`http://localhost:3306/user/${auth.userUuid}`, {
        headers: {
          authToken: auth.authToken,
        },
      }),
    {
      onSuccess: (data) => {
        successCallBack(data.data.response)
        return queryClient.invalidateQueries({ queryKey: ['login-key'] })
      },
      onError: (error: any) => errorCallBack(error?.response.data),
    },
  )
}
