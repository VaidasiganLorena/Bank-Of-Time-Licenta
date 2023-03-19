import { Container, Group, createStyles, TextInput } from '@mantine/core'
import React, { FunctionComponent } from 'react'
import { TInfoUser } from './AvaibleFormPersonalData'
const useStyles = createStyles((theme: any) => ({
  input: {
    backgroundColor: '#f3f5f7',
    width: '25vw',
    [theme.fn.largerThan(1800)]: {
      width: '15vw',
    },
    [theme.fn.smallerThan(1300)]: {
      width: '33vw',
    },
    [theme.fn.smallerThan(980)]: {
      width: '40vw',
    },
    [theme.fn.smallerThan('xs')]: {
      width: '70vw',
    },
  },
}))

export const DisableFormPersonalData: FunctionComponent<TInfoUser> = (props) => {
  const { firstname, lastname, email, numberPhone, gender, city } = props
  const { classes } = useStyles()

  return (
    <Container p={0} mb={20}>
      <Group position="center" spacing={15}>
        <TextInput
          label="Nume"
          variant="filled"
          defaultValue={lastname}
          size="md"
          radius={10}
          classNames={{ input: classes.input }}
          disabled
        />

        <TextInput
          label="Prenume"
          variant="filled"
          defaultValue={firstname}
          size="md"
          radius={10}
          classNames={{ input: classes.input }}
          disabled
        />
      </Group>
      <Group position="center" mt={16} spacing={15}>
        <TextInput
          label="Adresa de email"
          variant="filled"
          defaultValue={email}
          size="md"
          radius={10}
          classNames={{ input: classes.input }}
          disabled
        />
        <TextInput
          label="Număr de telefon"
          variant="filled"
          defaultValue={numberPhone}
          size="md"
          radius={10}
          classNames={{ input: classes.input }}
          disabled
        />
      </Group>

      <Group position="center" mt={16} spacing={15}>
        <TextInput
          label="Oraș"
          variant="filled"
          defaultValue={city}
          size="md"
          radius={10}
          classNames={{ input: classes.input }}
          disabled
        />
        <TextInput
          label="Gen"
          defaultValue={gender}
          variant="filled"
          size="md"
          radius={10}
          classNames={{ input: classes.input }}
          disabled
        />
      </Group>
    </Container>
  )
}
