// IN PROD we use only official BE link, not localhost
export const baseUrl: string = 'https://topo-crm-backend-v2-dev.azurewebsites.net/api/v1' as string
export const loginUrl = baseUrl.concat('/login')
export const clientsUrl = baseUrl.concat('/clients')
export const clientsUrlCreate = baseUrl.concat('/clients/new')
export const clientsUrlUpdate = baseUrl.concat('/clients/update')
export const clientsUrlDelete = baseUrl.concat('/clients/delete')

export const workItemsUrl = baseUrl.concat('/workitems')
export const workItemsUrlDetails = baseUrl.concat('/workitems/details')
export const workItemsUrlCreate = baseUrl.concat('/workitems/new')
export const workItemsUrlUpdate = baseUrl.concat('/workitems/update')
export const workItemsUrlDelete = baseUrl.concat('/workitems/delete')

export const employeesUrl = baseUrl.concat('/employees')
export const employeesUrlCreate = baseUrl.concat('/employees/new')
export const employeesUrlUpdate = baseUrl.concat('/employees/update')
export const employeesUrlDelete = baseUrl.concat('/employees/delete')

export const assignResponsableUrl = baseUrl.concat('/workitems/assign')
export const conventionUrl = baseUrl.concat('/workitems/convention')

export const inventoryUrl = baseUrl.concat('/inventory')
export const inventoryUrlCreate = baseUrl.concat('/inventory/new')
export const inventoryUrlUpdate = baseUrl.concat('/inventory/update')
export const inventoryUrlDelete = baseUrl.concat('/inventory/delete')

export enum RoutesOptions {
  LOGIN = '/login',
  ROOT = '/',
  CLIENTS = '/clienti',
  WORKITEMS = '/lucrari/',
  WORKITEMS_DETAILS = '/lucrari/:workItemUuid/',
  EMPLOYEES = '/angajati',
  INVENTORY = '/inventar',
  PROFILE = '/profil',
  LOGOUT = '/logout',
}
export enum Mode {
  VIEW = 'view',
  EDIT = 'edit',
  ADD = 'add',
}

export const maxWidthTablet = '(max-width: 62em)'
export const maxWidthLaptopSmall = '(max-width: 80em)'
export const maxWidthMobile = '(max-width: 39em)'
export const maxWidthMobileSmall = '(max-width: 23em)'
export const maxWidthMobileMedium = '(max-width: 26em)'
export const minWidthLaptop = '(min-width: 100em)'
export const regexSearch = /[^\w ]/g

export const StatusDocumentsEnum = {
  MISSING: 'Lipsă',
  RECEIVED: 'Primit',
}

export const limitPage = 15
export const convertEurToRon = 4.95555
export const pdfNeincarcat = `${window.document.location.origin}/fisierNeincarcat.pdf`
export const yearsRGI = [
  '2023',
  '2022',
  '2021',
  '2020',
  '2019',
  '2018',
  '2017',
  '2016',
  '2015',
  '2014',
  '2013',
  '2012',
  '2011',
  '2010',
  '2009',
  '2008',
  '2007',
  '2006',
]
