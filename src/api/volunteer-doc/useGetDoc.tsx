import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export interface VolunteerDocument {
  uuidDoc: string
  eventName: string | null
  organization: string | null
  dateFrom: string | null
  dateTo: string | null
  role: string | null
  validation: string | null
  hours: number | null
  responsabilities: string | null
  skills: string | null
  fileName: string | null
  extractText: string | null
  urlDoc: string | null
  createdAt: string | null
  userUuid: string
}

export const useGetVolunteerDocuments = (
  successCallBack: () => void,
  authToken: string | null
) => {
  let config = {
    headers: { authToken: authToken },
  }

  return useQuery(
    ["get-volunteer-documents-key"],
    () => axios.get(`http://localhost:8080/volunteer-document`, config),
    {
      retry: false,
      staleTime: 18 * 100000,
      onSuccess: () => {
        successCallBack()
      },
    }
  )
}
