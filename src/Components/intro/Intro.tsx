import { Carousel } from '@mantine/carousel'
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
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.fn.smallerThan('sm')]: {
      height: '100%',
    },
    [theme.fn.smallerThan('xs')]: {
      height: '100vh',
      justifyContent: 'space-around',
    },
    [theme.fn.smallerThan('(max-width: 34em)')]: {
      height: '100%',
    },
  },
  title: {
    color: '#154639',
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    [theme.fn.smallerThan('sm')]: {
      marginTop: 10,
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
    height: '100%',
    backgroundColor: '#f9f5f1e6',
    transition: 'transform 150ms ease, box-shadow 200ms ease',
    '&:hover': {
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
    width: '98%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 50,
    [theme.fn.smallerThan('xs')]: {
      display: 'flex',
      flexDirection: 'column',
    },
  },
}))

export default function Intro() {
  const { classes } = useStyles()
  const navigate = useNavigate()
  const isTablet = useMediaQuery('(max-width: 60em)')
  const isMobile = useMediaQuery('(max-width: 39em)')

  return (
    <BackgroundImage src="/backround.png" radius="sm">
      <Container className={classes.wrapper}>
        <Flex className={classes.navbar} m="xs">
          <Title className={classes.title}>Banca Timpului</Title>
          {isMobile ? null : (
            <Group>
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
          )}
        </Flex>
        {isTablet ? (
          <Carousel
            slideSize="90%"
            height={'auto'}
            maw="100%"
            mah="95%"
            slideGap="xl"
            controlsOffset="xs"
            withControls={isMobile ? false : isTablet ? true : false}
            withIndicators
            mt={'6rem'}
          >
            <Carousel.Slide>
              <Card p="md" radius="xl" className={classes.card}>
                <Title size={25} color={'#154639'} align="center" mt={20}>
                  De ce suntem noi aici ?
                </Title>
                <Text color="dimmed" size="xs" align={'center'} weight={700} mt="md">
                  NOI, suntem aici pentru a ajuta la dezvolatrea comnunitățiilor locale și de a
                  contribui la creșterea calității vieții în comunitate. Voluntariatul este una
                  dintre cele mai puternice instrumente în ceea ce privește dezvolatrea
                  comunitățiilor,de aceea NOI oferim vrem să oferim cetățenilor posibilitatea de a
                  se implica mult mai ușor.
                </Text>
                <Image src={'/solidarity.png'} width={'90%'} ml={25} />
              </Card>
            </Carousel.Slide>
            <Carousel.Slide>
              <Card p="md" radius="xl" className={classes.card}>
                <Image src={'/help-people.png'} />
                <Title size={25} color={'#154639'} align="center" mt={50}>
                  Pe cine ajutăm ?
                </Title>
                <Text color="dimmed" size="xs" align={'center'} weight={700} mt="md">
                  NOI, în primul rând ajutăm comunitatea să se dezvolte armonios prin ajutorarea
                  persoanelor în vârstă sau a celor cu dizabilități. Încercăm să creștem calitatea
                  vieții acestora pin activități precum ar fi cumpărarea de alimente, efectuarea de
                  curățenie în locuințele acestora, activități de socializare.
                </Text>
              </Card>
            </Carousel.Slide>
            <Carousel.Slide>
              <Card p="md" radius="xl" className={classes.card}>
                <Title size={25} color={'#154639'} align="center" mt={20}>
                  Cum poți ajuta?
                </Title>
                <Text color="dimmed" size="xs" align={'center'} weight={700} mt="md">
                  Este nevoie doar de câteva lucruri pentru a ajuta comunitatea din care faci parte
                  să devină așa cum ne dorim cu toții, adică o comunitate puternică, solidară și de
                  încredere. NOI cerem celor care vor să ajute doar bună dipoziție, puțin timp și
                  empatie. Acum poți contibui și TU la o cauză în care crezi și poți aduce o
                  schimbare pozitivă în lume. Nu uita schimbare începe cu TINE!
                </Text>
                <Image src={'/volunteer.png'} width={'95%'} ml={25} />
              </Card>
            </Carousel.Slide>
          </Carousel>
        ) : (
          <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
            <Card p="md" radius="xl" className={classes.card}>
              <Title size={25} color={'#154639'} align="center" mt={50}>
                De ce suntem noi aici ?
              </Title>
              <Text color="dimmed" size="xs" align={'center'} weight={700} mt="md">
                NOI, suntem aici pentru a ajuta la dezvolatrea comnunitățiilor locale și de a
                contribui la creșterea calității vieții în comunitate. Voluntariatul este una dintre
                cele mai puternice instrumente în ceea ce privește dezvolatrea comunitățiilor de
                aceea, NOI vrem să oferim cetățenilor posibilitatea de a se implica mult mai ușor
                prin intremediul aplicației Banca Timpului.
              </Text>
              <Image src={'/solidarity.png'} width={'90%'} ml={25} />
            </Card>

            <Card p="md" radius="xl" className={classes.card}>
              <Image src={'/help-people.png'} />
              <Title size={25} color={'#154639'} align="center" mt={50}>
                Pe cine ajutăm ?
              </Title>
              <Text color="dimmed" size="xs" align={'center'} weight={700} mt="md">
                NOI, în primul rând ajutăm comunitatea să se dezvolte armonios prin ajutorarea
                persoanelor în vârstă sau a celor cu dizabilități. Încercăm să creștem calitatea
                vieții acestora pin activități precum ar fi cumpărarea de alimente, efectuarea de
                curățenie în locuințele acestora, activități de socializare.
              </Text>
            </Card>

            <Card p="md" radius="xl" className={classes.card}>
              <Title size={25} color={'#154639'} align="center" mt={50}>
                Cum poți ajuta?
              </Title>
              <Text color="dimmed" size="xs" align={'center'} weight={700} mt="md">
                Este nevoie doar de câteva lucruri pentru a ajuta comunitatea din care faci parte să
                devină așa cum ne dorim cu toții, adică o comunitate puternică, solidară și de
                încredere. NOI cerem celor care vor să ajute doar bună dipoziție, puțin timp și
                empatie. Acum poți contibui și TU la o cauză în care crezi și poți aduce o schimbare
                pozitivă în lume. Nu uita schimbare începe cu TINE!
              </Text>
              <Image src={'/volunteer.png'} width={'95%'} ml={25} />
            </Card>
          </SimpleGrid>
        )}
        {isMobile ? (
          <Group>
            <Button
              radius={'xl'}
              className={classes.buttonLogin}
              onClick={() => navigate('/login')}
            >
              Autentificare
            </Button>
            <Button
              variant="light"
              radius={'xl'}
              className={classes.buttonRegister}
              onClick={() => navigate('/register')}
            >
              Înregistrează-te
            </Button>
          </Group>
        ) : null}
      </Container>
    </BackgroundImage>
  )
}
