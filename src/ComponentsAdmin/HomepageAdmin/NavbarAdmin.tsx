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
}))

export const NavbarAdmin = () => {
  const { classes } = useStyles()
  const navigate = useNavigate()
  const logOut = () => {
    localStorage.clear()
    navigate('/')
  }
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
                <UnstyledButton component="a" href="/appointments">
                  <Image height={'2.2rem'} width={'2.2rem'} src="appointments.png" />
                </UnstyledButton>
              </Tooltip>
              <Tooltip label="Beneficiari" color="light" position="bottom" offset={-5}>
                <UnstyledButton component="a" href="/gainers">
                  <Image height={'2.2rem'} width={'2.2rem'} src="gainers.png" />
                </UnstyledButton>
              </Tooltip>

              <Tooltip label="Date personale" color="light" position="bottom" offset={-5}>
                <UnstyledButton component="a" href="/personal-data-admin">
                  <Image height={'1.8rem'} width={'1.8rem'} src="personal-data.png" />
                </UnstyledButton>
              </Tooltip>
            </Navbar.Section>
            <Navbar.Section>
              <Tooltip label="Ieșire cont" color="light" position="bottom" offset={-10}>
                <UnstyledButton onClick={logOut} mr={isTablet ? '1rem' : 0}>
                  <Image height={'1.7rem'} width={'1.7rem'} src="logOut.png" />
                </UnstyledButton>
              </Tooltip>
            </Navbar.Section>
          </>
        )}
      </Navbar>
    </Container>
  )
}
