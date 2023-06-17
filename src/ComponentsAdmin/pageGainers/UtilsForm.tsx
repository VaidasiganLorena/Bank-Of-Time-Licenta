import { Buffer } from 'buffer'
export const InitialValueDataGainers = {
  nameGainer: '',
  dateOfBirth: '',
  phoneNumberGainer: '',
  adress: '',
  cityGainer: '',
  genderGainer: '',
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
  genderGainer: (value: string) => (value.length < 2 ? 'Trebuie să alegeți genul' : null),
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
const decodeBase64 = (base64: string) => {
  const decodedString = Buffer.from(base64, 'base64').toString('binary')
  const byteNumbers = new Uint8Array(decodedString.length)
  for (let i = 0; i < decodedString.length; i++) {
    byteNumbers[i] = decodedString.charCodeAt(i)
  }
  return byteNumbers
}
const createBlob = (byteArray: BlobPart) => {
  return new Blob([byteArray], { type: 'image/png,image/jpeg' })
}

const createFile = (blob: BlobPart, fileName: string) => {
  return new File([blob], fileName)
}

export const base64ToFile = (base64: string, fileName: string) => {
  const byteArray = decodeBase64(base64)
  const blob = createBlob(byteArray)
  const file = createFile(blob, fileName)
  return file
}
