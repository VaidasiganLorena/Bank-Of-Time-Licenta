import React, { FunctionComponent, useRef, useState } from 'react'
import { useForm } from '@mantine/form'
import { Autocomplete, Button, Group, Loader, Select, TextInput, createStyles } from '@mantine/core'
import { cities } from '../../aseert/city'
import { useUpdateInfoUser } from '../../api/useUpdateInfoUser'

const useStyles = createStyles((theme: any) => ({
  form: {
    backgroundColor: theme.colors.background[0],
    paddingTop: 15,
    borderRadius: 30,
    width: '100%',
    height: 500,
    margin: 15,

    [theme.fn.smallerThan('xs')]: {
      marginBottom: 20,
      marginTop: 35,
    },
  },
  input: {
    backgroundColor: '#f3f5f7',
    width: '25vw',
    [theme.fn.largerThan(1800)]: {
      width: '15vw',
    },
    [theme.fn.smallerThan(1300)]: {
      width: '33vw',
    },
    [theme.fn.smallerThan(980)]: {
      width: '40vw',
    },
    [theme.fn.smallerThan('xs')]: {
      width: '70vw',
    },
  },

  saveButton: {
    marginTop: 30,
    width: '35%',
    backgroundColor: '#28886f',
    borderRadius: 10,
    [theme.fn.smallerThan('md')]: {
      width: 'auto',
    },
    '&:hover': {
      backgroundColor: '#144639',
    },
  },
  cancelButton: {
    marginTop: 30,
    width: '35%',
    borderRadius: 10,
    color: '#28886f',
    borderColor: '#28886f',
    [theme.fn.smallerThan('md')]: {
      width: 'auto',
    },
    '&:hover': {
      backgroundColor: '#d7e2dfa8',
    },
  },
}))

export type TInfoUser = {
  firstname: string
  lastname: string
  email: string
  numberPhone: string
  gender: string
  city: string
}

export const AvaibleFormPersonalData: FunctionComponent<{
  firstname: string
  lastname: string
  email: string
  numberPhone: string
  gender: string
  city: string
  setEditMode: any
}> = (props) => {
  const { firstname, lastname, email, numberPhone, gender, city, setEditMode } = props
  const { classes } = useStyles()
  const timeoutRef = useRef<number>(0)
  // const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [location, setLocation] = useState<string>('')
  const [validCity, setValidCity] = useState(true)
  const [errorCity, setErrorCity] = useState<string>('')

  const isValidCity: (location: string) => string = (location: string) => {
    return location.length < 3 ? 'Locația nu este validă!' : ''
  }
  const formPersonalData = useForm({
    initialValues: {
      firstname: firstname,
      lastname: lastname,
      email: email,
      numberPhone: numberPhone,
      city: city,
      gender: gender,
    },
    validate: {
      firstname: (value) =>
        value.length < 2 ? 'Prenumele trebuie sa contina cel putin 2 caractere' : null,
      lastname: (value) =>
        value.length < 2 ? 'Numele trebuie sa contina cel putin 2 caractere' : null,
      email: (value: string) =>
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) && value.length > 0
          ? null
          : 'Email invalid!',
      numberPhone: (value: string) => {
        return /^(07)\d{8}$/.test(value) && value.length > 1 ? null : 'Număr de telefon invalid!'
      },
      gender: (value: string) => (value.length !== 0 ? null : 'Nu uita să alegi genul.'),
    },
  })
  const userUuid = localStorage.getItem('userUuid')
  const authToken = localStorage.getItem('authToken')
  const succesCallBack = () => {
    // setEditMode(false)
  }
  const { mutate } = useUpdateInfoUser(succesCallBack, userUuid, authToken)
  const onSave = () => {
    console.log(validCity, city)
    if (formPersonalData.validate().hasErrors === false && validCity === true) {
      mutate({
        firstname: formPersonalData.values.firstname,
        lastname: formPersonalData.values.lastname,
        email: formPersonalData.values.email,
        numberPhone: formPersonalData.values.numberPhone,
        city: formPersonalData.values.city,
        gender: formPersonalData.values.gender,
      })
      setEditMode(false)
    } else {
      setErrorCity(isValidCity(city))
      setValidCity(false)
    }
  }
  const onCancel = () => {
    setEditMode(false)
  }
  const handleChangeCity = (val: string) => {
    window.clearTimeout(timeoutRef.current)
    if (val.trim().length === 0) {
      setLoading(false)
    } else {
      setLoading(true)
      timeoutRef.current = window.setTimeout(() => {
        setLoading(false)
      }, 100)
      setLocation(val)
      formPersonalData.setFieldValue('city', location)
    }
  }
  const onBlurCity = () => {
    setErrorCity('')
    if (location.length < 3) {
      setErrorCity(isValidCity(location))
      setValidCity(false)
    } else {
      formPersonalData.setFieldValue('city', location)
      setValidCity(true)
      formPersonalData.setErrors(formPersonalData.errors)
    }
  }
  return (
    <form onSubmit={formPersonalData.onSubmit(onSave)}>
      <Group position="center" spacing={15}>
        <TextInput
          label="Nume"
          variant="filled"
          placeholder="Popescu"
          size="md"
          radius={10}
          classNames={{ input: classes.input }}
          {...formPersonalData.getInputProps('lastname')}
        />

        <TextInput
          label="Prenume"
          variant="filled"
          placeholder="Ana"
          size="md"
          radius={10}
          classNames={{ input: classes.input }}
          {...formPersonalData.getInputProps('firstname')}
        />
      </Group>
      <Group position="center" mt={16} spacing={15}>
        <TextInput
          label="Adresa de email"
          variant="filled"
          placeholder="hello@gmail.com"
          size="md"
          radius={10}
          classNames={{ input: classes.input }}
          {...formPersonalData.getInputProps('email')}
        />
        <TextInput
          label="Număr de telefon"
          variant="filled"
          placeholder="07653..."
          size="md"
          radius={10}
          classNames={{ input: classes.input }}
          {...formPersonalData.getInputProps('numberPhone')}
        />
      </Group>

      <Group position="center" mt={16} spacing={15}>
        <Autocomplete
          data={cities}
          defaultValue={city}
          onChange={handleChangeCity}
          onBlur={onBlurCity}
          label="Oraș"
          rightSection={loading ? <Loader size={16} /> : null}
          placeholder="Alege orașul"
          variant="filled"
          size="md"
          radius={10}
          classNames={{ input: classes.input }}
          error={errorCity}
        />

        <Select
          data={['Feminin', 'Masculin', 'Altul']}
          label="Gen"
          placeholder="Alege genul"
          variant="filled"
          size="md"
          radius={10}
          classNames={{ input: classes.input }}
          {...formPersonalData.getInputProps('gender')}
        />
      </Group>

      <Group position="center" spacing={15}>
        <Button size="sm" onClick={onSave} className={classes.saveButton}>
          Salvează
        </Button>
        <Button size="sm" variant="outline" onClick={onCancel} className={classes.cancelButton}>
          Anuleză
        </Button>
      </Group>
    </form>
  )
}
