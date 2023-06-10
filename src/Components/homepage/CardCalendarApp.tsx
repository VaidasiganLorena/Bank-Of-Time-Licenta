import { createStyles, Avatar, Text, Group, Paper, Stack } from '@mantine/core'
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
    <Paper withBorder radius={'xl'} m={'xs'} w="auto" component="a" href="/my-activity">
      <Group noWrap>
        <Avatar src={avatar} size={50} radius="xl" />

        <Stack spacing={0} mt={3} align="center">
          <Text fz="lg" fw={500} className={classes.name}>
            {name}
          </Text>
          <Text fz="xs" fw={500} c="dimmed">
            {date}
          </Text>
        </Stack>

        {/* <Group noWrap spacing={10} mt={5}>
            <IconPhoneCall stroke={1.5} size="1rem" className={classes.icon} />
            <Text fz="xs" c="dimmed">
              {phone}
            </Text>
          </Group> */}
      </Group>
    </Paper>
  )
}
