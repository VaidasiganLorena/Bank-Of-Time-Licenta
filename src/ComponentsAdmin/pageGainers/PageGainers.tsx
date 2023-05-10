import { BackgroundImage, Button, Container, createStyles, Flex, Paper, Title } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useGetInfoGainers } from '../../api/gainer/useGetGainers'
import { NavbarAdmin } from '../HomepageAdmin/NavbarAdmin'

import { TableGainers } from './TableGainers'

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
    display: 'flex',
    flexDirection: 'row',
    [theme.fn.smallerThan('64em')]: {
      flexDirection: 'column',
    },
    [theme.fn.smallerThan('xs')]: {
      marginBottom: 10,
      marginTop: 10,
      height: 'auto',
    },
  },
  paperTable: {
    borderRadius: 30,
    margin: 15,
    width: '100%',
    height: '96%',
    color: 'green',

    [theme.fn.smallerThan('64em')]: {
      width: '96%',
    },
    [theme.fn.smallerThan('xs')]: {
      width: '93%',
      margin: 10,
    },
  },
}))

const PageGainers = () => {
  const { classes, theme } = useStyles()
  const isMobile = useMediaQuery('(max-width: 30em)')
  const succesCallBackGetGainers = () => {
    //console.log(data)
  }
  const { data } = useGetInfoGainers(succesCallBackGetGainers)

  return (
    <BackgroundImage src="/backround.png" h={'100%'}>
      <Container className={classes.wrapper} fluid p={16}>
        <Paper className={classes.paper}>
          <NavbarAdmin />
          <Paper className={classes.paperTable}>
            <Flex justify="space-between" mx="xs" direction={isMobile ? 'column' : 'row'}>
              <Title order={2} c={theme.colors.brand[5]} mx={20} mt={10}>
                Aici poți vizualiza persoanele beneficiare...
              </Title>

              <Button radius="xl" mt={15}>
                Adaugare beneficiar
              </Button>
            </Flex>
            <TableGainers data={data?.data.response} />
          </Paper>
        </Paper>
      </Container>
    </BackgroundImage>
  )
}
export default PageGainers
