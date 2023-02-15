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
import { useNavigate } from 'react-router-dom'

const useStyles = createStyles((theme) => ({
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
    marginTop: 30,
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
}))

export function Login() {
  const { classes } = useStyles()
  const navigate = useNavigate()
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
                size="md"
                radius={10}
                classNames={{ input: classes.input }}
              />

              <PasswordInput
                label="Parola"
                variant="filled"
                placeholder="Parola ta ..."
                mt="md"
                size="md"
                radius={10}
                classNames={{ input: classes.input }}
              />

              <Button fullWidth className={classes.buttonLogin}>
                Autentificare
              </Button>

              <Text align="center" mt="md">
                Nu ești membru ?{' '}
                <Anchor<'a'>
                  href="#"
                  className={classes.anchor}
                  onClick={(event) => {
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
