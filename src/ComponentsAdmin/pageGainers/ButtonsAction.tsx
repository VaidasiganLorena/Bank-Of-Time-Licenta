import { ActionIcon, Button, Group, Modal, Paper, Tooltip, Text } from '@mantine/core'
import { IconCalendarTime, IconEdit, IconTrash } from '@tabler/icons-react'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useDeleteGainer } from '../../api/gainer/useDeleteGainer'
import { useGetInfoGainers } from '../../api/gainer/useGetGainers'
import { setErrorNotification, setMessageNotification } from '../../Redux/notification/slice'
import { RootState } from '../../Redux/store'
import { IGainer } from '../../types/typeGainer'
import { FormGainersData } from './FormGainer'

export const ButtonsAction: FunctionComponent<{ gainerUuid: string }> = (props) => {
  const { gainerUuid } = props
  const [openModalEditGainer, setOpenModalEditGainer] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [currentGainer, setCurrentGainer] = useState<IGainer>()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { gainersEntriesData } = useSelector((state: RootState) => state.gainers)
  const succesCallback = (data: any) => {
    dispatch(setMessageNotification(data.message))
  }
  const errorCallback = (error: any) => {
    dispatch(setErrorNotification(error))
  }
  const authToken = sessionStorage.getItem('userToken')
  const { refetch } = useGetInfoGainers(succesCallback, authToken)
  const { mutate } = useDeleteGainer(succesCallback, errorCallback)
  const onDeleteGainer = () => {
    mutate({ gainerUuid })
    setShowDeleteModal(false)
    refetch()
  }
  useEffect(() => {
    const currGainer = gainersEntriesData.find((gainer) => gainer.gainerUuid.includes(gainerUuid))
    setCurrentGainer(currGainer)
  }, [gainerUuid, gainersEntriesData])

  return (
    <>
      <Group>
        <Tooltip
          label="Programări"
          offset={-10}
          position="bottom"
          color={'transparent'}
          style={{ color: '#1c6350' }}
        >
          <ActionIcon
            radius="xl"
            variant="subtle"
            style={{ color: '#1c6350' }}
            component="button"
            onClick={() => navigate(`/gainer-appointments/${gainerUuid}`)}
          >
            <IconCalendarTime size="1.125rem" />
          </ActionIcon>
        </Tooltip>

        <Tooltip
          label="Editează"
          offset={-10}
          position="bottom"
          color={'transparent'}
          style={{ color: '#28886f' }}
        >
          <ActionIcon
            radius="xl"
            variant="subtle"
            style={{ color: '#28886f' }}
            onClick={() => setOpenModalEditGainer(true)}
          >
            <IconEdit size="1.125rem" />
          </ActionIcon>
        </Tooltip>

        <Tooltip
          label="Șterge"
          offset={-10}
          position="bottom"
          color={'transparent'}
          style={{ color: 'red' }}
        >
          <ActionIcon
            color="red"
            radius="xl"
            variant="subtle"
            onClick={() => setShowDeleteModal(true)}
          >
            <IconTrash size="1.125rem" />
          </ActionIcon>
        </Tooltip>
      </Group>
      <FormGainersData
        isOpenModal={openModalEditGainer}
        setOpenModal={setOpenModalEditGainer}
        isModEdit={true}
        dataGainer={currentGainer}
      ></FormGainersData>
      <Modal
        opened={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Ștergere Beneficiar"
        centered
        zIndex={2000}
      >
        <Paper p="xs">
          <Text>Urmează să ștergi un beneficiar</Text>
          <Text>Ești sigur(ă) ca vrei sa ștergi beneficiarul selectat?</Text>
        </Paper>
        <Group position="center" mt="md">
          <Button radius="xl" type="submit" onClick={onDeleteGainer}>
            Șterge beneficiar
          </Button>
          <Button
            variant={'light'}
            radius="xl"
            type="submit"
            onClick={() => {
              setShowDeleteModal(false)
            }}
          >
            Anulează
          </Button>
        </Group>
      </Modal>
    </>
  )
}
