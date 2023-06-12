export interface IWorkItemsResponse {
  data: {
    code: number
    message: string
    response: IWorkItem[]
    entries: number
    pages: number
  }
}

export interface IWorkItemsResponseDetails {
  data: {
    code: number
    message: string
    response: IWorkItem
    entries: number
    pages: number
  }
}

export interface IDocument {
  filename: string
  content: string
}

export interface IWorkItem {
  workItemUuid: string
  name: string
  clientUuid?: string
  createDate: string
  lastUpdateDate: string
  workItemType: string
  responsable: string
  county: string
  city: string
  status: string
  deadline: string | null
  cfDoc: IDocument
  identityDoc: IDocument
  padDoc: IDocument
  otherDocs: IDocument[] | string
  currency: 'RON'
  advancePayment: number
  restPayment: number
  totalPayment: number
  taxes: number
  userUuid: string | null
  nrUAT: string
  nrCF: string
  typeCF: string
  street: string
  streetNr: string
  building: string
  buildingNr: string
  apartment: string
  floor: string
}
export interface IWorkItemForm {
  name: string
  clientUuid?: string
  workItemType: string
  responsable: string
  county: string
  city: string
  status: string
  deadline: string | null
  cfDoc: string | null
  identityDoc: string | null
  padDoc: string | null
  otherDocs: string | null
  advancePayment: number
  restPayment: number
  totalPayment: number
  taxes: number
  currency: 'RON'
  userUuid: string | null
  nrUAT: string
  nrCF: string
  typeCF: string
  street: string
  streetNr: string
  building: string
  buildingNr: string
  apartment: string
  floor: string
}
