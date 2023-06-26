import {
  Avatar,
  Container,
  createStyles,
  Image,
  Navbar,
  Tooltip,
  UnstyledButton,
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

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
    [theme.fn.smallerThan('62em')]: {
      width: '98%',
      flexDirection: 'row',
    },
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
    [theme.fn.smallerThan('62em')]: {
      flexDirection: 'row',
    },
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

export const NavbarAdmin = () => {
  const { classes } = useStyles()
  const navigate = useNavigate()
  const logOut = () => {
    sessionStorage.clear()
    navigate('/')
  }
  const location = useLocation()
  const isTablet = useMediaQuery('(max-width: 62em)')
  const isMobile = useMediaQuery('(max-width: 30em)')
  return (
    <Container fluid p={5} m={0}>
      <Navbar height={isTablet ? '5rem' : '98%'} m={5} p={10} className={classes.navbar}>
        {isMobile ? null : (
          <>
            <Navbar.Section className={classes.menu}>
              <Avatar
                src={'/logo.png'}
                size={isTablet ? 60 : 80}
                radius={120}
                mx="auto"
                mb={isTablet ? 0 : 20}
              />

              <Tooltip label="Programări" color="light" position="bottom" offset={-5}>
                <UnstyledButton
                  component="a"
                  href="/appointments"
                  className={
                    location.pathname.includes('/appointments') ? classes.active : classes.inactive
                  }
                >
                  <Image height={'2.2rem'} width={'2.2rem'} src="/appointments.png" />
                </UnstyledButton>
              </Tooltip>
              <Tooltip label="Beneficiari" color="light" position="bottom" offset={-5}>
                <UnstyledButton
                  component="a"
                  href="/gainers"
                  className={
                    location.pathname.includes('/gainers') ? classes.active : classes.inactive
                  }
                >
                  <Image height={'2.2rem'} width={'2.2rem'} src="/gainers.png" />
                </UnstyledButton>
              </Tooltip>

              <Tooltip label="Statistici" color="light" position="bottom" offset={-5}>
                <UnstyledButton
                  component="a"
                  href="/statistics"
                  className={
                    location.pathname.includes('/statistics') ? classes.active : classes.inactive
                  }
                >
                  <Image height={'1.8rem'} width={'1.8rem'} src="/statistic.png" />
                </UnstyledButton>
              </Tooltip>
            </Navbar.Section>
            <Navbar.Section>
              <Tooltip label="Ieșire cont" color="light" position="bottom" offset={-10}>
                <UnstyledButton onClick={logOut} mr={isTablet ? '1rem' : 0}>
                  <Image height={'1.7rem'} width={'1.7rem'} src="/logOut.png" />
                </UnstyledButton>
              </Tooltip>
            </Navbar.Section>
          </>
        )}
      </Navbar>
    </Container>
  )
}
