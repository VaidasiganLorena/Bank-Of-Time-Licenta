import { BackgroundImage, Container, createStyles, Paper } from '@mantine/core'
import { useGetInfoUser } from '../../api/useGetInfoUser'
import { NavigationBarAdmin } from './NavbarAdmin'
const useStyles = createStyles((theme: any) => ({
  wrapper: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  paper: {
    backgroundColor: '#ffffff80',
    borderRadius: 30,
    width: '100%',
    height: '96vh',

    [theme.fn.smallerThan('xs')]: {
      marginBottom: 20,
      marginTop: 35,
    },
  },
}))

const Homepage = () => {
  const { classes } = useStyles()
  const userUUid = localStorage.getItem('userUuid')
  const authToken = localStorage.getItem('userToken')
  const successCallBack = (data: any) => {
    console.log(data)
    localStorage.setItem('firstName', data.data.response[0].firstname)
    localStorage.setItem('lastName', data.data.response[0].lastname)
  }
  const { data } = useGetInfoUser(successCallBack, userUUid, authToken)

  return (
    <BackgroundImage src="/backround.png">
      <Container className={classes.wrapper} fluid p={16}>
        <Paper className={classes.paper}>
          <NavigationBarAdmin />
        </Paper>
      </Container>
    </BackgroundImage>
  )
}
export default Homepage
