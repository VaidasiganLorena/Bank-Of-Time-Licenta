import {
  BackgroundImage,
  Container,
  createStyles,
  Paper,
  rem,
  Flex,
  LoadingOverlay,
  Title,
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { SetStateAction, useEffect, useState } from 'react'
import { Chart } from 'react-google-charts'
import { useGetAllAppointment } from '../../api/appointment/useGetAllAppoiments'
import { useGetInfoGainers } from '../../api/gainer/useGetGainers'
import { NavbarAdmin } from '../NavbarAdmin'

const ICON_SIZE = rem(60)
export const useStyles = createStyles((theme: any) => ({
  wrapper: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    margin: 0,
    justifyContent: 'flex-start',
    [theme.fn.smallerThan(900)]: {
      height: '100%',
    },
  },
  saveButton: {
    marginTop: 10,
    width: '35%',
    color: '#28886f',
    borderColor: '#28886f',
    borderRadius: 10,
    [theme.fn.smallerThan('md')]: {
      width: 'auto',
    },
    '&:hover': {
      backgroundColor: '#144639',
    },
  },
  cancelButton: {
    marginTop: 10,
    width: '35%',
    borderRadius: 10,
    color: 'white',
    backgroundColor: '#28886f',

    [theme.fn.smallerThan('md')]: {
      width: 'auto',
    },
    '&:hover': {
      backgroundColor: '#004633',
    },
  },
  card: {
    position: 'relative',
    overflow: 'visible',
    width: '100%',
    height: 'fit-content',
    borderRadius: 30,
    padding: theme.spacing.xl,
    paddingTop: `calc(${theme.spacing.xl} * 1.5 + ${ICON_SIZE} / 3)`,
  },
  containerImage: {
    borderRadius: 30,
    width: '100%',
    height: 'fit-content',
    margin: 15,
    padding: theme.spacing.xl,

    [theme.fn.smallerThan('xs')]: {
      marginBottom: 20,
      marginTop: 35,
    },
  },
  icon: {
    position: 'absolute',
    top: `calc(-${ICON_SIZE} / 3)`,
    left: `calc(50% - ${ICON_SIZE} / 2)`,
  },
  root: { width: '100%' },
  inputPassword: {
    backgroundColor: '#f3f5f7',
    width: '100%',
  },
  label: {
    position: 'absolute',
    pointerEvents: 'none',
    color: 'gray',
    fontSize: theme.fontSizes.sm,
    paddingLeft: theme.spacing.sm,
    paddingTop: `calc(${theme.spacing.sm} / 2)`,
    zIndex: 1,
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
  form: {
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
  input: {
    backgroundColor: '#f3f5f7',
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

  title: {
    color: '#154639',
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    [theme.fn.smallerThan('md')]: {
      marginBottom: 30,
      marginTop: 30,
      marginLeft: 10,
      marginRight: 10,
    },
  },

  deleteButton: {
    marginTop: 30,
    width: '35%',
    borderRadius: 10,
    color: 'white',
    backgroundColor: '#fb6b6b',
    borderColor: '#e74646',
    [theme.fn.smallerThan('md')]: {
      width: 'auto',
    },
    '&:hover': {
      backgroundColor: '#144639',
    },
  },
  changePasswordButton: {
    marginTop: 30,
    width: '35%',
    borderRadius: 10,
    color: 'white',
    backgroundColor: '#617a78',
    borderColor: '#28886f',
    [theme.fn.smallerThan('md')]: {
      width: 'auto',
    },
    '&:hover': {
      backgroundColor: '#3d4146',
    },
  },

  editButton: {
    width: '35%',
    backgroundColor: '#28886f',
    borderRadius: 10,
    [theme.fn.smallerThan('md')]: {
      width: 'auto',
    },
    '&:hover': {
      backgroundColor: '#144639',
    },
  },

  flex: {
    width: '100%',
  },
}))

export const Statistics = () => {
  const { classes, theme } = useStyles()
  const tablet = useMediaQuery('(max-width: 800px)')
  const [nrTypeShopping, setNrTypeShopping] = useState(0)
  const [nrTypeCleaning, setNrTypeCleaning] = useState(0)
  const [nrTypeCompany, setNrTypeCompany] = useState(0)
  const [nrTypeCare, setNrTypeCare] = useState(0)
  const [nrGenderF, setNrGenderF] = useState(0)
  const [nrGenderM, setNrGenderM] = useState(0)
  const [nrOver65, setNrOver65] = useState(0)
  const [nrUnder65, setNrUnder65] = useState(0)
  const [arrayCity, setArrayCity] = useState<any[]>([])
  const succesCallback = () => {}
  const { data: dataGainers, isLoading } = useGetInfoGainers(succesCallback)

  useEffect(() => {
    let nrShop = 0
    let nrClean = 0
    let nrCompany = 0
    let nrCare = 0
    dataGainers &&
      dataGainers.data.response.forEach((element: any) => {
        if (element.helpTypeUuid === '1') {
          nrClean = nrClean + 1
        } else if (element.helpTypeUuid === '2') {
          nrShop = nrShop + 1
        } else if (element.helpTypeUuid === '3') {
          nrCompany = nrCompany + 1
        } else if (element.helpTypeUuid === '4') {
          nrCare = nrCare + 1
        }
      })
    setNrTypeCare(nrCare)
    setNrTypeCleaning(nrClean)
    setNrTypeCompany(nrCompany)
    setNrTypeShopping(nrShop)
  }, [dataGainers])
  useEffect(() => {
    let nrFeminin = 0
    let nrMasculin = 0
    dataGainers &&
      dataGainers.data.response.forEach((element: any) => {
        if (element.genderGainer === 'Feminin') {
          nrFeminin = nrFeminin + 1
        } else {
          nrMasculin = nrMasculin + 1
        }
      })
    setNrGenderF(nrFeminin)
    setNrGenderM(nrMasculin)
  }, [dataGainers])
  useEffect(() => {
    let nrUnder65 = 0
    let nrOver65 = 0
    dataGainers &&
      dataGainers.data.response.forEach((element: any) => {
        var today = new Date()
        var DOB = new Date(element.dateOfBirth)
        var age_now = today.getFullYear() - DOB.getFullYear()
        var m = today.getMonth() - DOB.getMonth()

        if (m < 0 || (m === 0 && today.getDate() < DOB.getDate())) {
          age_now--
        }
        if (age_now <= 65) {
          nrUnder65 = nrUnder65 + 1
        } else if (age_now > 65) {
          nrOver65 = nrOver65 + 1
        }
      })
    setNrUnder65(nrUnder65)
    setNrOver65(nrOver65)
  }, [dataGainers])

  const dataStatisticTypeHelp = [
    ['Tip ajutor', 'Nr. persoane', { role: 'style' }],
    ['Cumpăraturi', nrTypeShopping, '#ead9c6'],
    ['Îngrijire', nrTypeCare, '#689983'],
    ['Companie', nrTypeCompany, '#c8c7a9'],
    ['Curățenie', nrTypeCleaning, '#92d5b7'],
  ]

  const dataStatisticGender = [
    ['Genul', 'Nr. persoane'],
    ['Masculin', nrGenderM],
    ['Feminin', nrGenderF],
  ]
  const dataStatisticAge = [
    ['Vârsta', 'Nr. persoane'],
    ['Peste 65', nrOver65],
    ['Sub 65', nrUnder65],
  ]
  const dataStatisticCity = [['Oraș', 'Nr. persoane']]
  useEffect(() => {
    const array: any[] = []
    dataGainers &&
      dataGainers.data.response.forEach((element: any) => {
        array.push(element.cityGainer)
      })
    setArrayCity(array)
  }, [dataGainers])

  return (
    <BackgroundImage src="/backround.png">
      <Container className={classes.wrapper} fluid p={16}>
        <Paper withBorder className={classes.paper}>
          <NavbarAdmin />

          <Flex mr={20} direction={tablet ? 'column' : 'row'} className={classes.flex}>
            <Paper className={classes.containerImage} radius={0} p={15} withBorder>
              <Title order={2} c={theme.colors.brand[5]} mx={20} mt={10} mb={20} align="center">
                Aici poți vizualiza statistici despre beneficiari
              </Title>
              <Flex direction={'row'} h={'100%'} w="100%" align={'center'} justify="center">
                <Chart
                  chartType="ColumnChart"
                  width="95%"
                  height="75vh"
                  data={dataStatisticTypeHelp}
                  options={{ title: 'Statistica cu tipul de ajutor' }}
                />
                <Flex w="100%" justify={'center'} direction={'column'}>
                  <Chart
                    chartType="PieChart"
                    data={dataStatisticGender}
                    height={'30vh'}
                    options={{ title: 'Statistica categorie de gen' }}
                  />
                  <Chart
                    chartType="PieChart"
                    data={dataStatisticAge}
                    height={'30vh'}
                    options={{ title: 'Statistica categorie de vârstă' }}
                  />
                </Flex>
              </Flex>
            </Paper>
          </Flex>
        </Paper>
        <LoadingOverlay visible={isLoading} />
      </Container>
    </BackgroundImage>
  )
}
