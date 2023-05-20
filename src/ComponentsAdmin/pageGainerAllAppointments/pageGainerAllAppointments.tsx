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
  Image,
} from '@mantine/core'
import { IconCheck, IconRotate2, IconX } from '@tabler/icons-react'
import { da } from 'date-fns/locale'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetGainerAllAppointment } from '../../api/appointment/useGetGainerAllAppointments'
import { NavbarAdmin } from '../HomepageAdmin/NavbarAdmin'
import { CardAppoimentForGainer, TInfoAppForGainer } from './CardAppoimentForGainer'

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

const GainerAllAppointments = () => {
  const { classes, theme } = useStyles()
  const { gainerUuid } = useParams()
  const successCallback = (data: any) => {}

  const { data } = useGetGainerAllAppointment(successCallback, gainerUuid)

  useEffect(() => {}, [data])

  const cardsAppointmentInProgress = data?.data.response.map(
    (card: TInfoAppForGainer) =>
      (card.status === 'În procesare' ||
        card.status === 'În confirmare' ||
        card.status === 'În verificare') && (
        <CardAppoimentForGainer
          appointmentUuid={card.appointmentUuid}
          city={card.city}
          dateOfAppointment={card.dateOfAppointment}
          email={card.email}
          firstname={card.firstname}
          gainerUuid={card.gainerUuid}
          lastname={card.lastname}
          photo={card.photo}
          status={card.status}
          userUuid={card.userUuid}
          timeVolunteering={card.timeVolunteering}
          countTime={0}
          gender={card.gender}
          phoneNumber={card.phoneNumber}
          role={card.role}
        />
      ),
  )

  const cardsAppointmentCancel = data?.data.response.map(
    (card: TInfoAppForGainer) =>
      card.status === 'Anulat' && (
        <CardAppoimentForGainer
          appointmentUuid={card.appointmentUuid}
          city={card.city}
          dateOfAppointment={card.dateOfAppointment}
          email={card.email}
          firstname={card.firstname}
          gainerUuid={card.gainerUuid}
          lastname={card.lastname}
          photo={card.photo}
          status={card.status}
          userUuid={card.userUuid}
          timeVolunteering={card.timeVolunteering}
          countTime={0}
          gender={card.gender}
          phoneNumber={card.phoneNumber}
          role={card.role}
        />
      ),
  )
  const cardsAppointmentComplete = data?.data.response.map(
    (card: TInfoAppForGainer) =>
      card.status === 'Finalizat' && (
        <CardAppoimentForGainer
          appointmentUuid={card.appointmentUuid}
          city={card.city}
          dateOfAppointment={card.dateOfAppointment}
          email={card.email}
          firstname={card.firstname}
          gainerUuid={card.gainerUuid}
          lastname={card.lastname}
          photo={card.photo}
          status={card.status}
          userUuid={card.userUuid}
          timeVolunteering={card.timeVolunteering}
          countTime={0}
          gender={card.gender}
          phoneNumber={card.phoneNumber}
          role={card.role}
        />
      ),
  )
  console.log(data?.data)
  return (
    <BackgroundImage src="/backround.png">
      <Container className={classes.wrapper} fluid p={16}>
        <Paper className={classes.paper}>
          <NavbarAdmin />
          <Paper className={classes.paperTable}>
            <Flex p={10} w={'100%'} direction={'column'}>
              <Text ta="center" fw={700} c={theme.colors.brand[6]} size={'xl'} mt={5}>
                Programări
              </Text>
              <Tabs defaultValue="progress">
                <Tabs.List>
                  <Tabs.Tab
                    value="progress"
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
                        {}
                      </Badge>
                    }
                  >
                    În așteptare
                  </Tabs.Tab>
                  <Tabs.Tab value="complete" icon={<IconCheck size="0.8rem" />}>
                    Finalizat
                  </Tabs.Tab>
                  <Tabs.Tab value="cancel" icon={<IconX size="0.8rem" />}>
                    Anulat
                  </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="progress" pt="xs">
                  <ScrollArea type="auto" h={'77vh'}>
                    {cardsAppointmentInProgress ? (
                      cardsAppointmentInProgress
                    ) : (
                      <Text>Momentan nu există nicio o programre</Text>
                    )}
                  </ScrollArea>
                </Tabs.Panel>

                <Tabs.Panel value="cancel" pt="xs">
                  <>
                    <Text>Momentan nu există nicio o programre</Text>
                    <Image src={'attention.png'}></Image>
                  </>
                  <ScrollArea type="auto" h={'77vh'}>
                    {cardsAppointmentCancel}
                  </ScrollArea>
                </Tabs.Panel>
                <Tabs.Panel value="complete" pt="xs">
                  <ScrollArea type="auto" h={'77vh'}>
                    {cardsAppointmentComplete ? (
                      cardsAppointmentComplete
                    ) : (
                      <Image src={'attention.png'}></Image>
                    )}
                  </ScrollArea>
                </Tabs.Panel>
              </Tabs>
            </Flex>
          </Paper>
        </Paper>
      </Container>
    </BackgroundImage>
  )
}
export default GainerAllAppointments
