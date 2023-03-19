import { Avatar, Container, createStyles, Group, Navbar, Text, UnstyledButton } from '@mantine/core'
const useStyles = createStyles((theme: any) => ({
  navbar: {
    borderRadius: 30,
    backgroundColor: 'white',
  },
  wrapper: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `1px solid #ececec`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: ` 1px solid #ececec`,
  },

  link: {
    display: 'flex',
    alignItems: 'center',
    height: 40,
    textDecoration: 'none',
    fontSize: theme.fontSizes.sm,
    color: '#687471',
    fontWeight: 600,
    textTransform: 'uppercase',

    '&:hover': {
      boxShadow: 'inset 0px 0px 10px 3px rgba(0,0,0,0.05)',
      // backgroundColor: '#fcf6eebd',
      color: '#28886f',
    },
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
const dataLinks = [
  { link: '/homepage', label: 'Acasă ' },
  { link: '/personal-data', label: 'Date personale ' },
  { link: '/account', label: 'Cont activitate' },
  { link: '/activites-calendar', label: 'Calendar' },
  { link: '/activites', label: 'Activități' },
]
export const NavigationBar = () => {
  const { classes } = useStyles()
  const firstName = localStorage.getItem('firstName')
  const lastName = localStorage.getItem('lastName')
  const links = dataLinks.map((item: any) => (
    <UnstyledButton className={classes.link} key={item.label} component={'a'} href={item.link}>
      <span>{item.label}</span>
    </UnstyledButton>
  ))
  return (
    <Container className={classes.wrapper} fluid p={5}>
      <Navbar height={'98%'} m={5} width={{ sm: 300 }} p={10} className={classes.navbar}>
        <Navbar.Section>
          <Avatar src={'/avatar.png'} size={80} radius={120} mx="auto" />
          <Group spacing={5} position="center">
            <Text ta="center" fz="lg" c="#687471" weight={500} mt="md">
              {firstName}
            </Text>
            <Text ta="center" fz="lg" c="#687471" weight={500} mt="md">
              {lastName}
            </Text>
          </Group>

          <Group className={classes.header} position="apart"></Group>
        </Navbar.Section>
        {links}
        <Navbar.Section className={classes.footer}>
          <Group></Group>
        </Navbar.Section>
      </Navbar>
    </Container>
  )
}
