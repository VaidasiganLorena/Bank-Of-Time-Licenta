import {
  BackgroundImage,
  Container,
  Paper,
  createStyles,
  Grid,
  Title,
  Flex,
  Text,
  Select,
  Image,
  ScrollArea,
  Divider,
  Stack,
  Button,
} from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { IconPin } from '@tabler/icons-react'
import React, { useEffect, useState } from 'react'
import { useGetInfoGainers } from '../../api/gainer/useGetGainers'
import { Cards } from '../Cards'
import { NavigationBar } from '../Navbar'

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
  paperActivites: {
    backgroundColor: '#689983',
    borderRadius: 30,
    margin: 15,
    width: '100%',
    height: '96%',
    color: 'green',
    [theme.fn.smallerThan('xs')]: {
      marginBottom: 20,
      marginTop: 35,
    },
  },

  title: {
    color: 'white',
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    [theme.fn.smallerThan('md')]: {
      marginBottom: 30,
      marginTop: 30,
      marginLeft: 10,
      marginRight: 10,
    },
  },
  calendar: {
    display: 'flex',
    justifyContent: 'center',
  },
  select: { border: 'none', backgroundColor: '#f3f5f7', marginTop: 10 },
}))
export type TInfoGainer = {
  adress: string
  city: string
  dateOfBirth?: Date
  description: string
  gainerUuid: string
  gender: string
  helpTypeUuid: string
  nameHelpType: string
  name: string
  numberPhone: string
}
export const Activites = () => {
  const { classes } = useStyles()
  const [date, setDate] = useState<[Date | null, Date | null]>([null, null])
  const succesCallBackGetGainers = () => {
    console.log(data)
  }
  const { data } = useGetInfoGainers(succesCallBackGetGainers)

  const age = (dateOfBirth: any) => {
    var today = new Date()
    var DOB = new Date(dateOfBirth)
    var age_now = today.getFullYear() - DOB.getFullYear()
    var m = today.getMonth() - DOB.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < DOB.getDate())) {
      age_now--
    }
    return age_now
  }

  const cardsGainer = data?.data.response.map((card: TInfoGainer) => (
    <Cards
      city={card.city}
      description={card.description}
      gainerUuid={card.gainerUuid}
      name={card.name}
      age={age(card.dateOfBirth)}
      helpTypeName={card.nameHelpType}
    />
  ))
  useEffect(() => {}, [])
  return (
    <BackgroundImage src="/backround.png">
      <Container className={classes.wrapper} fluid p={16}>
        <Paper className={classes.paper}>
          <NavigationBar />
          <Paper className={classes.paperActivites}>
            <Grid h={'100%'} p={0}>
              <Grid.Col span={9} p={20} pr={5} h={'100%'}>
                <Title order={1} className={classes.title} my={10}>
                  Alege cui să faci bine ...
                </Title>

                <ScrollArea h={'95%'} offsetScrollbars>
                  <Flex direction={'column'} gap={10} p={15}>
                    {cardsGainer}
                  </Flex>
                </ScrollArea>
              </Grid.Col>
              <Grid.Col span={3} p={0} h={'100%'}>
                <Paper h={'100%'} mt={8} mr={5} radius={28} p={25}>
                  <DatePicker
                    type="range"
                    value={date}
                    onChange={setDate}
                    size={'xs'}
                    classNames={{ calendar: classes.calendar }}
                  />
                  <Divider mt={20} />
                  <Stack mt={15}>
                    <Text weight={700} size="md" align="center">
                      Filtrează după:
                    </Text>
                    <Flex direction={'column'}>
                      <Select
                        classNames={{ input: classes.select }}
                        placeholder="Tipul ajutorului"
                        radius={'xl'}
                        data={[
                          { value: 'curatenie', label: 'Curățenie' },
                          { value: 'cumparaturi', label: 'Cumpărături' },
                          { value: 'companie', label: 'Companie' },
                          { value: 'ingrijire', label: 'Îngrijire' },
                        ]}
                        icon={<Image src="/hand.png" height={'1rem'} width={'1rem'} />}
                      />

                      <Select
                        classNames={{ input: classes.select }}
                        radius={'xl'}
                        searchable
                        placeholder="Locație"
                        data={[
                          { value: 'cresc', label: 'Cugir' },
                          { value: 'desc', label: 'Timișoara' },
                          { value: 'cresc', label: 'Cluj-Napoca' },
                          { value: 'desc', label: 'Arad' },
                        ]}
                        icon={<IconPin size="1rem" />}
                      />
                    </Flex>
                    <Button radius={'xl'} bg="#28886f">
                      Resetează filtrele
                    </Button>
                  </Stack>
                </Paper>
              </Grid.Col>
            </Grid>
          </Paper>
        </Paper>
      </Container>
    </BackgroundImage>
  )
}
