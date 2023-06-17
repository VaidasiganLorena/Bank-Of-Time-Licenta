import { Button, Group, LoadingOverlay, Modal, Paper, Text } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import React, { FunctionComponent } from 'react'
import { maxWidthMobile } from '../../Utils/constants'
interface IDeleteModal {
  isOpenModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  onDelete: () => void
  title: string
  subTitle: string
  mainActionText: string
  isLoading: boolean
}
export const GenericDeleteModal: FunctionComponent<IDeleteModal> = ({
  isOpenModal,
  setOpenModal,
  onDelete,
  title,
  subTitle,
  mainActionText,
  isLoading,
}) => {
  const isMobile = useMediaQuery(maxWidthMobile)
  return (
    <Modal
      opened={isOpenModal}
      onClose={() => setOpenModal(false)}
      title={mainActionText}
      centered
      size={isMobile ? 'calc(100vw - 3rem)' : 'auto'}
      xOffset={0}
      zIndex={2000}
    >
      <Paper p="xs">
        <Text>{title}</Text>
        <Text>{subTitle}</Text>
      </Paper>
      <Group position="center" mt="md">
        <Button radius="xl" type="submit" onClick={() => onDelete()}>
          {mainActionText}
        </Button>
        <Button
          variant={'light'}
          radius="xl"
          type="submit"
          onClick={() => {
            setOpenModal(false)
          }}
        >
          Anulează
        </Button>
      </Group>
      <LoadingOverlay visible={isLoading} />
    </Modal>
  )
}
