import { BackgroundImage, Container, createStyles, Paper, Text, rem, Flex } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

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
  const { classes } = useStyles()
  const tablet = useMediaQuery('(max-width: 800px)')

  return (
    <BackgroundImage src="/backround.png">
      <Container className={classes.wrapper} fluid p={16}>
        <Paper withBorder className={classes.paper}>
          <NavbarAdmin />
          <Flex mr={20} direction={tablet ? 'column' : 'row'} className={classes.flex}>
            <Paper className={classes.containerImage} radius={0} p={15} withBorder>
              {/* <LoadingOverlay  /> */}
            </Paper>
          </Flex>
        </Paper>
      </Container>
    </BackgroundImage>
  )
}
