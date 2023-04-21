import { Button, Group, Modal, Text } from '@mantine/core'
import React, { FunctionComponent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDeleteUser } from '../../api/user/useDeleteUser'
import { useStyles } from './PersonalData'

export const OptionToDelete: FunctionComponent<{ open: boolean; setOpen: any }> = (props) => {
  const { open, setOpen } = props
  const { classes } = useStyles()
  const userUuid = localStorage.getItem('userUuid')
  const authToken = localStorage.getItem('authToken')
  const navigate = useNavigate()
  const successDeleteCallBack = () => {
    sessionStorage.clear()
    navigate('/')
  }
  const errorDeleteCallBack = (error: any) => {
    if (error.status === 400) {
      console.log(error)
    }
  }

  const { mutate } = useDeleteUser(successDeleteCallBack, errorDeleteCallBack)
  const handleDeleteAcount = () => {
    mutate({ userUuid, authToken })
  }
  return (
    <Modal opened={open} onClose={() => setOpen(false)} radius={'lg'} title="Ștergere cont">
      <Text>
        Sunteți sigur că doriți să ștergeți contul? O dată șters acesta nu poate fi recuperat.
      </Text>
      <Group position="right">
        <Button
          size="sm"
          variant={'outline'}
          className={classes.saveButton}
          onClick={() => handleDeleteAcount()}
        >
          Ștergere
        </Button>
        <Button size="sm" className={classes.cancelButton} onClick={() => setOpen(false)}>
          Anulare
        </Button>
      </Group>
    </Modal>
  )
}
