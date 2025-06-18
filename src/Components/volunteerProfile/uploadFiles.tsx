import {
  ActionIcon,
  Text,
  FileInput,
  Flex,
  Table,
  Modal,
  Loader,
  Grid,
} from "@mantine/core"
import { IconDownload, IconEye, IconTrash } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import {
  useGetVolunteerDocuments,
  VolunteerDocument,
} from "../../api/volunteer-doc/useGetDoc"
import { useCreateVolunteerDocument } from "../../api/volunteer-doc/useCreateDoc"
import { useDeleteVolunteerDocument } from "../../api/volunteer-doc/useDeleteDoc"
import { ErrorSuccesNotification } from "../../Notification/notification"
import { extractTextFromImage } from "./utils/readDoc.utils"
import { generateDocData } from "./utils/generateDocData.utils"
import { validateVolunteerDocument } from "./utils/validateVolunteerDoc.utils"
import { setErrorNotification } from "../../Redux/notification/slice"
import { generateHash } from "./utils/generateHash.utils"

export const UploadFiles = () => {
  const [previewFile, setPreviewFile] = useState<VolunteerDocument | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const userUuid = sessionStorage.getItem("userUuid")
  const authToken = sessionStorage.getItem("authToken")

  const {
    data: documentsData,
    isLoading: isLoadingDocuments,
    refetch,
  } = useGetVolunteerDocuments(() => {}, authToken)

  const { mutate: createDocument, isLoading: isCreating } =
    useCreateVolunteerDocument(
      () => {
        setIsProcessing(false)
        refetch()
      },
      (error) => {
        setErrorNotification("Eroare la încărcarea documentului")
        setIsProcessing(false)
      }
    )

  const { mutate: deleteDocument } = useDeleteVolunteerDocument(
    () => {
      refetch()
    },
    (error) => {
      setErrorNotification("Eroare la ștergerea documentului")
    }
  )

  const handleFileUpload = async (newFile: File | null) => {
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
          return
        }

        const processedData = await generateDocData(extractedText)

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
      }, 5000)
    }
  }, [error])

  return (
    <div>
      <Flex direction="column" gap={10}>
        <Text style={{ color: "black" }}>
          Faptele bune merită recunoscute! Încarcă o poză cu dovada
          activităților tale de voluntariat – o diplomă, o adeverință sau un
          certificat. Le vom salva în profilul tău și le vei putea include cu un
          click în CV.
        </Text>
        <FileInput
          accept="image/png,image/jpeg,image/webp"
          label="Adaugă adeverințe/certificare/diplome"
          capture="environment"
          onChange={handleFileUpload}
          disabled={isCreating || isProcessing}
          error={error ? error : null}
        />
      </Flex>
      {(isProcessing || isCreating) && (
        <Flex justify="center" align="center" mt={20}>
          <Loader size="md" />
          <Text ml={10}>Procesare document...</Text>
        </Flex>
      )}

      <Table>
        <thead>
          <tr>
            <th>Document/Adeverință</th>
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
        title="Preview Document"
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
