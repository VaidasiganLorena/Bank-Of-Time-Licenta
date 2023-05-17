import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
export type IDeleteAuth = {
  gainerUuid: string | null
}
export const useDeleteGainer = (
  successCallBack: (data: any) => void,
  errorCallBack: (data: any) => void,
) => {
  const queryClient = useQueryClient()
  return useMutation(
    (auth: IDeleteAuth) => axios.delete(`http://localhost:3306/gainer/${auth.gainerUuid}`),
    {
      onSuccess: (data) => {
        successCallBack(data.data.response)
        return queryClient.invalidateQueries({ queryKey: ['login-key'] })
      },
      onError: (error: any) => errorCallBack(error?.response.data),
    },
  )
}
