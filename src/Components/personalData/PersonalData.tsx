import {
  BackgroundImage,
  Center,
  Container,
  createStyles,
  Loader,
  Paper,
  Group,
  ThemeIcon,
  Text,
  rem,
  Flex,
  Button,
  PasswordInput,
  Stack,
  LoadingOverlay,
} from '@mantine/core'
import { useEffect, useState } from 'react'
import { NavigationBar } from '../Navbar'
import { IconKey, IconTrash } from '@tabler/icons-react'
import { AvaibleFormPersonalData } from './AvaibleFormPersonalData'
import { DisableFormPersonalData } from './DisableFormPersonalData'
import { useGetInfoUser } from '../../api/user/useGetInfoUser'
import { OptionToDelete } from './OptionToDelete'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { useChangePassword } from '../../api/user/useChangePassword'
import { useForm } from '@mantine/form'
import { useNavigate } from 'react-router-dom'
import { ErrorSuccesNotification } from '../../Notification/notification'
import { setMessageNotification } from '../../Redux/notification/slice'
import { useDispatch } from 'react-redux'
import { GenericDeleteModal } from '../deleteModal/deleteModal'
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
    backgroundColor: 'withe',
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
    [theme.fn.smallerThan('md')]: {
      width: 'auto',
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

const PersonalData = () => {
  const { classes } = useStyles()
  const [editMode, setEditMode] = useState<boolean>(false)
  const userUuid = localStorage.getItem('userUuid')
  const authToken = localStorage.getItem('authToken')
  const [openModal, setOpenModal] = useState<boolean>(false)
  const tablet = useMediaQuery('(max-width: 800px)')
  const [visible, { toggle }] = useDisclosure(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const succesInfoUserCallBack = () => {}
  const succesChangePasswordCallBack = (data: any) => {
    dispatch(setMessageNotification(data))
    localStorage.clear()
    navigate('/login')
  }
  const { mutate } = useChangePassword(succesChangePasswordCallBack, userUuid, authToken)
  const { data, refetch, isLoading, isRefetching } = useGetInfoUser(
    succesInfoUserCallBack,
    userUuid,
    authToken,
  )

  const formChangePassword = useForm({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validate: {
      password: (value: string) =>
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/.test(value) &&
        value.length > 0
          ? null
          : 'Parolă invalidă!',
      confirmPassword: (value, values) =>
        value !== values.password ? 'Parolele nu se potivesc!' : null,
    },
  })
  const onChangePassword = () => {
    if (formChangePassword.validate().hasErrors === false) {
      mutate({ password: formChangePassword.values.password })
    }
  }
  useEffect(() => {
    refetch()
  }, [editMode, refetch])
  return (
    <BackgroundImage src="/backround.png">
      <Container className={classes.wrapper} fluid p={16}>
        <Paper withBorder className={classes.paper}>
          <NavigationBar />
          <Flex mr={20} direction={tablet ? 'column' : 'row'} className={classes.flex}>
            <Paper className={classes.containerImage} radius={0} p={15} withBorder>
              <LoadingOverlay visible={isLoading || isRefetching} />
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
              <Group position="center" align={'center'} spacing={15}>
                {!editMode ? (
                  <Button
                    size="sm"
                    onClick={() => setEditMode(true)}
                    className={classes.editButton}
                  >
                    Editeză
                  </Button>
                ) : null}
              </Group>
            </Paper>
            <Container>
              <Group>
                <Paper
                  radius="md"
                  withBorder
                  className={classes.card}
                  mt={`calc(${ICON_SIZE} / 2)`}
                >
                  <ThemeIcon
                    className={classes.icon}
                    size={ICON_SIZE}
                    color="gray"
                    radius={ICON_SIZE}
                  >
                    <IconKey size="2rem" stroke={1.5} />
                  </ThemeIcon>

                  <Text ta="center" fw={700} className={classes.title}>
                    Dorești să schimbi parola contului ?
                  </Text>
                  <Text c="dimmed" ta="center" fz="sm" mb={'1rem'}>
                    Îți reamintim că este important să alegi o parolă puternică și unică, astfel
                    încât să-ți protejezi contul și informațiile personale.
                  </Text>
                  <form onSubmit={formChangePassword.onSubmit(onChangePassword)}>
                    <Stack maw={380} mx="auto">
                      <PasswordInput
                        label="Parola nouă"
                        variant="filled"
                        placeholder="Tastează parola dorită..."
                        size="md"
                        radius={10}
                        visible={visible}
                        onVisibilityChange={toggle}
                        classNames={{
                          input: classes.inputPassword,
                          root: classes.root,
                        }}
                        {...formChangePassword.getInputProps('password')}
                      />
                      <PasswordInput
                        label="Confirmare parolă"
                        variant="filled"
                        placeholder="Tastează parola introdusă anterior..."
                        size="md"
                        visible={visible}
                        onVisibilityChange={toggle}
                        radius={10}
                        classNames={{
                          input: classes.inputPassword,
                          root: classes.root,
                        }}
                        {...formChangePassword.getInputProps('confirmPassword')}
                      />
                    </Stack>

                    <Center>
                      <Button
                        size="sm"
                        className={classes.changePasswordButton}
                        onClick={onChangePassword}
                        color="gray"
                      >
                        Schimbă parola
                      </Button>
                    </Center>
                  </form>
                </Paper>
                <Paper
                  radius="md"
                  withBorder
                  className={classes.card}
                  mt={`calc(${ICON_SIZE} / 2)`}
                >
                  <ThemeIcon
                    className={classes.icon}
                    size={ICON_SIZE}
                    color={'#fb6b6b'}
                    radius={ICON_SIZE}
                  >
                    <IconTrash size="2rem" stroke={1.5} />
                  </ThemeIcon>

                  <Text ta="center" fw={700} className={classes.title}>
                    Dorești să renunți la contul tău?
                  </Text>
                  <Text c="dimmed" ta="center" fz="sm">
                    Atenție, daca renunțați la cont datele personale și orele de voluntariat
                    cumulate nu vor mai putatea fi recuperate.
                  </Text>
                  <Center>
                    <Button
                      size="sm"
                      color={'red'}
                      onClick={() => setOpenModal(true)}
                      className={classes.deleteButton}
                    >
                      Șterge cont
                    </Button>
                  </Center>

                  <OptionToDelete open={openModal} setOpen={setOpenModal} />
                </Paper>
              </Group>
            </Container>
          </Flex>
        </Paper>
        <ErrorSuccesNotification />
      </Container>
    </BackgroundImage>
  )
}
export default PersonalData
