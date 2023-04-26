import {
  Autocomplete,
  BackgroundImage,
  Button,
  Center,
  Container,
  createStyles,
  Group,
  Loader,
  Paper,
  PasswordInput,
  Select,
  TextInput,
  Title,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePostRegister } from '../../api/usePostRegister'
import { cities } from '../../aseert/city'

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    [theme.fn.largerThan('xs')]: {
      height: '100vh',
    },
  },
  form: {
    backgroundColor: '#ffffff80',
    paddingTop: 80,
    borderRadius: 30,
    width: '100%',
    height: 'auto',

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
  anchor: {
    color: '#154639',
    fontWeight: 550,
  },

  title: {
    color: '#154639',
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    [theme.fn.smallerThan('sm')]: {
      marginBottom: 30,
      marginTop: 10,
    },
  },
  submitButton: {
    marginTop: 15,
    width: '45%',
    backgroundColor: '#28886f',
    borderRadius: 10,
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
    '&:hover': {
      backgroundColor: '#154639',
    },
  },
  groupInput: {
    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },
}))
const Register = () => {
  const { classes } = useStyles()
  const timeoutRef = useRef<number>(0)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [city, setCity] = useState<string>('')
  const [validCity, setValidCity] = useState(false)
  const [errorCity, setErrorCity] = useState<string>('')

  const isValidCity: (city: string) => string = (city: string) => {
    return city.length < 3 ? 'Locația nu este validă!' : ''
  }
  const formRegistration = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      numberPhone: '',
      password: '',
      city: '',
      gender: '',
    },
    validate: {
      firstName: (value) =>
        value.length < 2 ? 'Prenumele trebuie sa contina cel putin 2 caractere' : null,
      lastName: (value) =>
        value.length < 2 ? 'Numele trebuie sa contina cel putin 2 caractere' : null,
      email: (value: string) =>
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) && value.length > 0
          ? null
          : 'Email invalid!',
      numberPhone: (value: string) => {
        return /^(07)\d{8}$/.test(value) && value.length > 1 ? null : 'Număr de telefon invalid!'
      },
      password: (value: string) =>
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/.test(value) &&
        value.length > 0
          ? null
          : 'Parolă invalidă!',

      gender: (value: string) => (value.length !== 0 ? null : 'Nu uita să alegi genul.'),
    },
  })

  const succesCallBack = (data: string, status: number) => {
    if (status === 200) {
      console.log(data)
    }
  }
  const errorCallBack = (data: any) => {
    if (data.status === 400) {
    }
  }
  const { mutate } = usePostRegister(succesCallBack, errorCallBack)

  const onPressCreateAcount = () => {
    if (formRegistration.validate().hasErrors === false && validCity === true) {
      mutate({
        firstName: formRegistration.values.firstName,
        lastName: formRegistration.values.lastName,
        email: formRegistration.values.email,
        phoneNumber: formRegistration.values.numberPhone,
        password: formRegistration.values.password,
        city: formRegistration.values.city,
        gender: formRegistration.values.gender,
        photo: formRegistration.values.gender === 'Masculin' ? 'avatarMan.png' : 'avatar.png',
      })
      navigate('/login')
    } else {
      setErrorCity(isValidCity(city))
      setValidCity(false)
    }
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
      setCity(val)

      formRegistration.setFieldValue('city', city)
    }
  }
  const onBlurCity = () => {
    setErrorCity('')
    if (city.length < 3) {
      setErrorCity(isValidCity(city))
      setValidCity(false)
    } else {
      formRegistration.setFieldValue('city', city)
      setValidCity(true)
      formRegistration.setErrors(formRegistration.errors)
    }
  }
  useEffect(() => {})
  return (
    <BackgroundImage src="/backround.png" radius="sm">
      <Container className={classes.wrapper}>
        <Paper className={classes.form} radius={0} p={30}>
          <Title order={2} className={classes.title} align="center" mt="md" mb={30}>
            Crează-ți contul pentru banca timpului
          </Title>
          <form onSubmit={formRegistration.onSubmit(onPressCreateAcount)}>
            <Group position="center">
              <TextInput
                label="Nume"
                variant="filled"
                placeholder="Popescu"
                size="md"
                radius={10}
                classNames={{ input: classes.input }}
                {...formRegistration.getInputProps('lastName')}
              />

              <TextInput
                label="Prenume"
                variant="filled"
                placeholder="Ana"
                size="md"
                radius={10}
                classNames={{ input: classes.input }}
                {...formRegistration.getInputProps('firstName')}
              />
            </Group>
            <Group position="center" mt={16}>
              <TextInput
                label="Adresa de email"
                variant="filled"
                placeholder="hello@gmail.com"
                size="md"
                radius={10}
                classNames={{ input: classes.input }}
                {...formRegistration.getInputProps('email')}
              />
              <TextInput
                label="Număr de telefon"
                variant="filled"
                placeholder="07653..."
                size="md"
                radius={10}
                classNames={{ input: classes.input }}
                {...formRegistration.getInputProps('numberPhone')}
              />
            </Group>

            <Group position="center" mt={16}>
              <PasswordInput
                label="Parola"
                variant="filled"
                placeholder="Tastează parola dorită..."
                size="md"
                radius={10}
                classNames={{ input: classes.input }}
                {...formRegistration.getInputProps('password')}
              />
              <PasswordInput
                label="Confirmare parolă"
                variant="filled"
                placeholder="Tastează parola introdusă anterior..."
                size="md"
                radius={10}
                classNames={{ input: classes.input }}
                {...formRegistration.getInputProps('confirmPassword')}
              />
            </Group>
            <Group position="center" mt={16}>
              <Autocomplete
                data={cities}
                onChange={handleChangeCity}
                onBlur={onBlurCity}
                label="Orașul"
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
                {...formRegistration.getInputProps('gender')}
              />
            </Group>
            <Center>
              <Button
                size="sm"
                mt={'xl'}
                onClick={onPressCreateAcount}
                type="submit"
                className={classes.submitButton}
              >
                Creează cont
              </Button>
            </Center>
          </form>
        </Paper>
      </Container>
    </BackgroundImage>
  )
}

export default Register
