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
  ScrollArea,
  Stack,
  SimpleGrid,
  Image,
} from '@mantine/core'
import { DatePicker } from '@mantine/dates'

import { IconCalendar, IconHeart } from '@tabler/icons-react'
import moment from 'moment'
import { useGetAllAppointment } from '../../api/appointment/useGetAllAppoiments'
import { useGetAppointmentAll } from '../../api/statistic/useGetAppointmentAll'
import { useGetAppointmentCancel } from '../../api/statistic/useGetAppointmentCancel'
import { useGetAppointmentComplete } from '../../api/statistic/useGetAppointmentComplete'

import { useGetInfoUser } from '../../api/user/useGetInfoUser'
import { TInfoAppCard } from '../../ComponentsAdmin/pageAppointments/CardsAppoimentAdmin'
import { ErrorSuccesNotification } from '../../Notification/notification'
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

const Homepage = () => {
  const { classes } = useStyles()
  const userUUid = localStorage.getItem('userUuid')
  const authToken = localStorage.getItem('userToken')
  const successCallBack = (data: any) => {
    localStorage.setItem('firstName', data.data.response[0].firstname)
    localStorage.setItem('lastName', data.data.response[0].lastname)
  }
  const successCallBackApp = () => {}
  const { data } = useGetInfoUser(successCallBack, userUUid, authToken)
  const { data: dataApp } = useGetAllAppointment(successCallBackApp)
  const { data: dataCompleteAppointment } = useGetAppointmentComplete(userUUid, authToken)
  const { data: dataCancelAppointment } = useGetAppointmentCancel(userUUid, authToken)
  const { data: dataAllAppointment } = useGetAppointmentAll(userUUid, authToken)

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
              <Stack w="100%">
                <Paper
                  radius="md"
                  withBorder
                  className={classes.card}
                  mt={`calc(${ICON_SIZE} / 2)`}
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
                <Paper withBorder p="md" radius={'xl'}>
                  <Text ta="center" size={18} fw={700} className={classes.title}>
                    Aici sunt ativitățiile tale
                  </Text>
                  <SimpleGrid cols={4} p="lg">
                    <Stack align={'center'} spacing={0}>
                      <ThemeIcon size={'6rem'} color={'#ecd0b1'} m="xs" radius={ICON_SIZE}>
                        <Image width={'3rem'} src="well-doing.png" />
                      </ThemeIcon>
                      <Text ta="center" size={12} fw={700}>
                        Numărul total de activități
                      </Text>
                      <Text ta="center" size={25} fw={700}>
                        {dataAllAppointment?.data.response}
                      </Text>
                    </Stack>
                    <Stack align={'center'} spacing={0}>
                      <ThemeIcon size={'6rem'} color={'#fcc419'} m="xs" radius={ICON_SIZE}>
                        <Image width={'3rem'} src="pending.png" />
                      </ThemeIcon>

                      <Text ta="center" size={12} fw={700}>
                        Activități în așteptare
                      </Text>
                      <Text ta="center" size={25} fw={700}>
                        {dataAllAppointment?.data.response -
                          dataCompleteAppointment?.data.response -
                          dataCancelAppointment?.data.response}
                      </Text>
                    </Stack>
                    <Stack align={'center'} spacing={0}>
                      <ThemeIcon size={'6rem'} color={'#7dc062'} m="xs" radius={ICON_SIZE}>
                        <Image width={'4rem'} src="finished.png" />
                      </ThemeIcon>
                      <Text ta="center" size={12} fw={700}>
                        Activități finalizate
                      </Text>
                      <Text ta="center" size={25} fw={700}>
                        {dataCompleteAppointment?.data.response}
                      </Text>
                    </Stack>

                    <Stack align={'center'} spacing={0}>
                      <ThemeIcon size={'6rem'} color={'#fb6b6b'} m="xs" radius={ICON_SIZE}>
                        <Image width={'3rem'} src="cancel.png" />
                      </ThemeIcon>
                      <Text ta="center" size={12} fw={700}>
                        Activități anulate
                      </Text>
                      <Text ta="center" size={25} fw={700}>
                        {dataCancelAppointment?.data.response}
                      </Text>
                    </Stack>
                  </SimpleGrid>
                </Paper>
              </Stack>

              <Paper
                radius="xl"
                withBorder
                className={classes.card}
                mt={`calc(${ICON_SIZE} / 2)`}
                w="30%"
              >
                <ThemeIcon
                  className={classes.icon}
                  size={ICON_SIZE}
                  color={'#28886f'}
                  radius={ICON_SIZE}
                >
                  <IconCalendar size="2rem" stroke={1.5} />
                </ThemeIcon>
                <Stack w={'100%'} align={'center'}>
                  <DatePicker size="xs" value={new Date()} />
                  <Text ta="center" fw={700} className={classes.title}>
                    Programări viitoare
                  </Text>
                  <Paper bg={'#28886F'} radius="lg" w="100%">
                    <ScrollArea h={'42vh'} w="100%">
                      {cardApp}
                    </ScrollArea>
                  </Paper>
                </Stack>
              </Paper>
            </Flex>
          </Flex>
        </Paper>
        <ErrorSuccesNotification />
      </Container>
    </BackgroundImage>
  )
}
export default Homepage
