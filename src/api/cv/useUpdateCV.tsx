import { useMutation } from "@tanstack/react-query"
import axios from "axios"

export interface CVData {
  personalInfo: {
    name: string
    email: string
    phone: string
    location: string
  }
  summary: string
  volunteerExperience: Array<{
    organization: string
    role: string
    period: string
    description: string
    skills: string[]
    hours: number
  }>
  skills: string[]
  achievements: string[]
  totalHours: number
  totalActivities: number
}

export const useUpdateCV = (
  successCallBack: (data: string, status: number) => void,
  errorCallBack: (error: any) => void,
  userUuid: string | null
) => {
  const authToken = sessionStorage.getItem("userToken")
  let config = {
    headers: { authToken: authToken },
  }

  const cvEndpoint: string = `http://localhost:8080/user/update/cv/${userUuid}`

  return useMutation(
    ["update-cv-key"],
    (cvData: CVData) => {
      const cvJsonString = JSON.stringify(cvData)

      return axios.put(cvEndpoint, { cv: cvJsonString }, config)
    },
    {
      onSuccess: (data) => {
        successCallBack(data.data.response, data.data.status)
      },
      onError: (error: any) => {
        errorCallBack(error?.response?.data || error)
      },
    }
  )
}
