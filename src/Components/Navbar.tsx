import {
  Avatar,
  Container,
  createStyles,
  Image,
  Navbar,
  Tooltip,
  UnstyledButton,
} from '@mantine/core'
import { IconLogout } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
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
}))

export const NavigationBar = () => {
  const { classes } = useStyles()
  const navigate = useNavigate()
  const logOut = () => {
    localStorage.clear()
    navigate('/')
  }
  return (
    <Container fluid p={5} m={0}>
      <Navbar height={'98%'} m={5} p={10} className={classes.navbar}>
        <Navbar.Section className={classes.menu}>
          <Avatar src={'/logo.png'} size={80} radius={120} mx="auto" mb={20} />
          <Tooltip label="Acasă" color="light" position="bottom" offset={-5}>
            <UnstyledButton component="a" href="/homepage">
              <Image height={'2.5rem'} width={'2.5rem'} src="home.png" />
            </UnstyledButton>
          </Tooltip>
          <Tooltip label="Activități" color="light" position="bottom" offset={-5}>
            <UnstyledButton component="a" href="/activites">
              <Image height={'2.5rem'} width={'2.5rem'} src="activities.png" />
            </UnstyledButton>
          </Tooltip>
          <Tooltip label="Date personale" color="light" position="bottom" offset={-5}>
            <UnstyledButton component="a" href="/personal-data">
              <Image height={'2rem'} width={'2rem'} src="personal-data.png" />
            </UnstyledButton>
          </Tooltip>

          <Tooltip label="Activitatea ta" color="light" position="bottom" offset={-5}>
            <UnstyledButton component="a" href="/account">
              <Image height={'2rem'} width={'2rem'} src="notification.png" />
            </UnstyledButton>
          </Tooltip>
        </Navbar.Section>

        <Navbar.Section>
          <Tooltip label="Ieșire cont" color="light" position="bottom" offset={-15}>
            <UnstyledButton onClick={logOut}>
              <IconLogout color="white" size="2rem" />
            </UnstyledButton>
          </Tooltip>
        </Navbar.Section>
      </Navbar>
    </Container>
  )
}
