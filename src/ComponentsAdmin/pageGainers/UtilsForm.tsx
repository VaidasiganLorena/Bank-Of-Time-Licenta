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
  nameHelpType: '',
}

export const ValidateForm = {
  nameGainer: (value: string) =>
    value.length < 2 ? 'Numele trebuie să conțină cel puțin 2 caractere' : null,
  dateOfBirth: (value: string) => (value === '' ? 'Data nașterii nu poate fi necunoscută' : null),
  phoneNumberGainer: (value: string) =>
    value.length < 2 ? 'Numărul de telefon nu respectă formatul' : null,
  adress: (value: string) =>
    value.length < 5 ? 'Adresa trebuie să conțină cel puțin 5 caractere' : null,
  gender: (value: string) => (value.length < 2 ? 'Trebuie să alegeți genul' : null),
  listOfDates: (value: string) =>
    value.length < 2 ? 'Lista cu date trebuie să conțină cel putin o dată' : null,
  description: (value: string) =>
    value.length < 2 ? 'Descrierea trebuie să conțină cel puțin 50 de caractere' : null,
  helpTypeUuid: (value: string) =>
    value === '' ? 'Este necesar să alegeți tipul de ajutor' : null,
}
