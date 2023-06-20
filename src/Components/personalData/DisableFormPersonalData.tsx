import { Container, Group, createStyles, rem, Paper, Text, Flex, Image } from '@mantine/core'
import React, { FunctionComponent, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../Redux/store'
import { TInfoUser } from './AvaibleFormPersonalData'
const useStyles = createStyles((theme: any) => ({
  input: {
    height: rem(54),
    backgroundColor: '#f3f5f7',
    paddingLeft: 10,
    paddingTop: 5,
    width: '20vw',
    [theme.fn.largerThan(1800)]: {
      width: '15vw',
    },
    [theme.fn.smallerThan(1300)]: {
      width: '25vw',
    },
    [theme.fn.smallerThan(980)]: {
      width: '40vw',
    },
    [theme.fn.smallerThan('xs')]: {
      width: '70vw',
    },
  },
}))

export const DisableFormPersonalData = () => {
  const { classes } = useStyles()
  const { userData } = useSelector((state: RootState) => state.user)
  return (
    <Flex direction={'column'} align="center">
      <Image src={userData.photo} radius="xl" width="15rem" height="13rem"></Image>
      <Container p={0} mb={20}>
        <Group position="center" spacing={15} mt={'1rem'}>
          <Paper radius={10} bg="#f3f5f7" className={classes.input}>
            <Flex direction={'column'} gap={0}>
              <Text c={'dimmed'} size={'sm'}>
                Nume
              </Text>{' '}
              {userData.lastname}
            </Flex>
          </Paper>

          <Paper radius={10} bg="#f3f5f7" className={classes.input}>
            <Flex direction={'column'} gap={0}>
              <Text c={'dimmed'} size={'sm'}>
                Prenume
              </Text>{' '}
              {userData.firstname}
            </Flex>
          </Paper>
        </Group>
        <Group position="center" mt={'1rem'} spacing={15}>
          <Paper radius={10} bg="#f3f5f7" className={classes.input}>
            <Flex direction={'column'} gap={0}>
              <Text c={'dimmed'} size={'sm'}>
                Adresa de email
              </Text>{' '}
              {userData.email}
            </Flex>
          </Paper>
          <Paper radius={10} bg="#f3f5f7" className={classes.input}>
            <Flex direction={'column'} gap={0}>
              <Text c={'dimmed'} size={'sm'}>
                Număr de telefon
              </Text>{' '}
              {userData.phoneNumber}
            </Flex>
          </Paper>
        </Group>

        <Group position="center" mt={'1rem'} spacing={15}>
          <Paper radius={10} bg="#f3f5f7" className={classes.input}>
            <Flex direction={'column'} gap={0}>
              <Text c={'dimmed'} size={'sm'}>
                Oraș
              </Text>{' '}
              {userData.city}
            </Flex>
          </Paper>
          <Paper radius={10} bg="#f3f5f7" className={classes.input}>
            <Flex direction={'column'} gap={0}>
              <Text c={'dimmed'} size={'sm'}>
                Gen
              </Text>{' '}
              {userData.gender}
            </Flex>
          </Paper>
        </Group>
      </Container>
    </Flex>
  )
}
