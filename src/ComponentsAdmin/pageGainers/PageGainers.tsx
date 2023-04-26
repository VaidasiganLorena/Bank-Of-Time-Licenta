import { BackgroundImage, Container, createStyles, Paper, Title } from '@mantine/core'
import { useGetInfoGainers } from '../../api/gainer/useGetGainers'
import { dataGainers } from '../dataGainers'
import { NavbarAdmin } from '../HomepageAdmin.tsx/NavbarAdmin'
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

    [theme.fn.smallerThan('xs')]: {
      marginBottom: 20,
      marginTop: 35,
    },
  },
  paperTable: {
    borderRadius: 30,
    margin: 15,
    width: '100%',
    height: '96%',
    color: 'green',
    [theme.fn.smallerThan('xs')]: {
      marginBottom: 20,
      marginTop: 35,
    },
  },
}))

const PageGainers = () => {
  const { classes } = useStyles()
  const succesCallBackGetGainers = () => {
    console.log(data)
  }
  const { data } = useGetInfoGainers(succesCallBackGetGainers)

  return (
    <BackgroundImage src="/backround.png">
      <Container className={classes.wrapper} fluid p={16}>
        <Paper className={classes.paper}>
          <NavbarAdmin />
          <Paper className={classes.paperTable}>
            <Title mx={20} mt={10}>
              Aici poți vizualiza persoanele beneficiare...
            </Title>
            <TableGainers data={data?.data.response} />
          </Paper>
        </Paper>
      </Container>
    </BackgroundImage>
  )
}
export default PageGainers
