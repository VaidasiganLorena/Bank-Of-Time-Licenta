import {
  ActionIcon,
  BackgroundImage,
  Center,
  Container,
  createStyles,
  Loader,
  Paper,
  Group,
} from '@mantine/core'
import { useEffect, useState } from 'react'
import { NavigationBar } from '../Navbar'
import { IconEditCircle, IconTrash } from '@tabler/icons-react'
import { AvaibleFormPersonalData } from './AvaibleFormPersonalData'
import { DisableFormPersonalData } from './DisableFormPersonalData'
import { useGetInfoUser } from '../../api/user/useGetInfoUser'
import { OptionToDelete } from './OptionToDelete'

export const useStyles = createStyles((theme: any) => ({
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
  cancelButton: {
    marginTop: 30,
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
  deleteButton: {
    marginTop: 30,
    width: '35%',
    borderRadius: 10,
    color: '#28886f',
    borderColor: '#28886f',
    [theme.fn.smallerThan('md')]: {
      width: 'auto',
    },
    '&:hover': {
      backgroundColor: '#d7e2dfa8',
    },
  },
  containerImage: {
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

  alterButtons: { position: 'absolute', right: 50 },
}))

const PersonalData = () => {
  const { classes, theme } = useStyles()
  const [editMode, setEditMode] = useState<boolean>(false)
  const userUuid = localStorage.getItem('userUuid')
  const authToken = localStorage.getItem('authToken')
  const [openModal, setOpenModal] = useState<boolean>(false)
  const succesInfoUserCallBack = () => {
    console.log(data?.data.response[0])
  }

  const { data, refetch, isLoading } = useGetInfoUser(succesInfoUserCallBack, userUuid, authToken)
  // const succesCallBack = () => {
  //   // setEditMode(false)
  // }
  // const { mutate } = useUpdateInfoUser(succesCallBack, userUuid, authToken)

  useEffect(() => {
    refetch()
  }, [editMode, refetch])
  return (
    <BackgroundImage src="/backround.png">
      <Container className={classes.wrapper} fluid p={16}>
        <Paper className={classes.paper}>
          <NavigationBar />
          <Paper className={classes.containerImage} radius={0} p={15}>
            {editMode ? (
              <ActionIcon
                className={classes.alterButtons}
                radius="xl"
                onClick={() => {
                  setOpenModal((o) => !o)
                }}
              >
                <IconTrash color={'red'} size={25} />
              </ActionIcon>
            ) : (
              <ActionIcon
                className={classes.alterButtons}
                radius="xl"
                onClick={() => {
                  setEditMode((o) => !o)
                }}
              >
                <IconEditCircle color={theme.colors.primary[0]} size={25} />
              </ActionIcon>
            )}
            <Group position="center" spacing="xl">
              <div>
                {editMode ? (
                  isLoading ? (
                    <Loader />
                  ) : (
                    <AvaibleFormPersonalData
                      firstname={data?.data.response[0].firstname}
                      lastname={data?.data.response[0].lastname}
                      email={data?.data.response[0].email}
                      phoneNumber={data?.data.response[0].phoneNumber}
                      gender={data?.data.response[0].gender}
                      city={data?.data.response[0].city}
                      photo={data?.data.response[0].photo}
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
                    phoneNumber={data?.data.response[0].phoneNumber}
                    gender={data?.data.response[0].gender}
                    city={data?.data.response[0].city}
                    photo={data?.data.response[0].photo}
                  />
                )}
              </div>
            </Group>
          </Paper>
        </Paper>

        <OptionToDelete open={openModal} setOpen={setOpenModal} />
      </Container>
    </BackgroundImage>
  )
}
export default PersonalData
