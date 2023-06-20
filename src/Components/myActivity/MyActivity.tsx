import {
  BackgroundImage,
  Badge,
  Container,
  createStyles,
  Flex,
  Paper,
  ScrollArea,
  Tabs,
  Text,
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { IconCheck, IconRotate2, IconX } from '@tabler/icons-react'
import { useEffect } from 'react'
import { useGetAppointment } from '../../api/appointment/useGetAppointmentOfUser'
import { useGetCountAllAppointments } from '../../api/statistic/useGetCountAllAppointments'
import { useGetCountAppointmentCancel } from '../../api/statistic/useGetCountAppointmentsCancel'
import { useGetCountAppointmentComplete } from '../../api/statistic/useGetCountAppointmentsComplete'
import { ErrorSuccesNotification } from '../../Notification/notification'
import { NavigationBar } from '../Navbar'
import { CardMyActivity } from './CardMyActivity'

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
    backgroundColor: '#ffffff80',
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

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
  },

  paperAppointments: {
    borderRadius: 30,
    marginRight: 15,
    width: '100%',
    height: '100%',
    color: 'green',
    [theme.fn.smallerThan('xs')]: {
      marginBottom: 20,
      marginTop: 35,
    },
  },
}))
export const MyActivity = () => {
  const { classes, theme } = useStyles()
  const userUUid = sessionStorage.getItem('userUuid')
  const tablet = useMediaQuery('(max-width: 800px)')
  const userUuid = sessionStorage.getItem('userUuid')
  const authToken = sessionStorage.getItem('authToken')
  const successCallBack = (data: any) => {}

  const { data } = useGetAppointment(successCallBack, userUuid, authToken)
  useEffect(() => {}, [])
  const cardsAppointmentFinished = data?.data.response.map(
    (card: any) =>
      card.status === 'Finalizat' && (
        <CardMyActivity
          key={card.appointmentUuid}
          nameGainer={card.nameGainer}
          cityGainer={card.cityGainer}
          gainerUuid={card.gainerUuid}
          dateOfAppointment={card.dateOfAppointment}
          phoneNumberGainer={card.phoneNumberGainer}
          status={card.status}
          photoGainer={card.photoGainer}
          timeVolunteering={card.timeVolunteering}
        />
      ),
  )
  const cardsAppointmentCancel = data?.data.response.map(
    (card: any, index: number) =>
      card.status === 'Anulat' && (
        <CardMyActivity
          key={card.appointmentUuid}
          nameGainer={card.nameGainer}
          cityGainer={card.cityGainer}
          gainerUuid={card.gainerUuid}
          dateOfAppointment={card.dateOfAppointment}
          phoneNumberGainer={card.phoneNumberGainer}
          status={card.status}
          photoGainer={card.photoGainer}
          timeVolunteering={card.timeVolunteering}
        />
      ),
  )

  const cardsAppointmentPending = data?.data.response.map((card: any) => {
    if (
      card.status === 'În verificare' ||
      card.status === 'În procesare' ||
      card.status === 'În confirmare'
    ) {
      return (
        <CardMyActivity
          key={card.appointmentUuid}
          nameGainer={card.nameGainer}
          cityGainer={card.cityGainer}
          gainerUuid={card.gainerUuid}
          dateOfAppointment={card.dateOfAppointment}
          phoneNumberGainer={card.phoneNumberGainer}
          status={card.status}
          photoGainer={card.photoGainer}
          timeVolunteering={card.timeVolunteering}
        />
      )
    }
  })
  const { data: dataCompleteAppointment } = useGetCountAppointmentComplete(userUUid, authToken)
  const { data: dataCancelAppointment } = useGetCountAppointmentCancel(userUUid, authToken)
  const { data: dataAllAppointment } = useGetCountAllAppointments(userUUid, authToken)
  return (
    <BackgroundImage src="/backround.png">
      <Container className={classes.wrapper} fluid p={16}>
        <Paper className={classes.paper}>
          <NavigationBar />
          <Flex p={10} w={'100%'} direction={tablet ? 'column' : 'row'}>
            <Paper className={classes.paperAppointments}>
              <Text ta="center" fw={700} c={theme.colors.brand[6]} size={'xl'} mt={5}>
                Activitatea mea
              </Text>
              <Tabs defaultValue="pending">
                <Tabs.List>
                  <Tabs.Tab
                    value="pending"
                    icon={<IconRotate2 size="0.8rem" />}
                    rightSection={
                      <Badge
                        w={16}
                        h={16}
                        sx={{ pointerEvents: 'none' }}
                        variant="filled"
                        size="xs"
                        p={0}
                      >
                        {dataAllAppointment?.data.response -
                          dataCompleteAppointment?.data.response -
                          dataCancelAppointment?.data.response}
                      </Badge>
                    }
                  >
                    În așteptare
                  </Tabs.Tab>
                  <Tabs.Tab value="finished" icon={<IconCheck size="0.8rem" />}>
                    Finalizate
                  </Tabs.Tab>
                  <Tabs.Tab value="cancel" icon={<IconX size="0.8rem" />}>
                    Anulate
                  </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="pending" pt="xs">
                  <ScrollArea h={'80vh'} type="auto" scrollbarSize={6} px={'md'}>
                    {cardsAppointmentPending}
                  </ScrollArea>
                </Tabs.Panel>

                <Tabs.Panel value="finished" pt="xs">
                  <ScrollArea h={'80vh'} type="auto" scrollbarSize={6} px={'md'}>
                    {cardsAppointmentFinished}
                  </ScrollArea>
                </Tabs.Panel>

                <Tabs.Panel value="cancel" pt="xs">
                  <ScrollArea h={'80vh'} type="auto" scrollbarSize={6} px={'md'}>
                    {cardsAppointmentCancel}
                  </ScrollArea>
                </Tabs.Panel>
              </Tabs>
            </Paper>
          </Flex>
        </Paper>
      </Container>
      <ErrorSuccesNotification />
    </BackgroundImage>
  )
}
