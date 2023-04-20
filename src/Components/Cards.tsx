import {
  Card,
  Group,
  Text,
  Image,
  createStyles,
  Chip,
  Flex,
  Button,
  Modal,
  Select,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import React, { FunctionComponent } from 'react'

const useStyles = createStyles((theme) => ({
  card: {
    cursor: 'pointer',

    backgroundColor: 'white',
    boxShadow: '0px 0px 7px 0px rgba(143,143,143,1)',

    '&:hover': {
      transform: 'scale(1.03)',
      boxShadow: theme.shadows.lg,
    },
  },

  title: {
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.2,
  },

  body: {
    padding: theme.spacing.md,
  },
  modalCard: {
    height: '40%',
  },
}))
type TInfoGainerCard = {
  city: string
  description: string
  gainerUuid: string
  name: string
  age: number
  helpTypeUuid?: string
  helpTypeName: string
  listOfDates: string
}
export const Cards: FunctionComponent<TInfoGainerCard> = (props) => {
  const { name, description, city, age, gainerUuid, helpTypeName, listOfDates } = props
  const [opened, { open, close }] = useDisclosure(false)
  const { classes } = useStyles()
  const dates = listOfDates.split(',')
  return (
    <>
      <Card radius="lg" p={0} className={classes.card} key={gainerUuid}>
        <Group noWrap spacing={0}>
          <Image src={'/solidarity.png'} height={200} width={200} />
          <div className={classes.body}>
            <Group mb={10}>
              <Text className={classes.title} size="xl">
                {name}
              </Text>
              <Flex align={'center'} justify="space-around" w={'20%'}>
                <Text size="sm">•</Text>
                <Text size="sm">{age}</Text>
                <Text size="sm">•</Text>
                <Text size="sm">{city}</Text>
                <Text size="sm">•</Text>
              </Flex>
            </Group>

            <Text color="dimmed" weight={500} size="sm">
              {description}
            </Text>

            <Group spacing="xs" align={'center'} position="apart" mt={'xs'}>
              <Group>
                <Text size="sm">Ajutor pentru :</Text>
                <Chip checked={true} color="teal" size={'xs'}>
                  {helpTypeName}
                </Chip>
              </Group>

              <Button onClick={open} radius={'xl'} bg="#28886f">
                Ajută
              </Button>
            </Group>
          </div>
        </Group>{' '}
      </Card>
      <Modal
        opened={opened}
        onClose={close}
        radius="lg"
        title="Alege când ești disponibil să ajuți.."
        centered
        className={classes.modalCard}
      >
        <Select
          radius={'xl'}
          label="Datele disponibile"
          placeholder="Alege data potrivită"
          data={dates}
        />
        <Button onClick={close} my={20} radius={'xl'} bg="#28886f">
          Programează
        </Button>
      </Modal>
    </>
  )
}
