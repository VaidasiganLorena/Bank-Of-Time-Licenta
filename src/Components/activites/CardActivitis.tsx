import {
  Card,
  Group,
  Text,
  Image,
  createStyles,
  Chip,
  Flex,
  Button,
  Modal,
  Select,
  Overlay,
  Stack,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconCalendarEvent, IconClock } from '@tabler/icons-react'
import moment from 'moment'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { usePostAppointment } from '../../api/appointment/usePostAppointment'
import { useUpdateListOfDates } from '../../api/user/useUpdateListOfDates'
import { setErrorNotification, setMessageNotification } from '../../Redux/notification/slice'

const useStyles = createStyles((theme) => ({
  card: {
    cursor: 'pointer',

    backgroundColor: 'white',
    boxShadow: '0px 0px 7px 0px rgba(143,143,143,1)',

    '&:hover': {
      transform: 'scale(1.03)',
      boxShadow: theme.shadows.lg,
    },
  },

  title: {
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.2,
  },

  body: {
    padding: theme.spacing.md,
    width: '100%',
  },
}))
type TInfoGainerCard = {
  cityGainer: string
  description: string
  gainerUuid: string
  nameGainer: string
  age: number
  helpTypeUuid?: string
  helpTypeName: string
  listOfDates: string
  photoGainer: string
}
export const CardActivities: FunctionComponent<TInfoGainerCard> = (props) => {
  const {
    nameGainer,
    description,
    cityGainer,
    age,
    gainerUuid,
    helpTypeName,
    listOfDates,
    photoGainer,
  } = props
  const [opened, { open, close }] = useDisclosure(false)
  const navigate = useNavigate()
  const [dateOfAppointment, setDateOfAppointment] = useState<string | null>('')
  const [timeVolunteering, setTimeVolunteering] = useState<string | null>('')
  const userUuid = sessionStorage.getItem('userUuid')
  const dispatch = useDispatch()
  const { classes } = useStyles()

  const valueDate = listOfDates.split(',')
  const selectDate: { value: string; label: string }[] = []

  valueDate.map((data) => selectDate.push({ value: data, label: moment(data).format('L') }))

  const succesCallBackCreateApp = (response: string, status: number) => {
    if (status === 200) {
      dispatch(setMessageNotification(response))
      navigate('/my-activity')
    }
  }
  const succesCallBack = () => {}
  const errorCallBack = (error: any) => {
    dispatch(setErrorNotification(`Te rog încearcă mai târziu! ${error}.`))
  }

  const updatedDates = valueDate.filter((element) => element !== dateOfAppointment)

  const { mutate: mutateUpdate } = useUpdateListOfDates(succesCallBack, gainerUuid)
  const { mutate } = usePostAppointment(succesCallBackCreateApp, errorCallBack)
  const onAppointment = () => {
    mutate({
      userUuid: userUuid ? userUuid : '',
      gainerUuid: gainerUuid,
      dateOfAppointment: dateOfAppointment ? dateOfAppointment : '',
      status: 'În verificare',
      timeVolunteering: timeVolunteering ? parseInt(timeVolunteering) : 0,
    })
    mutateUpdate({ listOfDates: String(updatedDates) })
  }
  useEffect(() => {}, [])

  return (
    <>
      <Card radius="lg" p={0} className={classes.card} key={gainerUuid}>
        {listOfDates.length === 0 && (
          <Overlay blur={2} color="#fff" opacity={0.43} center>
            <Stack spacing={0} justify="center">
              <Text size={16} c="#021812" fw="semibold" align="center">
                Ne pare rău, această persoană este indisponibilă momentan.
              </Text>
              <Text size={13} c="dimmed" align="center">
                Calendarul pentru programări necesită actualizare.
              </Text>
            </Stack>
          </Overlay>
        )}
        <Group noWrap spacing={0}>
          <Image src={photoGainer} height={200} width={200} />
          <div className={classes.body}>
            <Group mb={10}>
              <Text className={classes.title} size="xl">
                {nameGainer}
              </Text>
              <Flex align={'center'} justify="space-around" w={'auto'} gap={5}>
                <Text size="sm">•</Text>
                <Text size="sm">{age}</Text>
                <Text size="sm">•</Text>
                <Text size="sm">{cityGainer}</Text>
                <Text size="sm">•</Text>
              </Flex>
            </Group>

            <Text color="dimmed" weight={500} size="sm">
              {description}
            </Text>

            <Group spacing="xs" align={'center'} position="apart" mt={'xs'}>
              <Group>
                <Text size="sm">Ajutor pentru :</Text>
                <Chip checked={true} color="teal" size={'xs'}>
                  {helpTypeName}
                </Chip>
              </Group>

              <Button onClick={open} radius={'xl'} bg="#28886f">
                Ajută
              </Button>
            </Group>
          </div>
        </Group>
      </Card>
      <Modal
        opened={opened}
        onClose={close}
        radius="lg"
        title="Alege când ești disponibil să ajuți.."
        centered
      >
        <Select
          radius={'xl'}
          label="Datele disponibile"
          placeholder="Alege data potrivită"
          value={dateOfAppointment}
          onChange={setDateOfAppointment}
          data={selectDate}
          icon={<IconCalendarEvent size="1rem" />}
          maxDropdownHeight={100}
        />
        <Select
          radius={'xl'}
          label="Numărul de ore"
          placeholder="Alege îm funcție de disponibilitatea ta"
          value={timeVolunteering}
          onChange={setTimeVolunteering}
          data={['2', '3', '4', '5', '6', '7', '8']}
          icon={<IconClock size="1rem" />}
          maxDropdownHeight={100}
        />

        <Flex w="100%" justify={'flex-end'}>
          <Button onClick={onAppointment} my={20} radius={'xl'}>
            Programează
          </Button>
        </Flex>
      </Modal>
    </>
  )
}
