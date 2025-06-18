import {
  BackgroundImage,
  Badge,
  Container,
  createStyles,
  FileInput,
  Flex,
  Paper,
  ScrollArea,
  Tabs,
  Text,
} from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"
import { IconCheck, IconRotate2, IconX } from "@tabler/icons-react"
import { useEffect } from "react"
import { useGetAppointment } from "../../api/appointment/useGetAppointmentOfUser"
import { useGetCountAllAppointments } from "../../api/statistic/useGetCountAllAppointments"
import { useGetCountAppointmentCancel } from "../../api/statistic/useGetCountAppointmentsCancel"
import { useGetCountAppointmentComplete } from "../../api/statistic/useGetCountAppointmentsComplete"
import { ErrorSuccesNotification } from "../../Notification/notification"
import { NavigationBar } from "../Navbar"
import { ChatBubble } from "../chatbot/ChatBubble"
import { UploadFiles } from "./uploadFiles"

const useStyles = createStyles((theme: any) => ({
  wrapper: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    // [theme.fn.smallerThan(500)]: {
    //   height: "100%",
    // },
  },
  paper: {
    backgroundColor: "#ffffff80",
    borderRadius: 30,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    [theme.fn.smallerThan("xs")]: {
      marginBottom: 20,
      marginTop: 35,
    },
  },
  progress: {
    backgroundColor: "#ffffff80",
    paddingTop: 15,
    borderRadius: 30,
    width: "100%",
    height: "fit-content",
    margin: 15,

    [theme.fn.smallerThan("xs")]: {
      marginBottom: 20,
      marginTop: 35,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
  },

  paperAppointments: {
    borderRadius: 30,
    marginRight: 15,
    width: "100%",
    height: "100%",
    color: "green",
    [theme.fn.smallerThan("xs")]: {
      marginBottom: 20,
      marginTop: 35,
    },
    padding: "10px 25px",
  },
}))
export const VolunteerProfile = () => {
  const { classes, theme } = useStyles()
  const userUUid = sessionStorage.getItem("userUuid")
  const tablet = useMediaQuery("(max-width: 800px)")
  const userUuid = sessionStorage.getItem("userUuid")
  const authToken = sessionStorage.getItem("authToken")
  const successCallBack = (data: any) => {}

  return (
    <>
      <ChatBubble />
      <BackgroundImage src="/backround.png">
        <Container className={classes.wrapper} fluid p={16}>
          <Paper className={classes.paper}>
            <NavigationBar />
            <Flex p={10} w={"100%"} direction={tablet ? "column" : "row"}>
              <Paper className={classes.paperAppointments}>
                <Text
                  ta="center"
                  fw={700}
                  c={theme.colors.brand[6]}
                  size={24}
                  mt={5}
                >
                  Profilul Voluntarului
                </Text>
                <UploadFiles />
              </Paper>
            </Flex>
          </Paper>
        </Container>
        <ErrorSuccesNotification />
      </BackgroundImage>
    </>
  )
}
