import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { store } from '../../Redux/store'

export const useGetGainersFilter = () => {
  const state = store.getState()
  //@ts-ignore
  const query = new URLSearchParams(state.filters).toString()
  const gainersFilter: string = !query
    ? 'http://localhost:3306/gainers'
    : `${'http://localhost:3306/gainers'}?${query}`
  return useQuery(['Gainers', query], () => axios.get<any>(gainersFilter), {
    retry: false,
  })
}
