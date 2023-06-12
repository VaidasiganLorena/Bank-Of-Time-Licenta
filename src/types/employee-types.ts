export interface IEmployeesResponse {
  data: {
    code: number
    message: string
    response: IEmployee[]
    entries: number
    pages: number
  }
}
export interface IEmployee {
  employeeUuid?: string
  managerUuid: string
  name: string
  email: string
  role: string
  createDate?: string
}
