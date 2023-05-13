import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import queryString from 'query-string'
import { store } from '../../Redux/store'

export const useGetGainersFilter = () => {
  const state = store.getState()
  const query = queryString.stringify(state.filters)
  const gainersFilter: string = `${'http://localhost:3306/gainers/filter'}?${query}`
  return useQuery(
    ['http://localhost:3306/gainers/filter', query],
    () => axios.get<any>(gainersFilter),
    {
      retry: false,
    },
  )
}
