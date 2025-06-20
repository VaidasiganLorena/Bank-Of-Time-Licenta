import {
  Box,
  Paper,
  Stack,
  Group,
  Title,
  Text,
  Badge,
  List,
  Image,
  Grid,
} from "@mantine/core"
import {
  IconFileText,
  IconClock,
  IconMapPin,
  IconBuilding,
  IconMail,
} from "@tabler/icons-react"
import { FC, useRef, useEffect, useState } from "react"
import moment from "moment"
import { CVData } from "../../api/cv/useUpdateCV"

interface CVPreviewProps {
  generatedCV: CVData | null
  activitiesData: any
  photo?: string
}

export const CVPreview: FC<CVPreviewProps> = ({
  generatedCV,
  activitiesData,
  photo,
}) => {
  const [pages, setPages] = useState<JSX.Element[]>([])
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!generatedCV) return

    const splitIntoPages = () => {
      const A4_HEIGHT = 1123 // A4 height in pixels at 96 DPI
      const MARGIN = 40 // Top and bottom margin
      const CONTENT_HEIGHT = A4_HEIGHT - MARGIN * 2

      // Create the full content first
      const fullContent = (
        <Box
          ref={contentRef}
          style={{
            position: "relative",
          }}
        >
          <Stack spacing="2rem">
            <Box
              style={{
                paddingBottom: "md",
              }}
            >
              <Group align="flex-start" spacing="lg">
                {photo && (
                  <Image
                    src={photo}
                    radius="100%"
                    width={120}
                    height={120}
                    fit="cover"
                    withPlaceholder
                  />
                )}
                <Box style={{ flex: 1 }}>
                  <Title
                    order={1}
                    color="black"
                    style={{ fontSize: "2em", fontWeight: "bold" }}
                  >
                    {generatedCV?.personalInfo?.name}
                  </Title>
                  <Text
                    size="md"
                    mb={5}
                    color="dimmed"
                    style={{ fontSize: "1rem" }}
                  >
                    Voluntar în Comunitate
                  </Text>
                  <Grid>
                    <Grid.Col span={6}>
                      <Group spacing={8} mb="xs">
                        <IconMail size={16} color="#28886f" />
                        <Text size="sm">
                          {generatedCV?.personalInfo?.email}
                        </Text>
                      </Group>
                      <Group spacing={8} mb="xs">
                        <IconClock size={16} color="#28886f" />
                        <Text size="sm">
                          {generatedCV?.personalInfo?.phone}
                        </Text>
                      </Group>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Group spacing={8} mb="xs">
                        <IconMapPin size={16} color="#28886f" />
                        <Text size="sm">
                          {generatedCV?.personalInfo?.location}
                        </Text>
                      </Group>
                      <Group spacing={8} mb="xs">
                        <IconBuilding size={16} color="#28886f" />
                        <Text size="sm">
                          Total: {generatedCV?.totalHours} ore voluntariat
                        </Text>
                      </Group>
                    </Grid.Col>
                  </Grid>
                </Box>
              </Group>
            </Box>

            <Box>
              <Title
                order={3}
                mb="xs"
                style={{
                  color: "#2c3e50",
                  borderBottom: "2px solid #e6e8ea",
                }}
              >
                SUMAR PROFESIONAL
              </Title>
              <Text size="md" style={{ lineHeight: 1.6 }}>
                {generatedCV?.summary}
              </Text>
            </Box>

            {/* Volunteer Experience Section */}
            <Box>
              <Title
                order={3}
                mb="md"
                style={{
                  color: "#2c3e50",
                  borderBottom: "2px solid #e6e8ea",
                }}
              >
                EXPERIENȚĂ DE VOLUNTARIAT
              </Title>
              <Stack spacing="2rem">
                {generatedCV?.volunteerExperience?.map((exp, index) => (
                  <Box
                    key={index}
                    style={{
                      paddingLeft: "md",
                      borderRadius: "10px",
                    }}
                  >
                    <Group position="apart" mb="0px">
                      <Title order={4} style={{ color: "#2c3e50" }}>
                        {exp.organization}
                      </Title>
                      <Badge
                        color="brand"
                        variant="outline"
                        size="md"
                        style={{ fontWeight: "bold" }}
                      >
                        {exp.hours} ore
                      </Badge>
                    </Group>
                    <Text
                      size="sm"
                      color="dimmed"
                      mb="0px"
                      style={{ fontStyle: "italic" }}
                    >
                      {exp.role} • {exp.period}
                    </Text>
                    <Text size="md" mb="xs" style={{ lineHeight: 1.5 }}>
                      {exp.description}
                    </Text>
                    <Group spacing={8}>
                      {exp.skills?.map((skill, skillIndex) => (
                        <Badge
                          key={skillIndex}
                          variant="filled"
                          color="brand"
                          size="md"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </Group>
                  </Box>
                ))}
              </Stack>
            </Box>

            {/* Skills Section */}
            <Box>
              <Title
                order={3}
                mb="md"
                style={{
                  color: "#2c3e50",
                  borderBottom: "2px solid #e6e8ea",
                }}
              >
                COMPETENȚE
              </Title>
              <Box
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
                  gap: "10px",
                  padding: "0px",
                }}
              >
                {generatedCV?.skills?.map((skill, index) => (
                  <Badge key={index} variant="dot" size="md" w="100%">
                    {skill}
                  </Badge>
                ))}
              </Box>
            </Box>

            {/* Achievements Section */}
            <Box>
              <Title
                order={3}
                mb="xs"
                style={{
                  color: "#2c3e50",
                  borderBottom: "2px solid #e6e8ea",
                }}
              >
                REALIZĂRI
              </Title>
              <List spacing="0px" style={{ paddingLeft: "md" }}>
                {generatedCV?.achievements
                  ?.filter(
                    (achievement) => achievement && achievement.trim() !== ""
                  )
                  ?.map((achievement, index) => (
                    <List.Item
                      key={index}
                      style={{ fontSize: "0.95rem", lineHeight: 1.5 }}
                    >
                      {achievement}
                    </List.Item>
                  ))}
              </List>
            </Box>

            {/* Activities in Bank of Time Section */}
            <Box>
              <Title
                order={3}
                mb="md"
                style={{
                  color: "#2c3e50",
                  borderBottom: "2px solid #e6e8ea",
                }}
              >
                ACTIVITĂȚI ÎN BANCA TIMPULUI
              </Title>
              <Stack spacing="md">
                {activitiesData?.data?.response
                  ?.filter((activity: any) => activity.status === "Finalizat")
                  ?.map((activity: any, index: number) => {
                    const helpType =
                      activity.helpTypeUuid === "1" ? "Companie" : "Cumpărături"
                    const date = moment(activity.dateOfAppointment).format(
                      "DD.MM.YYYY"
                    )
                    return (
                      <Box
                        key={index}
                        style={{
                          padding: "md",
                          borderRadius: "10px",
                        }}
                      >
                        <Group align="flex-start" spacing="md">
                          {activity.photoGainer && (
                            <Image
                              src={activity.photoGainer}
                              radius="10px"
                              width={50}
                              height={50}
                              fit="cover"
                              withPlaceholder
                            />
                          )}
                          <Box style={{ flex: 1 }}>
                            <Group position="apart" mb="0px">
                              <Title order={5} style={{ color: "#2c3e50" }}>
                                {helpType} pentru{" "}
                                {activity.nameGainer || "beneficiar"}
                              </Title>
                              <Badge
                                color="brand"
                                variant="outline"
                                style={{ fontWeight: "bold" }}
                              >
                                {activity.timeVolunteering || 0} ore
                              </Badge>
                            </Group>
                            <Group spacing="lg" mb="xs">
                              <Group spacing={4}>
                                <IconMapPin size={14} color="#28886f" />
                                <Text size="sm" color="dimmed">
                                  {activity.cityGainer || "Oraș necunoscut"}
                                </Text>
                              </Group>
                              <Group spacing={4}>
                                <IconClock size={14} color="#28886f" />
                                <Text size="sm" color="dimmed">
                                  {date}
                                </Text>
                              </Group>
                            </Group>
                          </Box>
                        </Group>
                      </Box>
                    )
                  })}
              </Stack>
            </Box>

            {/* Footer */}
            <Box
              style={{
                paddingTop: "xs",
                textAlign: "center",
              }}
            >
              <Text size="sm" color="dimmed">
                Generat automat de Banca Timpului -{" "}
                {moment().format("DD.MM.YYYY")}
              </Text>
            </Box>
          </Stack>
        </Box>
      )

      setPages([
        <Paper
          key={0}
          p="xl"
          radius="md"
          style={{
            backgroundColor: "white",
            maxWidth: "800px",
            margin: "0 auto",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          {fullContent}
        </Paper>,
      ])
    }

    // Use setTimeout to ensure DOM is fully rendered
    setTimeout(splitIntoPages, 100)
  }, [generatedCV, activitiesData, photo])

  if (!generatedCV) return null

  return (
    <Box p="xl" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      {pages}
    </Box>
  )
}
