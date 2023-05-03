import {
  BackgroundImage,
  Badge,
  Container,
  createStyles,
  Flex,
  Paper,
  Tabs,
  Text,
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { IconCheck, IconRotate2, IconX } from '@tabler/icons-react'
import { useGetInfoGainers } from '../../api/gainer/useGetGainers'
import { NavbarAdmin } from '../HomepageAdmin/NavbarAdmin'

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

const Appointments = () => {
  const { classes, theme } = useStyles()

  return (
    <BackgroundImage src="/backround.png">
      <Container className={classes.wrapper} fluid p={16}>
        <Paper className={classes.paper}>
          <NavbarAdmin />
          <Paper className={classes.paperTable}>
            <Flex p={10} w={'100%'} direction={'column'}>
              <Text ta="center" fw={700} c={theme.colors.brand[6]} size={'xl'} mt={5}>
                Programări
              </Text>
              <Tabs defaultValue="pending">
                <Tabs.List>
                  <Tabs.Tab
                    value="pending"
                    icon={<IconRotate2 size="0.8rem" />}
                    rightSection={
                      <Badge
                        w={16}
                        h={16}
                        sx={{ pointerEvents: 'none' }}
                        variant="filled"
                        size="xs"
                        p={0}
                      >
                        2
                      </Badge>
                    }
                  >
                    În așteptare
                  </Tabs.Tab>
                  <Tabs.Tab value="finished" icon={<IconCheck size="0.8rem" />}>
                    Finalizate
                  </Tabs.Tab>
                  <Tabs.Tab value="cancel" icon={<IconX size="0.8rem" />}>
                    Anulate
                  </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="pending" pt="xs">
                  jj
                </Tabs.Panel>

                <Tabs.Panel value="finished" pt="xs">
                  kk
                </Tabs.Panel>

                <Tabs.Panel value="cancel" pt="xs">
                  yy
                </Tabs.Panel>
              </Tabs>
            </Flex>
          </Paper>
        </Paper>
      </Container>
    </BackgroundImage>
  )
}
export default Appointments
