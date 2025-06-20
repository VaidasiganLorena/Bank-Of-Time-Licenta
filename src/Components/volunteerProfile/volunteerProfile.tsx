import {
  ActionIcon,
  BackgroundImage,
  Container,
  createStyles,
  Flex,
  Grid,
  Group,
  Paper,
  Text,
} from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"
import { useState } from "react"

import { ErrorSuccesNotification } from "../../Notification/notification"
import { NavigationBar } from "../Navbar"
import { ChatBubble } from "../chatbot/ChatBubble"

import { UploadFiles } from "./uploadFilesPage"
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react"
import { CVPage } from "./cvPage"

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
  const tablet = useMediaQuery("(max-width: 800px)")
  const [nrDoc, setNrDoc] = useState(0)
  const [isGeneretingCV, setIsGeneretingCV] = useState(false)

  const handleSetNrDoc = (newNrDoc: number) => {
    setNrDoc(newNrDoc)
  }

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
                  mb={10}
                >
                  Profilul Voluntarului
                </Text>
                <CVPage nrDoc={nrDoc} />
                <UploadFiles
                  setNrDoc={handleSetNrDoc}
                  setGeneretingCV={setIsGeneretingCV}
                />
              </Paper>
            </Flex>
          </Paper>
        </Container>
        <ErrorSuccesNotification />
      </BackgroundImage>
    </>
  )
}
