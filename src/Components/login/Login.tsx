import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Anchor,
  Container,
  BackgroundImage,
  Image,
  Grid,
} from '@mantine/core'
import { useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { usePostLogin } from '../../api/usePostLogin'

const useStyles = createStyles((theme: any) => ({
  wrapper: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  form: {
    backgroundColor: theme.colors.background[0],
    paddingTop: 80,
    paddingBottom: 30,
    borderRadius: 30,
    width: '80%',
    height: 'auto',
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
      height: 'auto',
    },
  },

  title: {
    color: '#154639',
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    [theme.fn.smallerThan('sm')]: {
      marginBottom: 30,
      marginTop: 10,
    },
  },
  buttonLogin: {
    backgroundColor: '#28886f',
    borderRadius: 10,
    '&:hover': {
      backgroundColor: '#154639',
    },
  },
  input: { backgroundColor: '#f3f5f7' },
  anchor: {
    color: '#154639',
    fontWeight: 550,
  },
  grid: {
    width: '100%',
    display: 'flex',
    flexWrap: 'nowrap',
    justifyItems: 'center',
    alignItems: 'center',
    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column-reverse',
      margin: 0,
    },
  },
  loginContainer: {
    padding: 30,
    marginRight: 20,
    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%',
      padding: 0,
      margin: 0,
      paddingBottom: 50,
    },
  },
  inputError: { border: '1px solid red' },
}))

export function Login() {
  const { classes } = useStyles()
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errorBackend, setErrorBackend] = useState<string>('')
  const successCallBack = (data: any) => {
    setErrorBackend('')
    if (data.role === 'admin') {
      localStorage.setItem('userUuid', data.userUuid)
      navigate('/homepage-admin')
    } else {
      localStorage.setItem('userUuid', data.userUuid)
      localStorage.setItem('userToken', data.authToken)
      navigate('/homepage')
    }
  }
  const errorCallBack = (data: any) => {
    setErrorBackend(data.response)
  }
  const { mutate } = usePostLogin(successCallBack, errorCallBack)

  const onPressLogin = () => {
    if (
      (email.length === 0 && password.length === 0) ||
      email.length === 0 ||
      password.length === 0
    ) {
      setErrorBackend('Câmpurile sunt invalide!')
    } else {
      mutate({ email: email, password: password })
    }
  }
  return (
    <BackgroundImage src="/backround.png" radius="sm">
      <Container className={classes.wrapper} fluid>
        <Paper className={classes.form} radius={0} p={30} pb={20}>
          <Grid className={classes.grid}>
            <Grid.Col span={5} className={classes.loginContainer}>
              <Title order={2} className={classes.title} align="center" mt="md" mb={50}>
                Bine ai revenit!
              </Title>

              <TextInput
                label="Adresa de email"
                variant="filled"
                placeholder="hello@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                size="md"
                radius={10}
                classNames={{
                  input: errorBackend.length === 0 ? classes.input : classes.inputError,
                }}
              />

              <PasswordInput
                label="Parola"
                variant="filled"
                placeholder="Parola ta ..."
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                mt="md"
                size="md"
                radius={10}
                classNames={{
                  input: errorBackend.length === 0 ? classes.input : classes.inputError,
                }}
              />
              <Text c="red" size={'md'} mt={15} align={'center'}>
                {errorBackend}
              </Text>
              <Button
                fullWidth
                className={classes.buttonLogin}
                mt={errorBackend.length === 0 ? 30 : 15}
                onClick={() => onPressLogin()}
              >
                Autentificare
              </Button>

              <Text align="center" mt="md">
                Nu ești membru ?{' '}
                <Anchor<'a'>
                  href="#"
                  className={classes.anchor}
                  onClick={(event: any) => {
                    event.preventDefault()
                    navigate('/register')
                  }}
                >
                  Crează-ți cont!
                </Anchor>
              </Text>
            </Grid.Col>
            <Grid.Col span={8}>
              <Image src="login.svg" width={'90%'} />
            </Grid.Col>
          </Grid>
        </Paper>
      </Container>
    </BackgroundImage>
  )
}
