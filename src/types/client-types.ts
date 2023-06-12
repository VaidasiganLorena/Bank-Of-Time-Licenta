export interface IClientsResponse {
  data: {
    code: number
    message: string
    response: IClient[]
    entries: number
    pages: number
  }
}
export interface IClient {
  clientUuid?: string
  userUuid: string
  fiscalCode: string
  name: string
  email: string
  phoneNumber: string
  createDate: string
  lastUpdateDate: string
  workItemsNumber: number
  street: string
  city: string
  county: string
  streetNr: string
  idSeries: string
  idSeriesNumber: string
  building: string
  buildingNr: string
  apartment: string
  floor: string
}
export interface IClientForm {
  userUuid: string
  fiscalCode: string
  name: string
  email: string
  phoneNumber: string
  street: string
  city: string
  county: string
  streetNr: string
  idSeries: string
  idSeriesNumber: string
  building: string
  buildingNr: string
  apartment: string
  floor: string
}
