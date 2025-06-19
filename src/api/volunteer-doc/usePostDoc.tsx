import { useMutation } from "@tanstack/react-query"
import axios from "axios"

export interface CreateVolunteerDocumentInput {
  volunteerName?: string
  eventName?: string
  organization?: string
  dateFrom?: string
  dateTo?: string
  role?: string
  validation?: string
  hours?: number
  responsabilities?: string
  skills?: string
  fileName?: string
  extractText?: string
  urlDoc?: string
  userUuid: string
}

export const usePostVolunteerDocument = (
  successCallBack: (data: any) => void,
  errorCallBack: (error: any) => void
) => {
  return useMutation(
    ["create-volunteer-document-key"],
    (data: CreateVolunteerDocumentInput) =>
      axios.post("http://localhost:8080/volunteer-document", data),
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
