import { Card, Group, Text, Image, createStyles, Flex, Button, Stack } from '@mantine/core'
import { IconSend } from '@tabler/icons-react'
import moment from 'moment'
import 'moment/locale/ro'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { useSendMail } from '../../api/useSendMail'

const useStyles = createStyles((theme) => ({
  card: {
    width: '97%',
    cursor: 'pointer',
    backgroundColor: 'white',
    boxShadow: '0px 0px 7px 0px rgba(143,143,143,1)',

    '&:hover': {
      transform: 'scale(1.01)',
      boxShadow: '0px 0px 7px 0px rgba(143,143,143,1)',
    },
  },

  title: {
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.2,
  },

  body: {
    padding: theme.spacing.md,
  },
}))
export type TInfoAppCard = {
  adress: string
  appointmentUuid: number
  city: string
  dateOfAppointment: string
  dateOfBirth?: string
  description?: string
  email: string
  firstname: string
  gainerUuid: number
  gender?: string
  helpTypeUuid: string
  lastname: string
  listOfDates?: string
  nameGainer: string
  phoneNumberGainer: string
  password?: string
  phoneNumber: string
  photo: string
  photoGainer: string
  status: string
  userUuid: string
  cityGainer: string
  timeVolunteering: number
}
export const CardAppoimentAdmin: FunctionComponent<TInfoAppCard> = (dataApp?) => {
  const { classes } = useStyles()
  const succesCallbackMail = () => {}
  const [isDisable, setDisable] = useState(false)
  const { mutate } = useSendMail(succesCallbackMail)
  useEffect(() => {}, [dataApp])
  const currentDate = new Date(moment().format())
  const dateOfAppointmentRemainder = moment(dataApp?.dateOfAppointment)
    .subtract(7, 'days')
    .calendar()
  //const dateOfApp = new Date(moment(dataApp?.dateOfAppointment).format('DD-MM-YYYY'))
  const [mesageTimeChangeStatus, setMessageTimeChangeStatus] = useState('')

  const changeStatusButtonSendEmail = () => {
    if (new Date(dateOfAppointmentRemainder) <= currentDate) {
      setDisable(false)
    } else {
      setDisable(true)
      setMessageTimeChangeStatus(moment(dateOfAppointmentRemainder, 'L').endOf('day').fromNow())
    }
  }
  useEffect(() => {
    changeStatusButtonSendEmail()
  }, [currentDate])
  return (
    <>
      <Card radius="lg" mx={'xs'} className={classes.card} key={dataApp.appointmentUuid} mt={'xs'}>
        <Flex direction={'column'}>
          <Flex justify={'space-around'}>
            <Group noWrap>
              <Image src={dataApp.photo} height={100} width={100} radius={'md'} />
              <Stack spacing={5}>
                <Group spacing={5}>
                  <Text className={classes.title} size="xl">
                    {dataApp?.lastname}
                  </Text>
                  <Text className={classes.title} size="xl">
                    {dataApp?.firstname}
                  </Text>
                </Group>

                <Stack spacing={0}>
                  <Group>
                    <Text size="sm">Localitea:</Text>
                    <Text size="sm">{dataApp.city}</Text>
                  </Group>
                  <Group>
                    <Text size="sm">Număr de telefon:</Text>
                    <Text size="sm">{dataApp?.phoneNumber}</Text>
                  </Group>
                  <Group>
                    <Text size="sm">Email:</Text>
                    <Text size="sm">{dataApp?.email}</Text>
                  </Group>
                </Stack>
              </Stack>
            </Group>
            <Stack spacing={0}>
              <Group>
                <Text size="sm">Ajutor pentru:</Text>
                <Text size="sm">{dataApp.helpTypeUuid === '1' ? 'Companie' : 'Cumparaturi'}</Text>
              </Group>
              <Group>
                <Text size="sm">In data de:</Text>
                <Text size="sm">{dataApp?.dateOfAppointment}</Text>
              </Group>
              <Group>
                <Text size="sm">Durata:</Text>
                <Text size="sm">{dataApp?.timeVolunteering}</Text>
                <Text size="sm">ore</Text>
              </Group>
            </Stack>

            <Group noWrap>
              <Image src={dataApp?.photoGainer} height={100} width={100} radius={'md'} />
              <Stack spacing={5}>
                <Text className={classes.title} size="xl">
                  {dataApp?.nameGainer}
                </Text>

                <Stack spacing={0}>
                  <Group>
                    <Text size="sm">Localitea:</Text>
                    <Text size="sm">{dataApp.city}</Text>
                  </Group>
                  <Group>
                    <Text size="sm">Număr de telefon:</Text>
                    <Text size="sm">{dataApp?.phoneNumberGainer}</Text>
                  </Group>
                  <Group>
                    <Text size="sm">Adresa:</Text>
                    <Text size="sm">{dataApp?.adress}</Text>
                  </Group>
                </Stack>
              </Stack>
            </Group>
          </Flex>

          <Group position="right">
            {dataApp?.status === 'În procesare' ? (
              <Stack spacing={5}>
                <Button
                  radius={'xl'}
                  onClick={() => {
                    mutate({
                      email: dataApp.email,
                      adress: dataApp.adress,
                      firstName: dataApp.firstname,
                      nameGainer: dataApp.nameGainer,
                      dateOfAppointment: dataApp.dateOfAppointment,
                      cityGainer: dataApp.cityGainer,
                    })
                  }}
                  disabled={isDisable}
                  leftIcon={<IconSend size={'1rem'} />}
                >
                  Trimite email
                </Button>
                {isDisable ? (
                  <Text size={'xs'} c="dimmed">
                    Butonul se va activa {mesageTimeChangeStatus}
                  </Text>
                ) : null}
              </Stack>
            ) : dataApp?.status === 'În confirmare' ? (
              <Button radius={'xl'}>Aprobat</Button>
            ) : (
              <Button radius={'xl'}>Verificat</Button>
            )}
            {dataApp?.status === 'În procesare' ? null : (
              <Button variant={'outline'} radius={'xl'}>
                Anulat
              </Button>
            )}
          </Group>
        </Flex>
      </Card>
    </>
  )
}
