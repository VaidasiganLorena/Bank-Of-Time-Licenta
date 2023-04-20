import React, { FunctionComponent } from 'react'
import { Card, createStyles, Group, Text, Avatar, Badge } from '@mantine/core'
import { IconCheck, IconHome, IconPhoneCall } from '@tabler/icons-react'
const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: 'white',
    boxShadow: '0px 0px 7px 0px rgba(143,143,143,1)',
    width: '95%',
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
export const CardAppointments: FunctionComponent = () => {
  const { classes } = useStyles()
  return (
    <>
      <Card radius="lg" p={0} className={classes.card}>
        <div>
          <Group noWrap>
            <Avatar src={'/solidarity.png'} size={94} radius="md" />
            <div>
              <Text fz="lg" fw={500}>
                Elena Matei
              </Text>

              <Group noWrap spacing={10} mt={3}>
                <IconHome stroke={1.5} size="1rem" />
                <Text fz="xs" c="dimmed">
                  Cugir
                </Text>
              </Group>

              <Group noWrap spacing={10} mt={5}>
                <IconPhoneCall stroke={1.5} size="1rem" />
                <Text fz="xs" c="dimmed">
                  85
                </Text>
              </Group>
            </div>
            <Badge color="green" variant="outline" rightSection={<IconCheck size={'1rem'} />}>
              Finalizat
            </Badge>
          </Group>
        </div>
      </Card>
    </>
  )
}
