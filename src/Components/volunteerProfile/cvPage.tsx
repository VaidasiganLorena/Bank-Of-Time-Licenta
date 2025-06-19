import {
  Flex,
  Text,
  Button,
  Paper,
  Grid,
  Badge,
  Divider,
  Loader,
  Alert,
  Stack,
  Group,
  Card,
  Title,
  List,
  Box,
  Modal,
  Image,
} from "@mantine/core"
import { FC, useState, useEffect } from "react"
import {
  IconDownload,
  IconEye,
  IconFileText,
  IconClock,
  IconMapPin,
  IconBuilding,
} from "@tabler/icons-react"
import {
  useGetVolunteerDocuments,
  VolunteerDocument,
} from "../../api/volunteer-doc/useGetDoc"
import { useGetAppointment } from "../../api/appointment/useGetAppointmentOfUser"
import { useUpdateCV, CVData } from "../../api/cv/useUpdateCV"
import { useGetCV } from "../../api/cv/useGetCV"
import { useGetInfoUser } from "../../api/user/useGetInfoUser"
import { openai } from "../../config/openai.config"
import { ErrorSuccesNotification } from "../../Notification/notification"
import {
  setErrorNotification,
  setMessageNotification,
} from "../../Redux/notification/slice"
import moment from "moment"
import "moment/locale/ro"

