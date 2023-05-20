import { Card, Group, Text, Image, createStyles, Flex, Stack } from '@mantine/core'
import moment from 'moment'
import 'moment/locale/ro'
import React, { FunctionComponent } from 'react'

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
export type TInfoAppForGainer = {
  appointmentUuid: number
  city: string
  countTime: number
  dateOfAppointment: string
  email: string
  firstname: string
  gainerUuid: string
  gender: string
  lastname: string
  phoneNumber: string
  photo: string
  role: string
  status: string
  timeVolunteering: number
  userUuid: string
}
export const CardAppoimentForGainer: FunctionComponent<TInfoAppForGainer> = (dataApp?) => {
  const { classes } = useStyles()

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
                    {dataApp.lastname}
                  </Text>
                  <Text className={classes.title} size="xl">
                    {dataApp.firstname}
                  </Text>
                </Group>

                <Stack spacing={0}>
                  <Group>
                    <Text size="sm">Localitea:</Text>
                    <Text size="sm">{dataApp.city}</Text>
                  </Group>
                  <Group>
                    <Text size="sm">Număr de telefon:</Text>
                    <Text size="sm">{dataApp.phoneNumber}</Text>
                  </Group>
                  <Group>
                    <Text size="sm">Email:</Text>
                    <Text size="sm">{dataApp.email}</Text>
                  </Group>
                </Stack>
              </Stack>
            </Group>
            <Stack spacing={0}>
              <Group>
                <Text size="sm">In data de:</Text>
                <Text size="sm">{moment(dataApp.dateOfAppointment).format('L')}</Text>
              </Group>
              <Group>
                <Text size="sm">Durata:</Text>
                <Text size="sm">{dataApp.timeVolunteering}</Text>
                <Text size="sm">ore</Text>
              </Group>
            </Stack>
          </Flex>
        </Flex>
      </Card>
    </>
  )
}
