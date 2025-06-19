import {
  ActionIcon,
  BackgroundImage,
  Container,
  createStyles,
  Flex,
  Grid,
  Paper,
  Text,
} from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"
import { useState, useEffect } from "react"

import { ErrorSuccesNotification } from "../../Notification/notification"
import { NavigationBar } from "../Navbar"
import { ChatBubble } from "../chatbot/ChatBubble"
import { UploadFiles } from "./uploadFilesPage"
import { CvPage } from "./cvPage"
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react"

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

  const navigateButtonLeft = (
    <Flex
      justify="flex-start"
      align="center"
      gap={0}
      w={"100%"}
      mt={6}
      style={{ cursor: "pointer" }}
      onClick={() => setIsGeneretingCV(false)}
    >
      <ActionIcon
        variant="transparent"
        color="brand"
        size="lg"
        style={{ borderRadius: "100%" }}
      >
        <IconArrowLeft />
      </ActionIcon>
      <Text style={{ fontWeight: 400, color: "gray", fontSize: 15 }}>
        Istoric Documente
      </Text>
    </Flex>
  )
  const navigateButtonRight = (
    <Flex
      justify="flex-end"
      align="center"
      gap={0}
      w={"100%"}
      mt={6}
      style={{ cursor: "pointer" }}
      onClick={() => setIsGeneretingCV(true)}
    >
      <Text style={{ fontWeight: 400, color: "gray", fontSize: 15 }}>
        CV Personalizat
      </Text>
      <ActionIcon
        variant="transparent"
        color="brand"
        size="lg"
        style={{ borderRadius: "100%" }}
        disabled={nrDoc === 0}
      >
        <IconArrowRight />
      </ActionIcon>
    </Flex>
  )

  return (
    <>
      <ChatBubble />
      <BackgroundImage src="/backround.png">
        <Container className={classes.wrapper} fluid p={16}>
          <Paper className={classes.paper}>
            <NavigationBar />
            <Flex p={10} w={"100%"} direction={tablet ? "column" : "row"}>
              <Paper className={classes.paperAppointments}>
                <Grid w={"100%"}>
                  <Grid.Col span={2}>
                    {isGeneretingCV && navigateButtonLeft}
                  </Grid.Col>
                  <Grid.Col span={8} style={{ textAlign: "center" }}>
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
                  </Grid.Col>
                  <Grid.Col span={2}>
                    {!isGeneretingCV && navigateButtonRight}
                  </Grid.Col>
                </Grid>

                {!isGeneretingCV ? (
                  <UploadFiles
                    setNrDoc={handleSetNrDoc}
                    setGeneretingCV={setIsGeneretingCV}
                  />
                ) : (
                  <CvPage />
                )}
              </Paper>
            </Flex>
          </Paper>
        </Container>
        <ErrorSuccesNotification />
      </BackgroundImage>
    </>
  )
}
