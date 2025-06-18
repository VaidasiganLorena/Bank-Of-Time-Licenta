import { ActionIcon, Text, FileInput, Flex, Table } from "@mantine/core"
import { IconDownload, IconEye, IconTrash } from "@tabler/icons-react"
import React from "react"
import { useState } from "react"

export const UploadFiles = () => {
  const [files, setFiles] = useState<File[]>([])
  const rows = files.map((file) => (
    <tr key={file.name}>
      <td>{file.name}</td>
      <td>
        <ActionIcon>
          <IconTrash />
        </ActionIcon>
        <ActionIcon>
          <IconDownload />
        </ActionIcon>
        <ActionIcon>
          <IconEye />
        </ActionIcon>
      </td>
    </tr>
  ))

  return (
    <div>
      <Flex>
        <Text style={{ color: "black" }}>
          Faptele bune merită recunoscute! Încarcă o poză cu dovada
          activităților tale de voluntariat – o diplomă, o adeverință sau un
          certificat. Le vom salva în profilul tău și le vei putea include cu un
          click în CV.
        </Text>
        <FileInput
          accept="image/png,image/jpeg"
          label="Adaugă documente"
          capture="environment"
        />
      </Flex>

      <Table>
        <thead>
          <tr>
            <th>Document/Adeverință</th>
            <th>Acțiuni</th>
          </tr>
        </thead>
        <tbody>
          {files.length > 0 ? (
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
    </div>
  )
}
