import {
  BackgroundImage,
  Card,
  Container,
  createStyles,
  SimpleGrid,
  Title,
  Text,
  Image,
  Button,
  Group,
  Flex,
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useNavigate } from 'react-router-dom'

const useStyles = createStyles((theme: any) => ({
  wrapper: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.fn.smallerThan('md')]: {
      height: '100%',
    },
  },
  title: {
    color: '#154639',
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    [theme.fn.smallerThan('sm')]: {
      marginBottom: 30,
      marginTop: 20,
    },
  },
  introContainer: {
    backgroundColor: 'light',
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

  card: {
    backgroundColor: '#f9f5f1e6',
    transition: 'transform 150ms ease, box-shadow 200ms ease',
    '&:hover': {
      // backgroundColor: '#f1e0cb',
      transform: 'scale(1.04)',
      boxShadow: theme.shadows.xl,
    },
  },
  buttonLogin: {
    '&:hover': {
      backgroundColor: '#154639',
    },
  },
  buttonRegister: {
    color: '#28886f',
    border: ' 1px solid #28886f',
  },
  navbar: {
    position: 'fixed',
    top: 0,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 50,
  },
}))

export default function Intro() {
  const { classes } = useStyles()
  const navigate = useNavigate()
  const mobile = useMediaQuery('(max-width: 430px)')

  return (
    <BackgroundImage src="/backround.png" radius="sm">
      <Container className={classes.wrapper} fluid>
        <Flex className={classes.navbar}>
          <Title className={classes.title} ml={20}>
            Banca Timpului
          </Title>
          <Group mr={20}>
            <Button
              radius={'xl'}
              className={classes.buttonLogin}
              onClick={() => navigate('/login')}
            >
              Autentificare
            </Button>
            <Button
              variant="outline"
              radius={'xl'}
              className={classes.buttonRegister}
              onClick={() => navigate('/register')}
            >
              Înregistrează-te
            </Button>
          </Group>
        </Flex>
        {mobile ? null : (
          <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
            <Card p="md" radius="xl" className={classes.card}>
              <Title size={25} color={'#154639'} align="center" mt={50}>
                De ce suntem noi aici ?
              </Title>
              <Text color="dimmed" size="xs" align={'center'} weight={700} mt="md">
                'Extend default theme with any amount of additional colors, replace shadows, radius,
                spacing, fonts and many other properties to match your design requirements. Mantine
                theme is just an object, you can subscribe to it in any part of application via
                context and use it to build your own components.',
              </Text>
              <Image src={'/solidarity.png'} width={'90%'} ml={25} />
            </Card>

            <Card p="md" radius="xl" className={classes.card}>
              <Image src={'/help-people.png'} />
              <Title size={25} color={'#154639'} align="center" mt={50}>
                Pe cine ajutăm ?
              </Title>
              <Text color="dimmed" size="xs" align={'center'} weight={700} mt="md">
                'Extend default theme with any amount of additional colors, replace shadows, radius,
                spacing, fonts and many other properties to match your design requirements. Mantine
                theme is just an object, you can subscribe to it in any part of application via
                context and use it to build your own components.',
              </Text>
            </Card>

            <Card p="md" radius="xl" className={classes.card}>
              <Title size={25} color={'#154639'} align="center" mt={50}>
                Cum poți ajuta?
              </Title>
              <Text color="dimmed" size="xs" align={'center'} weight={700} mt="md">
                'Extend default theme with any amount of additional colors, replace shadows, radius,
                spacing, fonts and many other properties to match your design requirements. Mantine
                theme is just an object, you can subscribe to it in any part of application via
                context and use it to build your own components.',
              </Text>
              <Image src={'/volunteer.png'} width={'95%'} ml={25} />
            </Card>
          </SimpleGrid>
        )}
      </Container>
    </BackgroundImage>
  )
}
