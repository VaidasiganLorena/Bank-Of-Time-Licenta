import { createStyles, Avatar, Text, Group, Paper } from '@mantine/core'
import { IconPhoneCall, IconAt } from '@tabler/icons-react'

const useStyles = createStyles((theme) => ({
  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
  },

  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}))

interface UserInfoIconsProps {
  avatar: string
  name: string
  date: string
  phone: string
  status: string
}

export const CardCalendarApp = ({ avatar, name, date, phone, status }: UserInfoIconsProps) => {
  const { classes } = useStyles()
  return (
    <Paper withBorder radius={'xl'} m={'xs'}>
      <Group noWrap>
        <Avatar src={avatar} size={50} radius="xl" />
        <div>
          <Text fz="lg" fw={500} className={classes.name}>
            {name}
          </Text>

          <Group noWrap spacing={10} mt={3}>
            {/* <Text fz="xs" c="dimmed">
              {status}
            </Text> */}
            <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
              {date}
            </Text>
          </Group>

          {/* <Group noWrap spacing={10} mt={5}>
            <IconPhoneCall stroke={1.5} size="1rem" className={classes.icon} />
            <Text fz="xs" c="dimmed">
              {phone}
            </Text>
          </Group> */}
        </div>
      </Group>
    </Paper>
  )
}
