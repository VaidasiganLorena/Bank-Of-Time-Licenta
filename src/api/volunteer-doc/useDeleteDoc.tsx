import { useMutation } from "@tanstack/react-query"
import axios from "axios"

export const useDeleteVolunteerDocument = (
  successCallBack: (data: any) => void,
  errorCallBack: (error: any) => void
) => {
  return useMutation(
    ["delete-volunteer-document-key"],
    (documentUuid: string) =>
      axios.delete(`http://localhost:8080/volunteer-document/${documentUuid}`),
    {
      onSuccess: (data) => {
        successCallBack(data)
      },
      onError: (error) => {
        errorCallBack(error)
      },
    }
  )
}
