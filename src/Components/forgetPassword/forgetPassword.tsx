import {
  Paper,
  createStyles,
  TextInput,
  Button,
  Title,
  Text,
  Container,
  BackgroundImage,
  Image,
  Grid,
  Flex,
  Tooltip,
} from '@mantine/core'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { useNavigate } from 'react-router-dom'
import { useResetPassword } from '../../api/useResetPassword'
import { ErrorSuccesNotification } from '../../Notification/notification'
import { setMessageNotification } from '../../Redux/notification/slice'

const useStyles = createStyles((theme: any) => ({
  wrapper: {
    height: '100vh',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  formForgotPassword: {
    backgroundColor: '#ffffff80',
    paddingTop: 80,
    paddingBottom: 30,
    borderRadius: 30,
    width: '100%',
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

export function ForgetPassword() {
  const { classes } = useStyles()
  const [email, setEmail] = useState<string>('')
  const [errorEmail, setErrorEmail] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const successCallBack = (data: any) => {
    dispatch(setMessageNotification(data))
    navigate('/login')
  }

  const { mutate, isLoading } = useResetPassword(successCallBack)
  const onResetPassword = () => {
    if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email) && email.length > 0) {
      mutate({ email: email })
      setErrorEmail('')
    } else {
      setErrorEmail('Email invalid!')
    }
  }

  return (
    <BackgroundImage src="/backround.png" radius="sm">
      <Container className={classes.wrapper} fluid>
        <Flex direction={'column'} mt={50}>
          <Flex h={'100%'} align="center" justify={'center'}>
            <Tooltip label={'Înapoi'} position="bottom">
              <Image
                src="logoB.png"
                height={'auto'}
                width={'10rem'}
                onClick={() => {
                  navigate('/login')
                }}
                style={{ cursor: 'pointer' }}
                my={'xs'}
              />
            </Tooltip>
          </Flex>
          <Paper className={classes.formForgotPassword} radius={0} p={30} pb={20}>
            <Grid className={classes.grid} mx={30}>
              <Grid.Col span={5} className={classes.loginContainer}>
                <Title order={1} className={classes.title} align="center" mt="md" mb={20}>
                  Ai uitat parola?
                </Title>
                <Text size={15} c="#1c6350" mt={20} mb={20} align="center">
                  Dacă contul există, vă vom trimite prin e-mail instrucțiuni cu noua parola.
                </Text>
                <TextInput
                  label="Adresa de email"
                  variant="filled"
                  placeholder="hello@gmail.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.currentTarget.value)
                  }}
                  size="md"
                  radius={10}
                  error={errorEmail ? errorEmail : null}
                />

                <Button
                  fullWidth
                  className={classes.buttonLogin}
                  onClick={() => onResetPassword()}
                  loading={isLoading}
                  mt={'md'}
                >
                  Resetează parola
                </Button>
              </Grid.Col>
              <Grid.Col span={8}>
                <Image src="forgot-password.svg" width={'80%'} />
              </Grid.Col>
            </Grid>
          </Paper>
        </Flex>
        <ErrorSuccesNotification />
      </Container>
    </BackgroundImage>
  )
}
