import {
  Autocomplete,
  BackgroundImage,
  Box,
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
  Text,
  Progress,
  Stack,
  Image,
  Flex,
  ScrollArea,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconCheck, IconX } from '@tabler/icons-react'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { usePostRegister } from '../../api/usePostRegister'
import { cities } from '../../aseert/city'
import { ErrorSuccesNotification } from '../../Notification/notification'
import { setErrorNotification, setMessageNotification } from '../../Redux/notification/slice'

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
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
function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
  return (
    <Text color={meets ? 'teal' : 'red'} mt={5} size="sm">
      <Center inline>
        {meets ? <IconCheck size="0.9rem" stroke={1.5} /> : <IconX size="0.9rem" stroke={1.5} />}
        <Box ml={7}>{label}</Box>
      </Center>
    </Text>
  )
}

const requirements = [
  { re: /[0-9]/, label: 'Trebuie să conțină cel puțin o cifră' },
  { re: /[a-z]/, label: 'Trebuie să conțină cel puțin o literă' },
  { re: /[A-Z]/, label: 'Trebuie să conțină cel puțin o literă cu majusculă' },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Trebuie să conțină cel puțin un simbol special' },
]

function getStrength(password: string) {
  let multiplier = password.length > 5 ? 0 : 1

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1
    }
  })

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0)
}
const Register = () => {
  const { classes } = useStyles()
  const timeoutRef = useRef<number>(0)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [city, setCity] = useState<string>('')
  const [validCity, setValidCity] = useState(false)
  const [errorCity, setErrorCity] = useState<string>('')
  const dispatch = useDispatch()

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
      confirmPassword: '',
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
      confirmPassword: (value, values) =>
        value !== values.password ? 'Parolele nu se potrivesc' : null,
      gender: (value: string) => (value.length !== 0 ? null : 'Nu uita să alegi genul.'),
    },
  })

  const succesCallBack = (data: string, status: number) => {
    dispatch(setMessageNotification(data))
  }
  const errorCallBack = (error: any) => {
    dispatch(setErrorNotification(`Te rog încearcă mai târziu! ${error.message}.`))
  }
  const { mutate, isLoading } = usePostRegister(succesCallBack, errorCallBack)

  const onPressCreateAcount = () => {
    console.log(validCity)
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
  const strength = getStrength(formRegistration.values.password)
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(formRegistration.values.password)}
    />
  ))
  const bars = Array(4)
    .fill(0)
    .map((_, index) => (
      <Progress
        styles={{ bar: { transitionDuration: '0ms' } }}
        value={
          formRegistration.values.password.length > 0 && index === 0
            ? 100
            : strength >= ((index + 1) / 4) * 100
            ? 100
            : 0
        }
        color={strength > 80 ? 'teal' : strength > 50 ? 'yellow' : 'red'}
        key={index}
        size={4}
      />
    ))
  useEffect(() => {})
  return (
    <BackgroundImage src="/backround.png" radius="sm">
      <Container className={classes.wrapper}>
        <Flex direction={'column'}>
          <Flex h={'100%'} align="center" justify={'center'}>
            <Image
              src="logoB.png"
              height={'auto'}
              width={'10rem'}
              onClick={() => {
                navigate('/login')
              }}
              style={{ cursor: 'pointer' }}
            />
          </Flex>
          <Paper className={classes.form} radius={0} p={30}>
            <Title order={2} className={classes.title} align="center" mt="md" mb={30}>
              Crează-ți contul pentru banca timpului
            </Title>
            <form onSubmit={formRegistration.onSubmit(onPressCreateAcount)}>
              <ScrollArea h={'50vh'} type="auto" scrollbarSize={6} px={'md'}>
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

                <Group position="center" mt={16} align="flex-start">
                  <Stack>
                    <PasswordInput
                      required
                      label="Parola"
                      variant="filled"
                      placeholder="Tastează parola dorită..."
                      size="md"
                      radius={10}
                      classNames={{ input: classes.input }}
                      {...formRegistration.getInputProps('password')}
                    />
                    {formRegistration.values.password ? (
                      <Paper bg={'#f3f5f7'} p="xs" radius={'md'}>
                        <Group spacing={5} grow mt="xs" mb="md">
                          {bars}
                        </Group>
                        <PasswordRequirement
                          label="Trebuie să conțină minim 6 carcatere"
                          meets={formRegistration.values.password.length > 5}
                        />
                        {checks}
                      </Paper>
                    ) : null}
                  </Stack>

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
                    loading={isLoading}
                  >
                    Creează cont
                  </Button>
                </Center>
              </ScrollArea>
            </form>
          </Paper>
        </Flex>

        <ErrorSuccesNotification />
      </Container>
    </BackgroundImage>
  )
}

export default Register
