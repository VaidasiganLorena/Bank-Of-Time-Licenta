import { Card, Group, Text, Image, createStyles, Chip, Flex } from '@mantine/core'
import React, { FunctionComponent } from 'react'

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: 'white',
    boxShadow: '0px 0px 7px 0px rgba(143,143,143,1)',
  },

  title: {
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.2,
  },

  body: {
    padding: theme.spacing.md,
  },
}))
type TInfoGainerCard = {
  city: string
  description: string
  gainerUuid: string
  name: string
  age: number
}
export const Cards: FunctionComponent<TInfoGainerCard> = (props) => {
  const { name, description, city, age, gainerUuid } = props
  const { classes } = useStyles()
  return (
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

          <Group spacing="xs" align={'center'} mt={'xs'}>
            <Text size="sm">Ajutor pentru :</Text>
            <Chip checked={true} color="teal" size={'xs'}>
              Cumparaturi
            </Chip>
          </Group>
        </div>
      </Group>
    </Card>
  )
}
