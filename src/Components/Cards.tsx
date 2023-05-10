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
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconCalendarEvent, IconClock } from '@tabler/icons-react'
import React, { FunctionComponent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePostAppointment } from '../api/appointment/usePostAppointment'

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
export const Cards: FunctionComponent<TInfoGainerCard> = (props) => {
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
  const userUuid = localStorage.getItem('userUuid')
  const { classes } = useStyles()
  const dates = listOfDates.split(',')

  const succesCallBack = (data: string, status: number) => {
    if (status === 200) {
      navigate('/account')
    }
  }
  const errorCallBack = (data: any) => {
    if (data.status === 400) {
      console.log(data)
    }
  }
  const { mutate } = usePostAppointment(succesCallBack, errorCallBack)
  const onAppointment = () => {
    mutate({
      userUuid: userUuid ? userUuid : '',
      gainerUuid: gainerUuid,
      dateOfAppointment: dateOfAppointment ? dateOfAppointment : '',
      status: 'În așteptare',
      timeVolunteering: timeVolunteering ? parseInt(timeVolunteering) : 0,
    })
  }
  return (
    <>
      <Card radius="lg" p={0} className={classes.card} key={gainerUuid}>
        <Group noWrap spacing={0}>
          <Image src={photoGainer} height={200} width={200} />
          <div className={classes.body}>
            <Group mb={10}>
              <Text className={classes.title} size="xl">
                {nameGainer}
              </Text>
              <Flex align={'center'} justify="space-around" w={'20%'}>
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
          data={dates}
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
