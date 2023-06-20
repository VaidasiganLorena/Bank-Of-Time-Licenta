import { FunctionComponent } from 'react'
import { Navigate } from 'react-router-dom'
interface IProtectedRoute {
  children: JSX.Element
}
export const ProtectedRoute: FunctionComponent<IProtectedRoute> = ({ children }) => {
  const authToken = sessionStorage.getItem('userToken')
  if (!authToken) {
    return <Navigate to="/" replace />
  }
  return children
}
