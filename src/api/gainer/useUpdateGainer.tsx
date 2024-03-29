import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { IGainerUpdate } from '../../types/typeGainer'

export const useUpdateInfoGainer = (
  successCallBack: (data: string, status: number) => void,
  gainerUuid?: string,
) => {
  const urlUpdate: string = `http://localhost:3306/gainer/update/${gainerUuid}`
  return useMutation(
    ['rupdate-gainer-key'],
    (dataGainer: IGainerUpdate) => axios.put(urlUpdate, dataGainer),
    {
      onSuccess: (data) => {
        successCallBack(data.data.response, data.data.status)
      },
    },
  )
}
