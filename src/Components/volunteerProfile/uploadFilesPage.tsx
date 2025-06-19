import {
  ActionIcon,
  Text,
  FileInput,
  Flex,
  Table,
  Modal,
  Loader,
  Grid,
  Group,
} from "@mantine/core"
import { IconDownload, IconEye, IconTrash } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import {
  useGetVolunteerDocuments,
  VolunteerDocument,
} from "../../api/volunteer-doc/useGetDoc"
import { usePostVolunteerDocument } from "../../api/volunteer-doc/usePostDoc"
import { useDeleteVolunteerDocument } from "../../api/volunteer-doc/useDeleteDoc"
import { ErrorSuccesNotification } from "../../Notification/notification"
import { extractTextFromImage } from "./utils/readDoc.utils"
import { generateDocData } from "./utils/generateDocData.utils"
import { validateVolunteerDocument } from "./utils/validateVolunteerDoc.utils"
import { setErrorNotification } from "../../Redux/notification/slice"
import { generateHash } from "./utils/generateHash.utils"
import { FC } from "react"

export const UploadFiles: FC<{
  setNrDoc: (nrDoc: number) => void
  setGeneretingCV: (isGeneretingCV: boolean) => void
}> = ({ setNrDoc, setGeneretingCV }) => {
  const [previewFile, setPreviewFile] = useState<VolunteerDocument | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [fileValue, setFileValue] = useState<File | null>(null)
  const userUuid = sessionStorage.getItem("userUuid")
  const authToken = sessionStorage.getItem("userToken")

  const {
    data: documentsData,
    isLoading: isLoadingDocuments,
    refetch,
  } = useGetVolunteerDocuments(() => {})

  const { mutate: createDocument, isLoading: isCreating } =
    usePostVolunteerDocument(
      () => {
        setIsProcessing(false)
        setFileValue(null)
        refetch()
      },
      (error) => {
        console.log(error)
        setErrorNotification("Eroare la încărcarea documentului")
        setIsProcessing(false)
        setFileValue(null)
      }
    )

  const { mutate: deleteDocument } = useDeleteVolunteerDocument(
    () => {
      refetch()
    },
    (error) => {
      console.log(error)
      setErrorNotification("Eroare la ștergerea documentului")
    }
  )

  const handleFileUpload = async (newFile: File | null) => {
    setFileValue(newFile)
    if (newFile && userUuid) {
      setIsProcessing(true)
      const existingDocuments = documentsData?.data.response || []

      const isDuplicateFilename = existingDocuments.some(
        (doc: VolunteerDocument) => doc.fileName === newFile.name
      )

      if (isDuplicateFilename) {
        setError(
          `Exista deja un document cu acest nume. Te rog sa verifici daca ai incarcat deja acest document.`
        )
        setIsProcessing(false)
        setFileValue(null)
        return
      }

      try {
        const extractedText = await extractTextFromImage(newFile)
        const { isValid } = await validateVolunteerDocument(extractedText)

        if (!isValid) {
          setError(
            `Documentul nu pare să fie o adeverință de voluntariat validă. Te rog să încarci doar documente care conțin informații despre activități de voluntariat, adeverințe, certificate sau diplome.`
          )
          setIsProcessing(false)
          setFileValue(null)
          return
        }

        const currentTextHash = generateHash(extractedText)

        const isDuplicateContent = existingDocuments.find(
          (doc: VolunteerDocument) => {
            if (doc.extractText) {
              const docHash = generateHash(doc.extractText)
              return docHash === currentTextHash
            }
            return false
          }
        )

        if (isDuplicateContent) {
          setError(
            `Un document cu conținut identic există. Te rog să verifici dacă ai încărcat deja acest document.`
          )
          setIsProcessing(false)
          setFileValue(null)
          return
        }

        const processedData = await generateDocData(extractedText)

        // if (processedData.volunteerName) {
        //   setError(
        //     `Acest document nu contine numele voluntarului. Te rog sa verifici daca ai incarcat un document valid.`
        //   )
        //   setIsProcessing(false)
        //   return
        // }
        delete processedData.volunteerName
        console.log(processedData)

        const reader = new FileReader()
        reader.readAsDataURL(newFile)
        reader.onload = () => {
          const base64String = reader.result as string

          createDocument({
            ...processedData,
            fileName: `${processedData.organization} - ${processedData.dateFrom}`,
            urlDoc: base64String,
            userUuid: userUuid,
            extractText: extractedText,
          })
        }
      } catch (error) {
        setErrorNotification("Eroare la încărcarea documentului")
        setIsProcessing(false)
        setFileValue(null)
      }
    }
  }

  const handleDelete = (documentUuid: string) => {
    deleteDocument(documentUuid)
  }

  const handleDownload = (document: VolunteerDocument) => {
    if (document.urlDoc) {
      const link = window.document.createElement("a")
      link.href = document.urlDoc
      link.download = document.fileName || "document"
      window.document.body.appendChild(link)
      link.click()
      window.document.body.removeChild(link)
    }
  }

  const handlePreview = (document: VolunteerDocument) => {
    setPreviewFile(document)
    setIsPreviewOpen(true)
  }

  const rows =
    (documentsData &&
      documentsData.data.response.map((document: VolunteerDocument) => (
        <tr key={document.uuidDoc}>
          <td style={{ width: "100%" }}>
            <Grid>
              <Grid.Col span={10}>{document.fileName}</Grid.Col>
              <Grid.Col
                span={2}
                style={{
                  display: "flex",
                  gap: 10,
                  justifyContent: "flex-end",
                }}
              >
                <ActionIcon
                  onClick={() => handlePreview(document)}
                  color="green"
                >
                  <IconEye />
                </ActionIcon>
                <ActionIcon
                  onClick={() => handleDownload(document)}
                  color="blue"
                >
                  <IconDownload />
                </ActionIcon>
                <ActionIcon
                  onClick={() => handleDelete(document.uuidDoc)}
                  color="red"
                >
                  <IconTrash />
                </ActionIcon>
              </Grid.Col>
            </Grid>
          </td>
        </tr>
      ))) ||
    []
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null)
        setFileValue(null)
      }, 5000)
    }
  }, [error])
  useEffect(() => {
    setNrDoc(documentsData?.data.count || 0)
  }, [documentsData, setNrDoc])

  return (
    <div>
      <Flex direction="column" gap={10}>
        <Text style={{ color: "black", marginTop: "10px" }}>
          Faptele bune merită recunoscute! Încarcă diploma, adeverința sau
          certificatul tău de voluntariat – noi ți le organizăm și le păstrăm în
          profilul tău, gata să le folosești când ai nevoie.
        </Text>
        <Flex direction="column" gap={10}>
          {rows.length > 0 ? (
            <Group spacing={5}>
              <Text style={{ color: "black" }}>
                Bravo pentru implicare! Acum poți crea un CV complet, care să
                reflecte activitățile tale de voluntariat,
              </Text>

              <Text
                onClick={() => setGeneretingCV(true)}
                style={{
                  width: "fit-content",
                  cursor: "pointer",
                  color: "#2f6e5dd1",
                  fontWeight: 500,
                }}
              >
                click aici pentru a vedea CV-ul.
              </Text>
            </Group>
          ) : (
            <>
              <Text style={{ color: "black", fontSize: "14px" }}>
                Pentru a genera un CV profesional cu activitățile tale de
                voluntariat, trebuie să încarci cel puțin un document
                (adeverință, certificat sau diplomă).
              </Text>

              <Text
                style={{
                  width: "fit-content",
                  marginLeft: "auto",
                  color: "#868e96",
                  fontStyle: "italic",
                  fontSize: "14px",
                }}
              >
                Încarcă primul document pentru a începe
              </Text>
            </>
          )}
        </Flex>

        <FileInput
          accept="image/png,image/jpeg,image/webp"
          label="Adaugă adeverințe/certificare/diplome"
          capture="environment"
          value={fileValue}
          onChange={handleFileUpload}
          disabled={isCreating || isProcessing}
          error={error ? error : null}
          style={{ marginBottom: "5px" }}
        />
      </Flex>

      {(isProcessing || isCreating) && (
        <Flex justify="center" align="center" mt={20} mb={20}>
          <Loader size="md" />
          <Text ml={10}>Procesare document...</Text>
        </Flex>
      )}

      <Table
        style={{ maxHeight: "300px", overflowY: "auto", marginTop: "5px" }}
      >
        <thead>
          <tr>
            <th>Documente/Adeverințe de voluntariat</th>
          </tr>
        </thead>
        <tbody>
          {isLoadingDocuments ? (
            <tr>
              <td colSpan={2} style={{ textAlign: "center" }}>
                <Loader size="sm" />
              </td>
            </tr>
          ) : rows.length > 0 ? (
            rows
          ) : (
            <tr>
              <td colSpan={2} style={{ textAlign: "center" }}>
                Nu există documente
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <Modal
        opened={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        title=""
        size="lg"
      >
        {previewFile?.urlDoc && (
          <img
            src={previewFile.urlDoc}
            alt={previewFile.fileName || "Document preview"}
            style={{ width: "100%", height: "auto" }}
          />
        )}
      </Modal>
      <ErrorSuccesNotification />
    </div>
  )
}
