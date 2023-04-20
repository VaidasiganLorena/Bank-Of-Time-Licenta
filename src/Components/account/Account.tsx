import {
  BackgroundImage,
  Container,
  createStyles,
  Flex,
  Group,
  Paper,
  Progress,
  rem,
  Text,
  ThemeIcon,
} from '@mantine/core'
import { IconHeart } from '@tabler/icons-react'
import React from 'react'
import { NavigationBar } from '../Navbar'
import { CardAppointments } from './CardAppointments'
const ICON_SIZE = rem(60)
const useStyles = createStyles((theme: any) => ({
  wrapper: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    [theme.fn.smallerThan(900)]: {
      height: '100%',
    },
  },
  paper: {
    backgroundColor: '#ffffff80',
    borderRadius: 30,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    [theme.fn.smallerThan('xs')]: {
      marginBottom: 20,
      marginTop: 35,
    },
  },
  progress: {
    backgroundColor: theme.colors.background[0],
    paddingTop: 15,
    borderRadius: 30,
    width: '100%',
    height: 'fit-content',
    margin: 15,

    [theme.fn.smallerThan('xs')]: {
      marginBottom: 20,
      marginTop: 35,
    },
  },
  card: {
    position: 'relative',
    overflow: 'visible',
    width: '100%',
    height: '30%',
    borderRadius: 30,
    padding: theme.spacing.xl,
    paddingTop: `calc(${theme.spacing.xl} * 1.5 + ${ICON_SIZE} / 3)`,
  },

  icon: {
    position: 'absolute',
    top: `calc(-${ICON_SIZE} / 3)`,
    left: `calc(50% - ${ICON_SIZE} / 2)`,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
  },

  paperAppointments: {
    backgroundColor: '#689983',
    borderRadius: 30,
    margin: 15,
    width: '70%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.fn.smallerThan('xs')]: {
      marginBottom: 20,
      marginTop: 35,
    },
  },
}))
function Account() {
  const { classes } = useStyles()
  return (
    <BackgroundImage src="/backround.png">
      <Container className={classes.wrapper} fluid p={16}>
        <Paper className={classes.paper}>
          <NavigationBar />
          <Flex direction={'column'} w={'100%'} p={10}>
            <Paper
              radius="md"
              withBorder
              className={classes.card}
              mt={`calc(${ICON_SIZE} / 2)`}
              mr={10}
            >
              <ThemeIcon
                className={classes.icon}
                size={ICON_SIZE}
                color={'#28886f'}
                radius={ICON_SIZE}
              >
                <IconHeart size="2rem" stroke={1.5} />
              </ThemeIcon>

              <Text ta="center" fw={700} className={classes.title}>
                Timpul tău în care ai ales să ajuți comunitatea
              </Text>
              <Text c="dimmed" ta="center" fz="sm">
                20 ore/ lună
              </Text>

              <Group position="apart" mt="xs">
                <Text fz="sm" color="dimmed">
                  Progresul tău
                </Text>
                <Text fz="sm" color="dimmed">
                  62%
                </Text>
              </Group>

              <Progress value={62} mt={5} color={'#28886f'} />

              <Group position="apart" mt="md">
                <Text fz="sm">65 / 100 ore</Text>
              </Group>
              <Text c="dimmed" ta="center" fz="sm">
                Noi suntem mândri de tine continuă tot așa și vei fi răsplătit!
              </Text>
            </Paper>
            <Paper className={classes.paperAppointments}>
              <Text ta="center" fw={700} c="white" size={'xl'} mt={5}>
                Activitatea ta
              </Text>
              <CardAppointments />
            </Paper>
          </Flex>
        </Paper>
      </Container>
    </BackgroundImage>
  )
}

export default Account
