import { Container, Group, createStyles, rem, Paper, Text, Flex, Image } from '@mantine/core'
import React, { FunctionComponent } from 'react'
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

export const DisableFormPersonalData: FunctionComponent<TInfoUser> = (props) => {
  const { firstname, lastname, email, phoneNumber, gender, city, photo } = props
  const { classes } = useStyles()

  return (
    <Flex direction={'column'} align="center">
      <Image src={photo} radius="xl" width="15rem" height="13rem"></Image>
      <Container p={0} mb={20}>
        <Group position="center" spacing={15} mt={'1rem'}>
          <Paper radius={10} bg="#f3f5f7" className={classes.input}>
            <Flex direction={'column'} gap={0}>
              <Text c={'dimmed'} size={'sm'}>
                Nume
              </Text>{' '}
              {lastname}
            </Flex>
          </Paper>

          <Paper radius={10} bg="#f3f5f7" className={classes.input}>
            <Flex direction={'column'} gap={0}>
              <Text c={'dimmed'} size={'sm'}>
                Prenume
              </Text>{' '}
              {firstname}
            </Flex>
          </Paper>
        </Group>
        <Group position="center" mt={'1rem'} spacing={15}>
          <Paper radius={10} bg="#f3f5f7" className={classes.input}>
            <Flex direction={'column'} gap={0}>
              <Text c={'dimmed'} size={'sm'}>
                Adresa de email
              </Text>{' '}
              {email}
            </Flex>
          </Paper>
          <Paper radius={10} bg="#f3f5f7" className={classes.input}>
            <Flex direction={'column'} gap={0}>
              <Text c={'dimmed'} size={'sm'}>
                Număr de telefon
              </Text>{' '}
              {phoneNumber}
            </Flex>
          </Paper>
        </Group>

        <Group position="center" mt={'1rem'} spacing={15}>
          <Paper radius={10} bg="#f3f5f7" className={classes.input}>
            <Flex direction={'column'} gap={0}>
              <Text c={'dimmed'} size={'sm'}>
                Oraș
              </Text>{' '}
              {city}
            </Flex>
          </Paper>
          <Paper radius={10} bg="#f3f5f7" className={classes.input}>
            <Flex direction={'column'} gap={0}>
              <Text c={'dimmed'} size={'sm'}>
                Gen
              </Text>{' '}
              {gender}
            </Flex>
          </Paper>
        </Group>
      </Container>
    </Flex>
  )
}
