import {
  ActionIcon,
  BackgroundImage,
  Center,
  Container,
  createStyles,
  Loader,
  Paper,
  Title,
} from '@mantine/core'
import { useEffect, useState } from 'react'
import { NavigationBar } from '../Navbar'
import { IconEditCircle } from '@tabler/icons-react'
import { AvaibleFormPersonalData } from './AvaibleFormPersonalData'
import { DisableFormPersonalData } from './DisableFormPersonalData'
import { useGetInfoUser } from '../../api/useGetInfoUser'
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
    // marginTop: 20,
    // marginBottom: 20,
    [theme.fn.smallerThan('xs')]: {
      marginBottom: 20,
      marginTop: 35,
    },
  },
  form: {
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
  input: {
    backgroundColor: '#f3f5f7',
    width: '25vw',
    [theme.fn.largerThan(1800)]: {
      width: '15vw',
    },
    [theme.fn.smallerThan(1300)]: {
      width: '33vw',
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

  buttonEdit: { position: 'absolute', right: 50 },
}))

const PersonalData = () => {
  const { classes, theme } = useStyles()
  const [editMode, setEditMode] = useState<boolean>(false)
  const userUuid = localStorage.getItem('userUuid')
  const authToken = localStorage.getItem('authToken')

  const succesInfoUserCallBack = () => {
    console.log(data?.data.response[0])
  }
  const { data, refetch, isLoading } = useGetInfoUser(succesInfoUserCallBack, userUuid, authToken)

  useEffect(() => {
    refetch()
  }, [editMode])
  return (
    <BackgroundImage src="/backround.png">
      <Container className={classes.wrapper} fluid p={16}>
        <Paper className={classes.paper}>
          <NavigationBar />
          <Paper className={classes.form} radius={0} p={15}>
            <ActionIcon
              className={classes.buttonEdit}
              radius="xl"
              onClick={() => {
                setEditMode((o) => !o)
              }}
            >
              <IconEditCircle color={theme.colors.primary[0]} size={25} />
            </ActionIcon>
            <Title order={2} className={classes.title} align="center" mt={10} mb={30}>
              Vizualizare date personale
            </Title>
            {editMode ? (
              isLoading ? (
                <Loader />
              ) : (
                <AvaibleFormPersonalData
                  firstname={data?.data.response[0].firstname}
                  lastname={data?.data.response[0].lastname}
                  email={data?.data.response[0].email}
                  numberPhone={data?.data.response[0].numberPhone}
                  gender={data?.data.response[0].gender}
                  city={data?.data.response[0].city}
                  setEditMode={setEditMode}
                />
              )
            ) : isLoading ? (
              <Center>
                <Loader color="teal" size="lg" variant="dots" />
              </Center>
            ) : (
              <DisableFormPersonalData
                firstname={data?.data.response[0].firstname}
                lastname={data?.data.response[0].lastname}
                email={data?.data.response[0].email}
                numberPhone={data?.data.response[0].numberPhone}
                gender={data?.data.response[0].gender}
                city={data?.data.response[0].city}
              />
            )}
          </Paper>
        </Paper>
      </Container>
    </BackgroundImage>
  )
}
export default PersonalData
