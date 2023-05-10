import { Card, Group, Text, Image, createStyles, Flex, Button, Stack } from '@mantine/core'
import React, { FunctionComponent, useEffect } from 'react'
import { useSendMail } from '../../api/useSendMail'

const useStyles = createStyles((theme) => ({
  card: {
    width: '97%',
    cursor: 'pointer',
    backgroundColor: 'white',
    boxShadow: '0px 0px 7px 0px rgba(143,143,143,1)',

    '&:hover': {
      transform: 'scale(1.01)',
      boxShadow: '0px 0px 7px 0px rgba(143,143,143,1)',
    },
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
export type TInfoAppCard = {
  adress: string
  appointmentUuid: number
  city: string
  dateOfAppointment: string
  dateOfBirth?: string
  description?: string
  email: string
  firstname: string
  gainerUuid: number
  gender?: string
  helpTypeUuid: string
  lastname: string
  listOfDates?: string
  nameGainer: string
  phoneNumberGainer: string
  password?: string
  phoneNumber: string
  photo: string
  photoGainer: string
  status: string
  userUuid: string
  cityGainer: string
  timeVolunteering: number
}
export const CardAppoimentAdmin: FunctionComponent<TInfoAppCard> = (dataApp?) => {
  const { classes } = useStyles()
  const succesCallbackMail = () => {}
  const { mutate } = useSendMail(succesCallbackMail)
  useEffect(() => {
    console.log(dataApp)
  }, [dataApp])
  return (
    <>
      <Card radius="lg" mx={'xs'} className={classes.card} key={dataApp.appointmentUuid} mt={'xs'}>
        <Flex direction={'column'}>
          <Flex justify={'space-around'}>
            <Group noWrap>
              <Image src={dataApp.photo} height={100} width={100} radius={'md'} />
              <Stack spacing={5}>
                <Group spacing={5}>
                  <Text className={classes.title} size="xl">
                    {dataApp?.lastname}
                  </Text>
                  <Text className={classes.title} size="xl">
                    {dataApp?.firstname}
                  </Text>
                </Group>

                <Stack spacing={0}>
                  <Group>
                    <Text size="sm">Localitea:</Text>
                    <Text size="sm">{dataApp.city}</Text>
                  </Group>
                  <Group>
                    <Text size="sm">Număr de telefon:</Text>
                    <Text size="sm">{dataApp?.phoneNumber}</Text>
                  </Group>
                  <Group>
                    <Text size="sm">Email:</Text>
                    <Text size="sm">{dataApp?.email}</Text>
                  </Group>
                </Stack>
              </Stack>
            </Group>
            <Stack spacing={0}>
              <Group>
                <Text size="sm">Ajutor pentru:</Text>
                <Text size="sm">{dataApp.helpTypeUuid === '1' ? 'Companie' : 'Cumparaturi'}</Text>
              </Group>
              <Group>
                <Text size="sm">In data de:</Text>
                <Text size="sm">{dataApp?.dateOfAppointment}</Text>
              </Group>
              <Group>
                <Text size="sm">Durata:</Text>
                <Text size="sm">{dataApp?.timeVolunteering}</Text>
                <Text size="sm">ore</Text>
              </Group>
            </Stack>

            <Group noWrap>
              <Image src={dataApp?.photoGainer} height={100} width={100} radius={'md'} />
              <Stack spacing={5}>
                <Text className={classes.title} size="xl">
                  {dataApp?.nameGainer}
                </Text>

                <Stack spacing={0}>
                  <Group>
                    <Text size="sm">Localitea:</Text>
                    <Text size="sm">{dataApp.city}</Text>
                  </Group>
                  <Group>
                    <Text size="sm">Număr de telefon:</Text>
                    <Text size="sm">{dataApp?.phoneNumberGainer}</Text>
                  </Group>
                  <Group>
                    <Text size="sm">Adresa:</Text>
                    <Text size="sm">{dataApp?.adress}</Text>
                  </Group>
                </Stack>
              </Stack>
            </Group>
          </Flex>

          <Group position="right">
            {dataApp?.status === 'În așteptare' ? (
              <Button
                radius={'xl'}
                bg="#28886f"
                onClick={() => {
                  mutate({
                    email: dataApp.email,
                    adress: dataApp.adress,
                    firstName: dataApp.firstname,
                    nameGainer: dataApp.nameGainer,
                    dateOfAppointment: dataApp.dateOfAppointment,
                    cityGainer: dataApp.cityGainer,
                  })
                }}
              >
                Trimitre email
              </Button>
            ) : (
              <Button radius={'xl'} bg="#28886f">
                Aprobă
              </Button>
            )}

            <Button radius={'xl'} bg="#28886f">
              Anulează
            </Button>
          </Group>
        </Flex>
      </Card>
    </>
  )
}