export const CvPage: FC<{}> = ({}) => {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedCV, setGeneratedCV] = useState<CVData | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const userUuid = sessionStorage.getItem("userUuid")

  const { data: documentsData } = useGetVolunteerDocuments(() => {})
  const { data: cvData } = useGetCV((data: any) => {
    console.log("useGetCV success callback - full response:", data)
    console.log("useGetCV success callback - data.data:", data?.data)
    console.log(
      "useGetCV success callback - data.data.response:",
      data?.data?.response
    )
    console.log(
      "useGetCV success callback - data.data.response.cv:",
      data?.data?.response?.cv
    )
  }, userUuid)

  const { data: activitiesData } = useGetAppointment(() => {}, userUuid)
  const { data: userData } = useGetInfoUser((data: any) => {}, userUuid)

  const { firstname, lastname, email, phoneNumber, city, photo } =
    userData?.data?.response?.[0] || {}
  const name =
    firstname && lastname
      ? `${firstname} ${lastname}`
      : firstname || lastname || ""
  const phone = phoneNumber || ""

  // Debug user data
  useEffect(() => {
    console.log("User data received:", userData)
    console.log("User data structure:", {
      hasData: !!userData,
      hasDataResponse: !!userData?.data,
      hasResponse: !!userData?.data?.response,
      isArray: Array.isArray(userData?.data?.response),
      firstUser: userData?.data?.response?.[0],
    })
    console.log("Extracted user info:", {
      firstname,
      lastname,
      name,
      email,
      phone,
      city,
    })
  }, [userData, firstname, lastname, name, email, phone, city])

  const { mutate: saveCV, isLoading: isSavingCV } = useUpdateCV(
    (response: string, status: number) => {
      setMessageNotification("CV-ul a fost salvat cu succes!")
    },
    (error: any) => {
      console.error("Error saving CV:", error)
      setErrorNotification("Eroare la salvarea CV-ului")
    },
    userUuid
  )

  useEffect(() => {
    console.log("cvData received:", cvData)
    console.log("cvData structure:", {
      hasData: !!cvData,
      hasDataResponse: !!cvData?.data,
      hasResponse: !!cvData?.data?.response,
      hasCv: !!cvData?.data?.response?.cv,
      fullResponse: cvData?.data?.response,
    })

    // Check if cvData exists and has the expected structure
    if (!cvData || !cvData.data || !cvData.data.response) {
      console.log("No CV data available or invalid structure")
      return
    }

    const cvString = cvData.data.response.cv

    if (cvString && typeof cvString === "string" && cvString.trim() !== "") {
      try {
        const parsedCV = JSON.parse(cvString)
        console.log("Successfully parsed CV:", parsedCV)
        console.log("Achievements from parsed CV:", parsedCV.achievements)
        setGeneratedCV({
          ...parsedCV,
          personalInfo: { ...parsedCV.personalInfo, name: name },
        })
      } catch (error) {
        console.error("Error parsing CV data:", error)
        console.error("Raw CV data:", cvString)
        setErrorNotification("Eroare la parsarea datelor CV-ului")
      }
    } else if (
      cvData.data.response &&
      typeof cvData.data.response === "object" &&
      Object.keys(cvData.data.response).length > 0
    ) {
      // Handle case where CV data might be stored directly as an object
      console.log("CV data is already an object:", cvData.data.response)
      console.log(
        "Achievements from object CV:",
        cvData.data.response.achievements
      )
      setGeneratedCV({
        ...cvData.data.response,
        personalInfo: { ...cvData.data.response.personalInfo, name: name },
      })
    } else {
      console.log("CV data is empty or null")
    }

    console.log("Current generatedCV state:", generatedCV)
  }, [cvData, name])

  const generateCVWithOpenAI = async () => {
    if (!documentsData?.data.response && !activitiesData?.data.response) {
      setErrorNotification("Nu există date pentru generarea CV-ului")
      return
    }

    setIsGenerating(true)

    try {
      const volunteerDocuments = documentsData?.data.response || []
      const activities = activitiesData?.data.response || []

      const completedActivities = activities.filter(
        (activity: any) => activity.status === "Finalizat"
      )

      const totalHours = completedActivities.reduce(
        (sum: number, activity: any) => sum + (activity.timeVolunteering || 0),
        0
      )
      const totalActivities = completedActivities.length

      // Limit the number of documents and activities to reduce token usage
      const limitedDocuments = volunteerDocuments.slice(0, 5) // Limit to 5 most recent documents
      const limitedActivities = completedActivities.slice(0, 10) // Limit to 10 most recent activities

      // Create a more concise summary of documents
      const documentsSummary =
        limitedDocuments.length > 0
          ? `Documente voluntariat (${limitedDocuments.length} din ${
              volunteerDocuments.length
            }): ${limitedDocuments
              .map(
                (doc: VolunteerDocument) =>
                  `${doc.organization || "N/A"} - ${doc.eventName || "N/A"} (${
                    doc.hours || 0
                  }h)`
              )
              .join(", ")}`
          : "Nu există documente de voluntariat"

      // Create a more concise summary of activities
      const activitiesSummary =
        limitedActivities.length > 0
          ? `Activități finalizate (${limitedActivities.length} din ${
              completedActivities.length
            }): ${limitedActivities
              .map(
                (activity: any) =>
                  `${activity.nameGainer || "N/A"} - ${
                    activity.helpTypeUuid === "1" ? "Companie" : "Cumpărături"
                  } (${activity.timeVolunteering || 0}h)`
              )
              .join(", ")}`
          : "Nu există activități finalizate"

      // Create achievements from actual completed appointments
      const achievementsFromAppointments = completedActivities.map(
        (activity: any) => {
          const helpType =
            activity.helpTypeUuid === "1" ? "Companie" : "Cumpărături"
          const date = moment(activity.dateOfAppointment).format("DD.MM.YYYY")
          return `Ajutor ${helpType} pentru ${
            activity.nameGainer || "beneficiar"
          } în ${activity.cityGainer || "oraș"} (${date}) - ${
            activity.timeVolunteering || 0
          } ore`
        }
      )

      const cvPrompt = `Generează un CV profesional în română pentru voluntar:

DATE PERSONALE:
Nume: ${name}
Email: ${email || ""}
Telefon: ${phone || ""}
Oraș: ${city || ""}

${documentsSummary}

${activitiesSummary}

STATISTICI:
Total ore: ${totalHours}h
Total activități: ${totalActivities}

Generează CV în format JSON:
{
  "personalInfo": {
    "name": "Numele voluntarului",
    "email": "Email",
    "phone": "Telefon", 
    "location": "Oraș"
  },
  "summary": "Sumar profesional de 2-3 propoziții",
  "volunteerExperience": [
    {
      "organization": "Organizația",
      "role": "Rolul",
      "period": "Perioada",
      "description": "Descriere activități",
      "skills": ["Competențe"],
      "hours": 20
    }
  ],
  "skills": ["Competențe principale"],
  "achievements": ${JSON.stringify(achievementsFromAppointments)},
  "totalHours": ${totalHours},
  "totalActivities": ${totalActivities}
}`

      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: cvPrompt }],
        model: "gpt-4",
        temperature: 0.7,
        max_tokens: 1500, // Reduced from 2000
      })

      const response = completion.choices[0]?.message?.content || "{}"
      const cleanResponse = response.replace(/```json\s*|\s*```/g, "").trim()
      const parsedCV = JSON.parse(cleanResponse)
      setGeneratedCV(parsedCV)
      saveCV(parsedCV)
      setMessageNotification("CV-ul a fost generat și salvat cu succes!")
    } catch (error) {
      console.error("Error generating CV:", error)
      setErrorNotification("Eroare la generarea CV-ului")
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadCV = () => {
    if (!generatedCV) return

    const { name, email, phone, city } = userData?.data || {}
    const cvContent = `
CV VOLUNTAR 

${name}
${email}
${phone}
${city}

DESCRIERE:
${generatedCV.summary}

EXPERIENȚĂ DE VOLUNTARIAT:
${generatedCV.volunteerExperience
  .map(
    (exp) => `
${exp.organization} - ${exp.role}
${exp.period} (${exp.hours} ore)
${exp.description}
Competențe: ${exp.skills.join(", ")}
`
  )
  .join("\n")}

COMPETENȚE:
${generatedCV.skills.join(", ")}

REALIZĂRI ÎN APLICAȚIA BANCA TIMPULUI:
${generatedCV.achievements.join("\n")}

STATISTICI:
Total ore voluntariat: ${generatedCV.totalHours}
Total activități: ${generatedCV.totalActivities}

Generat automat de Banca Timpului - ${moment().format("DD.MM.YYYY")}
    `.trim()

    const blob = new Blob([cvContent], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `CV_Voluntar_${generatedCV.personalInfo.name.replace(
      /\s+/g,
      "_"
    )}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const hasData =
    (documentsData?.data.response && documentsData.data.response.length > 0) ||
    (activitiesData?.data.response &&
      activitiesData.data.response.filter((a: any) => a.status === "Finalizat")
        .length > 0)

  return (
    <Flex direction="column" gap="md">
      <Paper p="md" radius="lg" withBorder>
        <Stack spacing="md">
          <Title order={2} color="brand.6">
            <IconFileText size={24} style={{ marginRight: 8 }} />
            Generare CV Personalizat
          </Title>

          <Text size="sm" color="dimmed">
            Generează un CV profesional pe baza documentelor tale de voluntariat
            și activităților din aplicație.
          </Text>

          {!hasData && (
            <Alert color="orange" title="Nu există date">
              Pentru a genera un CV, trebuie să ai documente de voluntariat
              încărcate sau activități finalizate.
            </Alert>
          )}

          <Group>
            <Button
              onClick={generateCVWithOpenAI}
              disabled={!hasData || isGenerating || isSavingCV}
              leftIcon={
                isGenerating ? <Loader size="sm" /> : <IconFileText size={16} />
              }
              color="brand"
              radius="md"
            >
              {isGenerating
                ? "Se generează..."
                : generatedCV
                ? "Regenerează CV"
                : "Generează CV"}
            </Button>

            {generatedCV && (
              <>
                <Button
                  onClick={() => setShowPreview(true)}
                  leftIcon={<IconEye size={16} />}
                  variant="outline"
                  radius="md"
                >
                  Previzualizare
                </Button>
                <Button
                  onClick={downloadCV}
                  leftIcon={<IconDownload size={16} />}
                  color="green"
                  radius="md"
                >
                  Descarcă CV
                </Button>
              </>
            )}
          </Group>
        </Stack>
      </Paper>

      {generatedCV && (
        <Paper
          p={0}
          radius="lg"
          style={{ maxHeight: "500px", overflowY: "auto" }}
        >
          <Card withBorder radius="lg">
            <Stack spacing="md">
              <Box>
                <Group align="flex-start" spacing="lg">
                  {photo && (
                    <Image
                      src={photo}
                      radius="100%"
                      width={70}
                      height={70}
                      fit="cover"
                      withPlaceholder
                    />
                  )}
                  <Box style={{ flex: 1 }}>
                    <Title order={4} mb="xs">
                      {generatedCV?.personalInfo?.name || name || "N/A"}
                    </Title>
                    <Group spacing="lg">
                      <Group spacing={8}>
                        <IconFileText size={16} />
                        <Text size="sm">
                          {generatedCV?.personalInfo?.email || email || "N/A"}
                        </Text>
                      </Group>
                      <Group spacing={8}>
                        <IconClock size={16} />
                        <Text size="sm">
                          {generatedCV?.personalInfo?.phone || phone || "N/A"}
                        </Text>
                      </Group>
                      <Group spacing={8}>
                        <IconMapPin size={16} />
                        <Text size="sm">
                          {generatedCV?.personalInfo?.location || city || "N/A"}
                        </Text>
                      </Group>
                    </Group>
                  </Box>
                </Group>
              </Box>

              <Divider />

              <Box>
                <Title order={5} mb="xs">
                  Descriere
                </Title>
                <Text size="sm">{generatedCV.summary}</Text>
              </Box>

              <Box>
                <Title order={5} mb="xs">
                  Experiență de Voluntariat
                </Title>
                <Stack spacing="md">
                  {generatedCV?.volunteerExperience?.map((exp, index) => (
                    <Card key={index} withBorder radius="md" p="md">
                      <Group position="apart" mb="xs">
                        <Title order={5}>{exp.organization}</Title>
                        <Badge color="brand">{exp.hours} ore</Badge>
                      </Group>
                      <Text size="sm" color="dimmed" mb="xs">
                        {exp.role} • {exp.period}
                      </Text>
                      <Text size="sm" mb="xs">
                        {exp.description}
                      </Text>
                      <Group spacing={8}>
                        {exp.skills?.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="light" size="xs">
                            {skill}
                          </Badge>
                        ))}
                      </Group>
                    </Card>
                  ))}
                </Stack>
              </Box>

              <Box>
                <Title order={5} mb="xs">
                  Competențe
                </Title>
                <Group spacing={8}>
                  {generatedCV?.skills?.map((skill, index) => (
                    <Badge key={index} color="blue" variant="light" size="md">
                      {skill}
                    </Badge>
                  ))}
                </Group>
              </Box>

              <Box>
                <Title order={5} mb="xs">
                  Activități în Banca Timpului
                </Title>
                <List>
                  {activitiesData?.data?.response
                    ?.filter((activity: any) => activity.status === "Finalizat")
                    ?.map((activity: any, index: number) => {
                      const helpType =
                        activity.helpTypeUuid === "1"
                          ? "Companie"
                          : "Cumpărături"
                      const date = moment(activity.dateOfAppointment).format(
                        "DD.MM.YYYY"
                      )
                      return (
                        <List.Item key={index}>
                          Ajutor {helpType} pentru{" "}
                          {activity.nameGainer || "beneficiar"} în{" "}
                          {activity.cityGainer || "oraș"} ({date}) -{" "}
                          {activity.timeVolunteering || 0} ore
                        </List.Item>
                      )
                    })}
                </List>
              </Box>

              <Divider />

              <Group position="apart">
                <Group>
                  <IconClock size={16} />
                  <Text size="sm">
                    Total ore voluntariat:{" "}
                    <strong>{generatedCV?.totalHours}</strong>
                  </Text>
                </Group>
                <Group>
                  <IconBuilding size={16} />
                  <Text size="sm">
                    Total activități:{" "}
                    <strong>{generatedCV?.totalActivities}</strong>
                  </Text>
                </Group>
              </Group>
            </Stack>
          </Card>
        </Paper>
      )}

      <Modal
        opened={showPreview}
        onClose={() => setShowPreview(false)}
        title="Previzualizare CV"
        size="lg"
        fullScreen
      >
        {generatedCV && (
          <Box p="md">
            <Stack spacing="lg">
              <Title order={2} ta="center" color="brand.6">
                CV VOLUNTAR - {generatedCV?.personalInfo?.name}
              </Title>

              <Box>
                <Title order={4} mb="xs">
                  Date Personale
                </Title>
                <Group align="flex-start" spacing="lg" mb="md">
                  {photo && (
                    <Image
                      src={photo}
                      radius="xl"
                      width={100}
                      height={100}
                      fit="cover"
                      withPlaceholder
                    />
                  )}
                  <Grid style={{ flex: 1 }}>
                    <Grid.Col span={6}>
                      <Text>
                        <strong>Nume:</strong> {generatedCV?.personalInfo?.name}
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Text>
                        <strong>Email:</strong>{" "}
                        {generatedCV?.personalInfo?.email}
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Text>
                        <strong>Telefon:</strong>{" "}
                        {generatedCV?.personalInfo?.phone}
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Text>
                        <strong>Oraș:</strong>{" "}
                        {generatedCV?.personalInfo?.location}
                      </Text>
                    </Grid.Col>
                  </Grid>
                </Group>
              </Box>

              <Divider />

              <Box>
                <Title order={4} mb="xs">
                  Sumar
                </Title>
                <Text>{generatedCV?.summary}</Text>
              </Box>

              <Box>
                <Title order={4} mb="xs">
                  Experiență de Voluntariat
                </Title>
                <Stack spacing="md">
                  {generatedCV?.volunteerExperience?.map((exp, index) => (
                    <Card key={index} withBorder radius="md" p="md">
                      <Group position="apart" mb="xs">
                        <Title order={5}>{exp.organization}</Title>
                        <Badge color="brand">{exp.hours} ore</Badge>
                      </Group>
                      <Text size="sm" color="dimmed" mb="xs">
                        {exp.role} • {exp.period}
                      </Text>
                      <Text size="sm" mb="xs">
                        {exp.description}
                      </Text>
                      <Group spacing={8}>
                        {exp.skills?.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="light" size="xs">
                            {skill}
                          </Badge>
                        ))}
                      </Group>
                    </Card>
                  ))}
                </Stack>
              </Box>

              <Box>
                <Title order={4} mb="xs">
                  Competențe
                </Title>
                <Group spacing={8}>
                  {generatedCV?.skills?.map((skill, index) => (
                    <Badge key={index} color="blue" variant="light" size="md">
                      {skill}
                    </Badge>
                  ))}
                </Group>
              </Box>

              <Box>
                <Title order={4} mb="xs">
                  Realizări
                </Title>
                <List>
                  {generatedCV?.achievements
                    ?.filter(
                      (achievement) => achievement && achievement.trim() !== ""
                    )
                    ?.map((achievement, index) => (
                      <List.Item key={index}>{achievement}</List.Item>
                    ))}
                </List>
              </Box>

              <Divider />

              <Group position="apart">
                <Text>
                  <strong>Total ore voluntariat:</strong>{" "}
                  {generatedCV?.totalHours}
                </Text>
                <Text>
                  <strong>Total activități:</strong>{" "}
                  {generatedCV?.totalActivities}
                </Text>
              </Group>

              <Text size="xs" color="dimmed" ta="center">
                Generat automat de Banca Timpului -{" "}
                {moment().format("DD.MM.YYYY")}
              </Text>
            </Stack>
          </Box>
        )}
      </Modal>

      <ErrorSuccesNotification />
    </Flex>
  )
}
