import {
  BackgroundImage,
  Container,
  createStyles,
  Paper,
  ThemeIcon,
  Text,
  Group,
  Progress,
  rem,
  Flex,
} from '@mantine/core'
import { IconHeart } from '@tabler/icons-react'
import { useGetInfoUser } from '../../api/user/useGetInfoUser'
import { NavigationBar } from '../Navbar'
const ICON_SIZE = rem(60)
const useStyles = createStyles((theme: any) => ({
  wrapper: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  card: {
    position: 'relative',
    overflow: 'visible',
    width: '100%',
    height: 'fit-content',
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
    color: '#154639',
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    [theme.fn.smallerThan('md')]: {
      marginBottom: 30,
      marginTop: 30,
      marginLeft: 10,
      marginRight: 10,
    },
  },

  paper: {
    backgroundColor: '#ffffff80',
    borderRadius: 30,
    width: '100%',
    height: '96vh',
    display: 'flex',
    flexDirection: 'row',

    [theme.fn.smallerThan('xs')]: {
      marginBottom: 20,
      marginTop: 35,
    },
  },
}))

const Homepage = () => {
  const { classes } = useStyles()
  const userUUid = localStorage.getItem('userUuid')
  const authToken = localStorage.getItem('userToken')
  const successCallBack = (data: any) => {
    console.log(data)
    localStorage.setItem('firstName', data.data.response[0].firstname)
    localStorage.setItem('lastName', data.data.response[0].lastname)
  }
  const { data } = useGetInfoUser(successCallBack, userUUid, authToken)

  return (
    <BackgroundImage src="/backround.png">
      <Container className={classes.wrapper} fluid p={16}>
        <Paper className={classes.paper}>
          <Flex p={10} w={'100%'} h={'100%'}>
            <NavigationBar />

            <Paper radius="md" withBorder className={classes.card} mt={`calc(${ICON_SIZE} / 2)`}>
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
                  {(data?.data.response[0].countTime * 100) / 100}%
                </Text>
              </Group>

              <Progress value={data?.data.response[0].countTime} mt={5} color={'#28886f'} />

              <Group position="apart" mt="md">
                <Text fz="sm">{data?.data.response[0].countTime} / 100 ore</Text>
              </Group>
              <Text c="dimmed" ta="center" fz="sm">
                Noi suntem mândri de tine continuă tot așa și vei fi răsplătit!
              </Text>
            </Paper>
          </Flex>
        </Paper>
      </Container>
    </BackgroundImage>
  )
}
export default Homepage
