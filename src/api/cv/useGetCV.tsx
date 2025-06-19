import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const useGetCV = (
  successCallBack: (data: any) => void,
  userUuid: string | null
) => {
  const authToken = sessionStorage.getItem("userToken")

  let config = {
    headers: { authToken: authToken },
  }

  return useQuery(
    ["get-cv-key"],
    () => axios.get(`http://localhost:8080/user/cv/${userUuid}`, config),
    {
      retry: false,
      staleTime: 18 * 100000,
      enabled: !!userUuid && !!authToken,
      onSuccess: (data) => {
        successCallBack(data)
      },
    }
  )
}
