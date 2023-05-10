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
import { IconCheck, IconRotate2, IconX } from '@tabler/icons-react'
import { useGetAllAppointment } from '../../api/appointment/useGetAllAppoiments'
import { useSendMail } from '../../api/useSendMail'
import { NavbarAdmin } from '../HomepageAdmin/NavbarAdmin'
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
  const successCallback = () => {}
  const { data } = useGetAllAppointment(successCallback)

  console.log(data?.data.response)
  const cardsAppointmentCheck = data?.data.response.map(
    (card: TInfoAppCard) =>
      card.status === 'În pregătire' && (
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

  const cardsAppointmentPending = data?.data.response.map(
    (card: TInfoAppCard) =>
      card.status === 'În așteptare' && (
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
                        {data && data.data.numberPendingCards}
                      </Badge>
                    }
                  >
                    Verificare
                  </Tabs.Tab>
                  <Tabs.Tab value="finished" icon={<IconCheck size="0.8rem" />}>
                    În așteptare
                  </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="pending" pt="xs">
                  <ScrollArea type="auto" h={'77vh'}>
                    {cardsAppointmentPending}
                  </ScrollArea>
                </Tabs.Panel>

                <Tabs.Panel value="finished" pt="xs">
                  {cardsAppointmentCheck}
                </Tabs.Panel>
              </Tabs>
            </Flex>
          </Paper>
        </Paper>
      </Container>
    </BackgroundImage>
  )
}
export default Appointments
