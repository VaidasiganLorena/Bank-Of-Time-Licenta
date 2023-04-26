import { BackgroundImage, Container, createStyles, Flex, Paper, Text } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

import React from 'react'
import { useGetAppointment } from '../../api/appointment/useGetAppointmentOfUser'
import { NavigationBar } from '../Navbar'
import { CardAppointment } from './CardAppointment'

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
    backgroundColor: '#ffffff80',
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
    paddingLeft: 15,
    borderRadius: 30,
    marginRight: 15,
    width: '100%',
    height: '100%',
    color: 'green',
    [theme.fn.smallerThan('xs')]: {
      marginBottom: 20,
      marginTop: 35,
    },
  },
}))
function Account() {
  const { classes } = useStyles()
  const tablet = useMediaQuery('(max-width: 800px)')
  const userUuid = localStorage.getItem('userUuid')
  const authToken = localStorage.getItem('authToken')
  const successCallBack = (data: any) => {
    console.log(data)
  }
  const { data } = useGetAppointment(successCallBack, userUuid, authToken)
  const cardsAppointment = data?.data.response.map((card: any) => (
    <CardAppointment
      key={card.appointmentUuid}
      name={card.name}
      city={card.city}
      gainerUuid={card.gainerUuid}
      dateOfAppointment={card.dateOfAppointment}
      phoneNumber={card.numberPhone}
      status={card.status}
      photo={card.photo}
    />
  ))
  return (
    <BackgroundImage src="/backround.png">
      <Container className={classes.wrapper} fluid p={16}>
        <Paper className={classes.paper}>
          <NavigationBar />
          <Flex p={10} w={'100%'} direction={tablet ? 'column' : 'row'}>
            <Paper className={classes.paperAppointments}>
              <Text ta="center" fw={700} c="white" size={'xl'} mt={5}>
                Activitatea ta
              </Text>
              {cardsAppointment}
            </Paper>
            <Paper radius={'xl'}>
              <CardAppointment
                name={''}
                city={''}
                gainerUuid={''}
                dateOfAppointment={''}
                phoneNumber={''}
                status={''}
                photo={''}
              />
            </Paper>
          </Flex>
        </Paper>
      </Container>
    </BackgroundImage>
  )
}

export default Account
