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
  LoadingOverlay,
} from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { IconPin } from '@tabler/icons-react'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { CardActivities } from './CardActivitis'
import { NavigationBar } from '../Navbar'
import { setLocation, setHelpTypeId, resetActions, setIntervalDate } from '../../Redux/filter/slice'
import { cities } from '../../aseert/city'
import { useGetGainersFilter } from '../../api/gainer/useGetGainersFilter'

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
  cityGainer: string
  dateOfBirth?: Date
  description: string
  gainerUuid: string
  gender: string
  helpTypeUuid: string
  nameHelpType: string
  nameGainer: string
  numberPhone: string
  listOfDates: string
  photoGainer: string
}
export const Activites = () => {
  const { classes } = useStyles()
  const dispatch = useDispatch()
  const [date, setDate] = useState<[Date | null, Date | null]>([null, null])
  const [helpTypeValue, setHelpTypeValue] = useState<string>('')
  const [cityValue, setCityValue] = useState<string>('')

  const { data, refetch, isLoading, isRefetching } = useGetGainersFilter()

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

  const cardsGainer = data?.data.response.map((card: TInfoGainer, index: number) => (
    <CardActivities
      key={index}
      cityGainer={card.cityGainer}
      description={card.description}
      gainerUuid={card.gainerUuid}
      nameGainer={card.nameGainer}
      age={age(card.dateOfBirth)}
      helpTypeName={card.nameHelpType}
      listOfDates={card.listOfDates}
      photoGainer={card.photoGainer}
    />
  ))

  const onFilter = () => {
    dispatch(setHelpTypeId(helpTypeValue))
    dispatch(setLocation(cityValue))
    if (String(date).length > 5) {
      dispatch(setIntervalDate(String(date)))
    }
    refetch()
  }

  const resetFilter = () => {
    dispatch(resetActions())
    setCityValue('')
    setHelpTypeValue('')
    setDate([null, null])
    refetch()
  }

  // useEffect(() => {}, [])
  return (
    <BackgroundImage src="/backround.png">
      <Container className={classes.wrapper} fluid p={16}>
        <Paper className={classes.paper}>
          <LoadingOverlay visible={isLoading || isRefetching} />
          <NavigationBar />
          <Paper className={classes.paperActivites}>
            <Grid h={'100%'} p={0}>
              <Grid.Col span={9} p={20} pr={5} h={'100%'}>
                <Title order={1} className={classes.title} my={10}>
                  Alege cui să faci bine ...
                </Title>
                {data && data.data.response.length ? (
                  <ScrollArea h={'93%'} offsetScrollbars>
                    <Flex direction={'column'} gap={10} p={15}>
                      {cardsGainer}
                    </Flex>
                  </ScrollArea>
                ) : (
                  <Stack align={'center'} spacing={0} h={'70%'} justify="center">
                    <Image src="noResult.png" maw={'45%'} w="auto" p={'xl'} />
                    <Text size={20} fw={700} align="center" c="white">
                      Nu s-a găsit nici un rezultat.
                    </Text>
                    <Text size={13} align="center" c="white">
                      Ne pare rău, nu am putut găsi ce cauți.
                    </Text>
                    <Text size={13} align="center" c="white">
                      Încercă să cauți din nou.
                    </Text>
                  </Stack>
                )}
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
                        value={helpTypeValue}
                        onChange={(e: string) => setHelpTypeValue(e)}
                        data={[
                          { value: '1', label: 'Curățenie' },
                          { value: '2', label: 'Cumpărături' },
                          { value: '3', label: 'Companie' },
                          { value: '4', label: 'Îngrijire' },
                        ]}
                        icon={<Image src="/hand.png" height={'1rem'} width={'1rem'} />}
                      />
                      <Select
                        classNames={{ input: classes.select }}
                        radius={'xl'}
                        value={cityValue}
                        onChange={(e: string) => setCityValue(e)}
                        searchable
                        placeholder="Locație"
                        data={cities}
                        icon={<IconPin size="1rem" />}
                      />
                    </Flex>
                    <Button radius={'xl'} onClick={() => onFilter()}>
                      Filtreză
                    </Button>
                    <Button radius={'xl'} variant="light" onClick={resetFilter}>
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
