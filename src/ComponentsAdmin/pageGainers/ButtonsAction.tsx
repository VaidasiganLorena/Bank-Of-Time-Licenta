import { ActionIcon, Group, Tooltip } from '@mantine/core'
import { IconCalendarTime, IconEdit, IconTrash } from '@tabler/icons-react'
import React from 'react'

export default function ButtonsAction() {
  return (
    <Group>
      <Tooltip
        label="Programări"
        offset={-10}
        position="bottom"
        color={'transparent'}
        style={{ color: '#1c6350' }}
      >
        <ActionIcon radius="xl" variant="subtle" style={{ color: '#1c6350' }}>
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
        <ActionIcon radius="xl" variant="subtle" style={{ color: '#28886f' }}>
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
        <ActionIcon color="red" radius="xl" variant="subtle">
          <IconTrash size="1.125rem" />
        </ActionIcon>
      </Tooltip>
    </Group>
  )
}
