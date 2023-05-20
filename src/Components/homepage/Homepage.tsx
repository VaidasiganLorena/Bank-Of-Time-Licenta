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
  Indicator,
  ScrollArea,
} from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { IconCalendar, IconHeart } from '@tabler/icons-react'
import moment from 'moment'
import { useGetAllAppointment } from '../../api/appointment/useGetAllAppoiments'
import { useGetInfoUser } from '../../api/user/useGetInfoUser'
import { TInfoAppCard } from '../../ComponentsAdmin/pageAppointments/CardsAppoimentAdmin'
import { TInfoAppForGainer } from '../../ComponentsAdmin/pageGainerAllAppointments/CardAppoimentForGainer'
import { NavigationBar } from '../Navbar'
import { CardCalendarApp } from './CardCalendarApp'
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
type Holiday = {
  date: string
  name: string
}

const HOLIDAYS: Holiday[] = [
  { date: '2023-01-01', name: "New Year's Day" },
  { date: '2023-01-02', name: 'New Year Holiday' },
  { date: '2023-01-24', name: 'Union of the Romanian Principalities' },
  { date: '2023-04-14', name: 'Orthodox Good Friday' },
  { date: '2023-04-16', name: 'Orthodox Easter Sunday' },
  { date: '2023-04-17', name: 'Orthodox Easter Monday' },
  { date: '2023-05-01', name: 'Labor Day' },
  { date: '2023-06-01', name: "Children's Day" },
  { date: '2023-06-04', name: 'Orthodox Whit Sunday' },
  { date: '2023-06-05', name: 'Orthodox Whit Monday' },
  { date: '2023-08-15', name: 'Assumption Day' },
  { date: '2023-11-30', name: 'Feast of Saint Andrew' },
  { date: '2023-12-01', name: 'Great Union Day' },
  { date: '2023-12-25', name: 'Christmas Day' },
  { date: '2023-12-26', name: '2nd Day of Christmas' },
]
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
  const { data: dataApp } = useGetAllAppointment(successCallBack)
  const isHoliday = (date: Date): boolean => {
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
    return HOLIDAYS.some((holiday) => holiday.date === formattedDate)
  }
  const cardApp = dataApp?.data.response.map(
    (card: TInfoAppCard) =>
      card.status === 'În procesare' && (
        <CardCalendarApp
          avatar={card.photoGainer}
          name={card.nameGainer}
          date={moment(card.dateOfAppointment).format('L')}
          phone={card.phoneNumberGainer}
          status={card.status}
        />
      ),
  )
  return (
    <BackgroundImage src="/backround.png">
      <Container className={classes.wrapper} fluid p={16}>
        <Paper className={classes.paper}>
          <Flex p={10} w={'100%'} h={'100%'}>
            <NavigationBar />
            <Flex w={'100%'} gap={'xs'}>
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
              <Paper
                radius="xl"
                withBorder
                className={classes.card}
                mt={`calc(${ICON_SIZE} / 2)`}
                w="40%"
              >
                <ThemeIcon
                  className={classes.icon}
                  size={ICON_SIZE}
                  color={'#28886f'}
                  radius={ICON_SIZE}
                >
                  <IconCalendar size="2rem" stroke={1.5} />
                </ThemeIcon>
                <Group position="center">
                  <DatePicker
                    type="default"
                    value={new Date()}
                    getDayProps={(date) => {
                      return {
                        sx: (theme) => ({
                          backgroundColor: isHoliday(date) ? theme.colors.green[1] : '',
                          ...theme.fn.hover({ backgroundColor: theme.colors.green[2] }),
                        }),
                      }
                    }}
                  />
                  <Paper radius="xl" bg="#28886f" w="100%">
                    <ScrollArea h={'40vh'}>{cardApp}</ScrollArea>
                  </Paper>
                </Group>
              </Paper>
            </Flex>
          </Flex>
        </Paper>
      </Container>
    </BackgroundImage>
  )
}
export default Homepage
