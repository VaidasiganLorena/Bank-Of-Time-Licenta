import {
  BackgroundImage,
  Container,
  createStyles,
  Flex,
  Paper,
  ScrollArea,
  Tabs,
  Text,
  Image,
  Breadcrumbs,
  Anchor,
} from '@mantine/core'
import { IconCheck, IconX } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useGetGainerAllAppointment } from '../../api/appointment/useGetGainerAllAppointments'
import { RootState } from '../../Redux/store'
import { IGainer } from '../../types/typeGainer'
import { NavbarAdmin } from '../NavbarAdmin'

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
    width: '98%',
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
  const { gainersEntriesData } = useSelector((state: RootState) => state.gainers)
  const [dataGainer, setDataGainer] = useState<IGainer>()
  useEffect(() => {
    const data = gainersEntriesData.find((item) => item.gainerUuid === gainerUuid)
    setDataGainer(data)
  }, [gainersEntriesData])

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
  const items = [
    { title: 'Beneficiari', href: '/gainers' },
    { title: `${dataGainer?.nameGainer}`, href: '#' },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ))
  console.log(cardsAppointmentCancel)
  return (
    <BackgroundImage src="/backround.png">
      <Container className={classes.wrapper} fluid p={16}>
        <Paper className={classes.paper}>
          <NavbarAdmin />
          <Flex direction={'column'} w="100%">
            <Breadcrumbs
              separator="→"
              ml="xl"
              mt="md"
              styles={{
                root: { fontSize: 20, fontWeight: 650 },
                separator: { color: '#28886f', fontWeight: 700 },
              }}
            >
              {items}
            </Breadcrumbs>
            <Paper className={classes.paperTable}>
              <Flex p={10} w={'100%'} direction={'column'}>
                <Text ta="center" fw={700} c={theme.colors.brand[6]} size={'xl'} mt={5}></Text>
                <Tabs defaultValue="complete">
                  <Tabs.List grow>
                    <Tabs.Tab value="complete" icon={<IconCheck size="0.8rem" />}>
                      Finalizat
                    </Tabs.Tab>
                    <Tabs.Tab value="cancel" icon={<IconX size="0.8rem" />}>
                      Anulat
                    </Tabs.Tab>
                  </Tabs.List>

                  <Tabs.Panel value="cancel" pt="xs">
                    <ScrollArea type="auto" h={'77vh'}>
                      {cardsAppointmentCancel ? (
                        cardsAppointmentCancel
                      ) : (
                        <Image src={'/noResult.png'}></Image>
                      )}
                    </ScrollArea>
                  </Tabs.Panel>
                  <Tabs.Panel value="complete" pt="xs">
                    <ScrollArea type="auto" h={'77vh'}>
                      {cardsAppointmentComplete ? (
                        cardsAppointmentComplete
                      ) : (
                        <Image src={'/noResult.png'}></Image>
                      )}
                    </ScrollArea>
                  </Tabs.Panel>
                </Tabs>
              </Flex>
            </Paper>
          </Flex>
        </Paper>
      </Container>
    </BackgroundImage>
  )
}
export default GainerAllAppointments
