import React, { FunctionComponent } from 'react'
import { Card, createStyles, Group, Text, Avatar, Badge, Grid, Stack } from '@mantine/core'
import {
  IconCalendarTime,
  IconCheck,
  IconHome,
  IconPhoneCall,
  IconRotate2,
  IconX,
} from '@tabler/icons-react'

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
  name: string
  city: string
  gainerUuid: string
  dateOfAppointment: string
  phoneNumber: string
  status: string
  photo: string
}
export const CardAppointment: FunctionComponent<IAppointment> = (props) => {
  const { name, phoneNumber, city, dateOfAppointment, status, photo } = props
  const { classes } = useStyles()

  return (
    <>
      <Card radius="lg" p={0} className={classes.card} my={20}>
        <div>
          <Grid align={'center'}>
            <Grid.Col span={2}>
              <Avatar src={photo} size={94} radius="md" />
            </Grid.Col>

            <Grid.Col span={6}>
              <Text fz="lg" fw={500} align={'center'}>
                {name}
              </Text>
              <Group position="center">
                <Group noWrap spacing={10} mt={5}>
                  <IconPhoneCall stroke={1.5} size="1rem" />
                  <Text fz="xs" c="dimmed">
                    {phoneNumber}
                  </Text>
                </Group>

                <Group noWrap spacing={10} mt={5}>
                  <IconHome stroke={1.5} size="1rem" />
                  <Text fz="xs" c="dimmed">
                    {city}
                  </Text>
                </Group>
              </Group>
            </Grid.Col>
            <Grid.Col span={4}>
              <Stack align={'center'} spacing={5}>
                <Group noWrap spacing={10} mt={5}>
                  <IconCalendarTime stroke={1.5} size="1.2rem" />
                  <Text fz="sm" c="dimmed">
                    {dateOfAppointment}
                  </Text>
                </Group>
                <Badge
                  color={
                    status === 'În așteptare' ? 'orange' : status === 'Anulat' ? 'red' : 'green'
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
              </Stack>
            </Grid.Col>
          </Grid>
        </div>
      </Card>
    </>
  )
}
