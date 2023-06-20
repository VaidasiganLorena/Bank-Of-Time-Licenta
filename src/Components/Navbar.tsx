import {
  Avatar,
  Container,
  createStyles,
  Image,
  Navbar,
  Tooltip,
  UnstyledButton,
} from '@mantine/core'

import { useLocation, useNavigate } from 'react-router-dom'
const useStyles = createStyles((theme: any) => ({
  navbar: {
    borderRadius: 30,
    backgroundColor: '#689983',
    width: '7rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  paper: {
    borderRadius: 30,
    width: '100%',
    height: '96vh',

    [theme.fn.smallerThan('xs')]: {
      marginBottom: 20,
      marginTop: 35,
    },
  },
  menu: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 30,
  },

  active: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '3.5rem',
    width: '3.5rem',
    backgroundColor: '#2f6e5dd1',
    borderRadius: 20,
  },

  inactive: {
    borderRadius: 20,
  },
}))

export const NavigationBar = () => {
  const { classes } = useStyles()
  const location = useLocation()
  const navigate = useNavigate()
  const logOut = () => {
    sessionStorage.clear()
    navigate('/')
  }

  return (
    <Container fluid p={5} m={0}>
      <Navbar height={'98%'} m={5} p={10} className={classes.navbar}>
        <Navbar.Section className={classes.menu}>
          <Avatar src={'/logo.png'} size={80} radius={120} mx="auto" mb={20} />
          <Tooltip label="Acasă" color="light" position="bottom" offset={-5}>
            <UnstyledButton
              component="a"
              href="/homepage"
              className={
                location.pathname.includes('/homepage') ? classes.active : classes.inactive
              }
            >
              <Image height={'2.5rem'} width={'2.5rem'} src="home.png" />
            </UnstyledButton>
          </Tooltip>

          <Tooltip label="Activități" color="light" position="bottom" offset={-5}>
            <UnstyledButton
              component="a"
              href="/activites"
              className={
                location.pathname.includes('/activites') ? classes.active : classes.inactive
              }
            >
              <Image height={'2.5rem'} width={'2.5rem'} src="activities.png" />
            </UnstyledButton>
          </Tooltip>

          <Tooltip label="Activitatea mea" color="light" position="bottom" offset={-5}>
            <UnstyledButton
              component="a"
              href="/my-activity"
              className={
                location.pathname.includes('/my-activity') ? classes.active : classes.inactive
              }
            >
              <Image height={'2rem'} width={'2rem'} src="notification.png" />
            </UnstyledButton>
          </Tooltip>

          <Tooltip label="Date personale" color="light" position="bottom" offset={-5}>
            <UnstyledButton
              component="a"
              href="/personal-data"
              className={
                location.pathname.includes('/personal-data') ? classes.active : classes.inactive
              }
            >
              <Image height={'2rem'} width={'2rem'} src="personal-data.png" />
            </UnstyledButton>
          </Tooltip>
        </Navbar.Section>

        <Navbar.Section>
          <Tooltip label="Ieșire cont" color="light" position="bottom" offset={-10}>
            <UnstyledButton onClick={logOut}>
              <Image height={'1.7rem'} width={'1.7rem'} src="logOut.png" />
            </UnstyledButton>
          </Tooltip>
        </Navbar.Section>
      </Navbar>
    </Container>
  )
}
