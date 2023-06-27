import {
  BackgroundImage,
  Badge,
  Container,
  createStyles,
  Flex,
  LoadingOverlay,
  Paper,
  ScrollArea,
  Tabs,
  Title,
} from '@mantine/core'
import { IconCheck, IconChecks, IconRotate2 } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { useGetAllAppointment } from '../../api/appointment/useGetAllAppoiments'
import { ErrorSuccesNotification } from '../../Notification/notification'
import { NavbarAdmin } from '../NavbarAdmin'
import { CardAppoimentAdmin, TInfoAppCard } from './CardsAppoimentAdmin'

const useStyles = createStyles((theme: any) => ({
  wrapper: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
  paperTable: {
    borderRadius: 30,
    margin: 15,
    width: '100%',
    height: '96%',
    color: 'green',
    [theme.fn.smallerThan('xs')]: {
      marginBottom: 20,
      marginTop: 35,
    },
  },
}))

const Appointments = () => {
  const { classes, theme } = useStyles()
  const [nrAppCheck, setNrAppCheck] = useState(0)
  const successCallback = () => {}
  const authToken = sessionStorage.getItem('userToken')
  const { data, isLoading, isRefetching } = useGetAllAppointment(successCallback, authToken)

  const cardsAppointmentCheck = data?.data.response.map(
    (card: TInfoAppCard) =>
      card.status === 'În verificare' && (
        <CardAppoimentAdmin
          adress={card.adress}
          appointmentUuid={card.appointmentUuid}
          city={card.city}
          dateOfAppointment={card.dateOfAppointment}
          email={card.email}
          firstname={card.firstname}
          gainerUuid={card.gainerUuid}
          helpTypeUuid={card.helpTypeUuid}
          lastname={card.lastname}
          nameGainer={card.nameGainer}
          phoneNumberGainer={card.phoneNumberGainer}
          phoneNumber={card.phoneNumber}
          photo={card.photo}
          photoGainer={card.photoGainer}
          status={card.status}
          userUuid={card.userUuid}
          timeVolunteering={card.timeVolunteering}
          cityGainer={card.cityGainer}
        />
      ),
  )

  const cardsAppointmentProcess = data?.data.response.map(
    (card: TInfoAppCard) =>
      card.status === 'În procesare' && (
        <CardAppoimentAdmin
          adress={card.adress}
          appointmentUuid={card.appointmentUuid}
          city={card.city}
          dateOfAppointment={card.dateOfAppointment}
          email={card.email}
          firstname={card.firstname}
          gainerUuid={card.gainerUuid}
          helpTypeUuid={card.helpTypeUuid}
          lastname={card.lastname}
          nameGainer={card.nameGainer}
          phoneNumberGainer={card.phoneNumberGainer}
          phoneNumber={card.phoneNumber}
          photo={card.photo}
          photoGainer={card.photoGainer}
          status={card.status}
          userUuid={card.userUuid}
          timeVolunteering={card.timeVolunteering}
          cityGainer={card.cityGainer}
        />
      ),
  )
  const cardsAppointmentInCofimation = data?.data.response.map(
    (card: TInfoAppCard) =>
      card.status === 'În confirmare' && (
        <CardAppoimentAdmin
          adress={card.adress}
          appointmentUuid={card.appointmentUuid}
          city={card.city}
          dateOfAppointment={card.dateOfAppointment}
          email={card.email}
          firstname={card.firstname}
          gainerUuid={card.gainerUuid}
          helpTypeUuid={card.helpTypeUuid}
          lastname={card.lastname}
          nameGainer={card.nameGainer}
          phoneNumberGainer={card.phoneNumberGainer}
          phoneNumber={card.phoneNumber}
          photo={card.photo}
          photoGainer={card.photoGainer}
          status={card.status}
          userUuid={card.userUuid}
          timeVolunteering={card.timeVolunteering}
          cityGainer={card.cityGainer}
        />
      ),
  )
  useEffect(() => {
    let nrAppInCheck = 0
    data &&
      data.data.response.forEach((element: TInfoAppCard) => {
        if (element.status === 'În verificare') {
          nrAppInCheck = nrAppInCheck + 1
        }
      })

    setNrAppCheck(nrAppInCheck)
  }, [data])
  return (
    <BackgroundImage src="/backround.png">
      <Container className={classes.wrapper} fluid p={16}>
        <LoadingOverlay visible={isLoading || isRefetching} />
        <Paper className={classes.paper}>
          <NavbarAdmin />
          <Paper className={classes.paperTable}>
            <Flex p={10} w={'100%'} direction={'column'}>
              <Title order={2} c={theme.colors.brand[5]} mx={20} mt={10} align="center">
                Programări
              </Title>
              <Tabs defaultValue="check">
                <Tabs.List>
                  <Tabs.Tab
                    value="check"
                    icon={<IconCheck size="0.8rem" />}
                    rightSection={
                      <Badge
                        w={16}
                        h={16}
                        sx={{ pointerEvents: 'none' }}
                        variant="filled"
                        size="xs"
                        p={0}
                      >
                        {nrAppCheck}
                      </Badge>
                    }
                  >
                    În verificare
                  </Tabs.Tab>
                  <Tabs.Tab value="progress" icon={<IconRotate2 size="0.8rem" />}>
                    În procesare
                  </Tabs.Tab>
                  <Tabs.Tab value="inConfirmation" icon={<IconChecks size="0.8rem" />}>
                    În confirmare
                  </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="check" pt="xs">
                  <ScrollArea type="auto" h={'79vh'}>
                    {cardsAppointmentCheck}
                  </ScrollArea>
                </Tabs.Panel>

                <Tabs.Panel value="progress" pt="xs">
                  <ScrollArea type="auto" h={'79vh'}>
                    {cardsAppointmentProcess}
                  </ScrollArea>
                </Tabs.Panel>
                <Tabs.Panel value="inConfirmation" pt="xs">
                  <ScrollArea type="auto" h={'79vh'}>
                    {cardsAppointmentInCofimation}
                  </ScrollArea>
                </Tabs.Panel>
              </Tabs>
            </Flex>
          </Paper>
        </Paper>
      </Container>
      <ErrorSuccesNotification />
    </BackgroundImage>
  )
}
export default Appointments
