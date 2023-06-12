import { IconCheck, IconX } from '@tabler/icons-react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../Redux/store'
import { createStyles, Notification } from '@mantine/core'
import { resetErrorNotification, resetMessageNotification } from '../Redux/notification/slice'

const useStyles = createStyles(() => ({
  notification: {
    position: 'fixed',
    bottom: 5,
    right: 8,
    zIndex: 100,
  },
}))

export const ErrorSuccesNotification = () => {
  const dispatch = useDispatch()
  const { classes } = useStyles()
  const { messageNotification, errorNotification } = useSelector(
    (state: RootState) => state.notification,
  )

  useEffect(() => {
    if (messageNotification.length > 0 || errorNotification.length > 0) {
      const timer = setTimeout(() => {
        dispatch(resetErrorNotification())
        dispatch(resetMessageNotification())
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [messageNotification, errorNotification])

  return messageNotification.length > 0 || errorNotification.length > 0 ? (
    <Notification
      radius="lg"
      color={errorNotification !== '' ? 'red' : 'teal'}
      withCloseButton={true}
      onClose={() => {
        dispatch(resetErrorNotification())
        dispatch(resetMessageNotification())
      }}
      icon={errorNotification !== '' ? <IconX size="1.1rem" /> : <IconCheck size="1.1rem" />}
      className={classes.notification}
    >
      {errorNotification !== '' ? errorNotification : messageNotification}
    </Notification>
  ) : null
}
