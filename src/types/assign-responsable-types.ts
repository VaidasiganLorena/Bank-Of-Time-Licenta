export interface IAssignResponsableResponse {
  data: {
    code: number
    message: string
    response: IAssignResponsable[]
    entries: number
    pages: number
  }
}
export interface IAssignResponsable {
  userUuid: string
  workItemUuid: string
  responsable: string
}
