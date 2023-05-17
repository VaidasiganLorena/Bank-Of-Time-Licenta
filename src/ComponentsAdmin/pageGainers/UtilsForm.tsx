export const InitialValueDataGainers = {
  nameGainer: '',
  dateOfBirth: '',
  phoneNumberGainer: '',
  adress: '',
  cityGainer: '',
  gender: '',
  photoGainer: '',
  listOfDates: '',
  description: '',
  helpTypeUuid: '',
  gainerUuid: '',
}

export const ValidateForm = {
  nameGainer: (value: string) =>
    value.length < 2 ? 'Numele trebuie să conțină cel puțin 2 caractere' : null,
  dateOfBirth: (value: string) => (value === '' ? 'Data nașterii nu poate fi necunoscută' : null),
  phoneNumberGainer: (value: string) => {
    return /^(02|03|07)\d{8}$/.test(value) && value.length > 0 ? null : 'Număr de telefon invalid!'
  },
  adress: (value: string) =>
    value.length < 5 ? 'Adresa trebuie să conțină cel puțin 5 caractere' : null,
  gender: (value: string) => (value.length < 2 ? 'Trebuie să alegeți genul' : null),
  listOfDates: (value: string) =>
    value.length < 2 ? 'Lista cu date trebuie să conțină cel putin o dată' : null,
  description: (value: string) =>
    value.length < 50 ? 'Descrierea trebuie să conțină cel puțin 50 de caractere' : null,
  helpTypeUuid: (value: string) =>
    value === '' ? 'Este necesar să alegeți tipul de ajutor' : null,
}

export const convertBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = () => {
      resolve(fileReader.result)
    }
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}