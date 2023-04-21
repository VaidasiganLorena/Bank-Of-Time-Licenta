import { BackgroundImage, Container, createStyles, Flex, Paper, Text } from '@mantine/core'

import React from 'react'
import { NavigationBar } from '../Navbar'
import { CardAppointments } from './CardAppointments'

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

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
  },

  paperAppointments: {
    backgroundColor: '#689983',
    borderRadius: 30,
    margin: 15,
    width: '70%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.fn.smallerThan('xs')]: {
      marginBottom: 20,
      marginTop: 35,
    },
  },
}))
function Account() {
  const { classes } = useStyles()
  return (
    <BackgroundImage src="/backround.png">
      <Container className={classes.wrapper} fluid p={16}>
        <Paper className={classes.paper}>
          <NavigationBar />
          <Flex direction={'column'} p={10}>
            <Paper className={classes.paperAppointments}>
              <Text ta="center" fw={700} c="white" size={'xl'} mt={5}>
                Activitatea ta
              </Text>
              <CardAppointments />
            </Paper>
          </Flex>
        </Paper>
      </Container>
    </BackgroundImage>
  )
}

export default Account
