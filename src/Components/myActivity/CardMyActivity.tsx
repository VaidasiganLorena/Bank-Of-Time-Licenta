import React, { FunctionComponent } from 'react'
import {
  Card,
  createStyles,
  Group,
  Text,
  Avatar,
  Badge,
  Grid,
  Stack,
  Center,
  Flex,
} from '@mantine/core'
import {
  IconCalendarTime,
  IconCheck,
  IconClock,
  IconHome,
  IconPhoneCall,
  IconRotate2,
  IconX,
} from '@tabler/icons-react'
import moment from 'moment'

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: 'white',
    boxShadow: '0px 0px 7px 0px rgba(143,143,143,1)',
    width: '95%',
    height: 'auto',
  },

  title: {
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.2,
  },

  body: {
    padding: theme.spacing.md,
  },
  rightSection: {
    marginTop: 4,
  },
}))
type IAppointment = {
  nameGainer: string
  cityGainer: string
  gainerUuid: string
  dateOfAppointment: string
  phoneNumberGainer: string
  status: string
  photoGainer: string
  timeVolunteering: number
}
export const CardMyActivity: FunctionComponent<IAppointment> = (props) => {
  const {
    nameGainer,
    phoneNumberGainer,
    cityGainer,
    dateOfAppointment,
    status,
    photoGainer,
    timeVolunteering,
  } = props
  const { classes } = useStyles()

  return (
    <>
      <Card radius="lg" p={0} className={classes.card} my={20} ml={10}>
        <Grid align={'center'}>
          <Grid.Col span={2}>
            <Avatar src={photoGainer} size={94} radius="md" />
          </Grid.Col>
          <Grid.Col span={4}>
            <Text fz="lg" fw={500} align={'center'}>
              {nameGainer}
            </Text>
            <Group position="center">
              <Group noWrap spacing={10} mt={5}>
                <IconPhoneCall stroke={1.5} size="1rem" />
                <Text fz="xs" c="dimmed">
                  {phoneNumberGainer}
                </Text>
              </Group>

              <Group noWrap spacing={10} mt={5}>
                <IconHome stroke={1.5} size="1rem" />
                <Text fz="xs" c="dimmed">
                  {cityGainer}
                </Text>
              </Group>
            </Group>
          </Grid.Col>
          <Grid.Col span={3}>
            <Stack align={'center'} spacing={5}>
              <Group noWrap spacing={10} mt={5}>
                <IconCalendarTime stroke={1.5} size="1.2rem" />
                <Text fz="sm" c="dimmed">
                  {moment(dateOfAppointment).format('L')}
                </Text>
              </Group>

              <Group noWrap spacing={10} mt={5}>
                <IconClock stroke={1.5} size="1.2rem" />
                <Text fz="sm" c="dimmed">
                  {timeVolunteering} ore
                </Text>
              </Group>
            </Stack>
          </Grid.Col>

          <Grid.Col span={3}>
            <Center>
              <Flex direction={'column'} align="center">
                <Badge
                  color={
                    status === 'În verificare'
                      ? 'orange'
                      : status === 'În procesare'
                      ? 'yellow'
                      : status === 'Anulat'
                      ? 'red'
                      : status === 'În confirmare'
                      ? 'darkturquise'
                      : 'green'
                  }
                  variant="outline"
                  rightSection={
                    status === 'În așteptare' ? (
                      <IconRotate2 size={'1rem'} />
                    ) : status === 'Anulat' ? (
                      <IconX size={'0.9rem'} />
                    ) : (
                      <IconCheck size={'1rem'} />
                    )
                  }
                  classNames={{ rightSection: classes.rightSection }}
                >
                  {status}
                </Badge>
                {status === 'În confirmare' ? (
                  <Text size={12} c="dimmed">
                    Email primit!
                  </Text>
                ) : status === 'În procesare' ? (
                  <Text size={12} c="dimmed">
                    Urmeaza sa primiti email !
                  </Text>
                ) : null}
              </Flex>
            </Center>
          </Grid.Col>
        </Grid>
      </Card>
    </>
  )
}
