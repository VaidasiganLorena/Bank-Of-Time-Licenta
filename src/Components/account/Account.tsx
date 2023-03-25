import {
  BackgroundImage,
  Badge,
  Container,
  createStyles,
  Group,
  Paper,
  Progress,
  rem,
  Text,
  ThemeIcon,
} from '@mantine/core'
import { IconHeart } from '@tabler/icons-react'
import React, { useState } from 'react'
import { NavigationBar } from '../Navbar'
const ICON_SIZE = rem(60)
const useStyles = createStyles((theme: any) => ({
  wrapper: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    [theme.fn.smallerThan(900)]: {
      height: '100%',
    },
  },
  paper: {
    backgroundColor: '#ffffff80',
    borderRadius: 30,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    [theme.fn.smallerThan('xs')]: {
      marginBottom: 20,
      marginTop: 35,
    },
  },
  progress: {
    backgroundColor: theme.colors.background[0],
    paddingTop: 15,
    borderRadius: 30,
    width: '100%',
    height: 'fit-content',
    margin: 15,

    [theme.fn.smallerThan('xs')]: {
      marginBottom: 20,
      marginTop: 35,
    },
  },
  card: {
    position: 'relative',
    overflow: 'visible',
    width: '50%',
    height: '30%',
    borderRadius: 30,
    padding: theme.spacing.xl,
    paddingTop: `calc(${theme.spacing.xl} * 1.5 + ${ICON_SIZE} / 3)`,
  },

  icon: {
    position: 'absolute',
    top: `calc(-${ICON_SIZE} / 3)`,
    left: `calc(50% - ${ICON_SIZE} / 2)`,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
  },
}))
function Account() {
  const { classes } = useStyles()
  const [hoursVolunteering, sethoursVolunteering] = useState(15)
  return (
    <BackgroundImage src="/backround.png">
      <Container className={classes.wrapper} fluid p={16}>
        <Paper className={classes.paper}>
          <NavigationBar />
          <Paper radius="md" withBorder className={classes.card} mt={`calc(${ICON_SIZE} / 3)`}>
            <ThemeIcon className={classes.icon} size={ICON_SIZE} radius={ICON_SIZE}>
              <IconHeart size="2rem" stroke={1.5} />
            </ThemeIcon>

            <Text ta="center" fw={700} className={classes.title}>
              Swimming challenge
            </Text>
            <Text c="dimmed" ta="center" fz="sm">
              32 km / week
            </Text>

            <Group position="apart" mt="xs">
              <Text fz="sm" color="dimmed">
                Progress
              </Text>
              <Text fz="sm" color="dimmed">
                62%
              </Text>
            </Group>

            <Progress value={62} mt={5} />

            <Group position="apart" mt="md">
              <Text fz="sm">20 / 36 km</Text>
              <Badge size="sm">4 days left</Badge>
            </Group>
          </Paper>
        </Paper>
      </Container>
    </BackgroundImage>
  )
}

export default Account
