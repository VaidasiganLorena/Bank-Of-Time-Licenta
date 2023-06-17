import {
  Card,
  Group,
  Text,
  Image,
  createStyles,
  Flex,
  Button,
  Stack,
  LoadingOverlay,
} from '@mantine/core'
import { IconSend } from '@tabler/icons-react'
import moment from 'moment'
import 'moment/locale/ro'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { useDeleteAppointment } from '../../api/appointment/useDeleteAppointment'
import { useGetAllAppointment } from '../../api/appointment/useGetAllAppoiments'
import { useUpdateStatus } from '../../api/appointment/useUpdateStatus'
import { useUpdateTimeVolunteering } from '../../api/user/useUpdateTimeVolunteering'
import { useSendMail } from '../../api/useSendMail'
import { GenericDeleteModal } from '../../Components/deleteModal/deleteModal'

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
  const [isDisableButtonSendEmail, setDisableButtonSendEmail] = useState(false)
  const [isDisableButtonConfimation, setDisableButtonConfimation] = useState(false)
  const { mutate } = useSendMail(succesCallbackMail)
  const currentDate = moment()
  const [showCancelMoadal, setShowCancelModal] = useState(false)
  const dateOfAppointmentRemainder = moment(dataApp?.dateOfAppointment)
    .subtract(7, 'days')
    .valueOf()

  const [mesageTimeChangeStatus, setMessageTimeChangeStatus] = useState('')
  const [mesageTimeChangeStatusConfimationBtn, setMesageTimeChangeStatusConfimationBtn] =
    useState('')
  const successCallbackAllApp = () => {}
  const { refetch, isRefetching } = useGetAllAppointment(successCallbackAllApp)
  const succesCallbackUpdate = () => {
    refetch()
  }
  const succesCallbackTime = () => {
    refetch()
  }
  const { mutate: mutateUpdateStatus, isLoading } = useUpdateStatus(
    succesCallbackUpdate,
    dataApp?.appointmentUuid,
  )
  const { mutate: mutateUpdateTimeVounteering } = useUpdateTimeVolunteering(
    succesCallbackTime,
    dataApp?.userUuid,
  )

  useEffect(() => {
    if (dateOfAppointmentRemainder <= currentDate.valueOf()) {
      setDisableButtonSendEmail(false)
    } else {
      setDisableButtonSendEmail(true)
      setMessageTimeChangeStatus(moment(dateOfAppointmentRemainder).endOf('day').fromNow())
    }
    let timeStampAppDate = moment(dataApp?.dateOfAppointment).add(1, 'days').valueOf()

    if (timeStampAppDate < currentDate.valueOf() && dataApp?.status === 'În confirmare') {
      setDisableButtonConfimation(false)
    } else {
      setDisableButtonConfimation(true)

      setMesageTimeChangeStatusConfimationBtn(moment(timeStampAppDate).endOf('day').fromNow())
    }
  }, [currentDate])
  const succesCallbackDelete = () => {}
  const errorCallbackDelete = () => {}

  const { mutate: mutateDelete, isLoading: isLoadingDelete } = useDeleteAppointment(
    succesCallbackDelete,
    errorCallbackDelete,
    dataApp.appointmentUuid,
  )
  const onDeleteApp = () => {
    if (dataApp) {
      mutateDelete()
      refetch()
    }
  }
  return dataApp?.status === 'Anulat' || dataApp?.status === 'Finalizat' ? null : (
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
              <Text size="sm">{moment(dataApp?.dateOfAppointment).format('L')}</Text>
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
                w="10rem"
                onClick={() => {
                  mutate({
                    email: dataApp.email,
                    adress: dataApp.adress,
                    firstName: dataApp.firstname,
                    nameGainer: dataApp.nameGainer,
                    dateOfAppointment: moment(dataApp.dateOfAppointment).format('L'),
                    cityGainer: dataApp.cityGainer,
                  })
                  mutateUpdateStatus({ status: 'În confirmare' })
                  refetch()
                }}
                disabled={isDisableButtonSendEmail}
                leftIcon={<IconSend size={'1rem'} />}
              >
                Trimite email
              </Button>
              {isDisableButtonSendEmail ? (
                <Text size={'xs'} c="dimmed">
                  Butonul se va activa {mesageTimeChangeStatus}
                </Text>
              ) : null}
            </Stack>
          ) : dataApp?.status === 'În confirmare' ? (
            <Stack spacing={5} align="center">
              <Group align="flex-start">
                <Button
                  radius={'xl'}
                  disabled={isDisableButtonConfimation}
                  onClick={() => {
                    mutateUpdateTimeVounteering({ timeVolunteering: dataApp.timeVolunteering })
                    mutateUpdateStatus({ status: 'Finalizat' })
                  }}
                >
                  Aprobat
                </Button>

                <Button
                  variant={'outline'}
                  radius={'xl'}
                  disabled={isDisableButtonConfimation}
                  onClick={() => {
                    mutateUpdateStatus({ status: 'Anulat' })
                    refetch()
                  }}
                >
                  Anulat
                </Button>
              </Group>{' '}
              {isDisableButtonConfimation ? (
                <Text size={'xs'} c="dimmed">
                  Butoanele se vor activa {mesageTimeChangeStatusConfimationBtn}
                </Text>
              ) : null}
            </Stack>
          ) : (
            <Group>
              <Button
                radius={'xl'}
                onClick={() => {
                  mutateUpdateStatus({ status: 'În procesare' })
                  refetch()
                }}
              >
                Verificat
              </Button>{' '}
              <Button
                variant={'outline'}
                radius={'xl'}
                onClick={() => {
                  setShowCancelModal(true)
                  refetch()
                }}
              >
                Anulat
              </Button>
            </Group>
          )}
        </Group>
      </Flex>
      <GenericDeleteModal
        isOpenModal={showCancelMoadal}
        setOpenModal={setShowCancelModal}
        onDelete={onDeleteApp}
        title={'Ești sigur(ă) că vrei să ștergi programarea?'}
        subTitle={'O dată ce programarea va fi ștearsă acesta nu se mai poate recupera. '}
        mainActionText={'Ștergere'}
        isLoading={isLoadingDelete}
      />
      <LoadingOverlay visible={isLoading} />
    </Card>
  )
}
