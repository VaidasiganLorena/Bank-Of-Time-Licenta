import { useState } from 'react'
import {
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  rem,
  Flex,
  Stack,
} from '@mantine/core'
import { keys } from '@mantine/utils'
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons-react'
import { useMediaQuery } from '@mantine/hooks'
import { ButtonsAction } from './ButtonsAction'
import moment from 'moment'
import { RootState } from '../../Redux/store'
import { useSelector } from 'react-redux'
import { IGainer } from '../../type'

const useStyles = createStyles((theme) => ({
  th: {
    padding: '0 !important',
  },

  control: {
    width: 'auto',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
  },

  icon: {
    width: rem(21),
    height: rem(21),
    borderRadius: rem(21),
  },
}))

interface ThProps {
  children?: React.ReactNode
  reversed?: boolean
  sorted?: boolean
  onSort(): void | undefined
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const { classes } = useStyles()
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart" spacing={5}>
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size="0.9rem" stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  )
}

function filterData(data: IGainer[], search: string) {
  const query = search.toLowerCase().trim()
  return data.filter((item) => keys(data[0]).some((key) => item[key].toLowerCase().includes(query)))
}

function sortData(
  data: IGainer[],
  payload: { sortBy: keyof IGainer | null; reversed: boolean; search: string },
) {
  const { sortBy } = payload

  if (!sortBy) {
    return filterData(data, payload.search)
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy])
      }

      return a[sortBy].localeCompare(b[sortBy])
    }),
    payload.search,
  )
}

export function TableGainers() {
  const [search, setSearch] = useState('')
  const { gainersEntriesData } = useSelector((state: RootState) => state.gainers)
  const [sortedData, setSortedData] = useState(gainersEntriesData)
  const [sortBy, setSortBy] = useState<keyof IGainer | null>(null)
  const [reverseSortDirection, setReverseSortDirection] = useState(false)
  const isMobile = useMediaQuery('(max-width: 30em)')
  const isLaptopS = useMediaQuery('(max-width: 75em)')

  const setSorting = (field: keyof IGainer) => {
    const reversed = field === sortBy ? !reverseSortDirection : false
    setReverseSortDirection(reversed)
    setSortBy(field)
    setSortedData(sortData(gainersEntriesData, { sortBy: field, reversed, search }))
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    setSearch(value)
    setSortedData(
      sortData(gainersEntriesData, { sortBy, reversed: reverseSortDirection, search: value }),
    )
  }

  const rows =
    sortedData &&
    sortedData.map((row) =>
      isMobile ? (
        <tr key={row.gainerUuid}>
          <td>
            <Flex direction={'column'}>
              <Group position="apart">
                <Stack spacing={0}>
                  <b>{row.nameGainer}</b>
                  <Group>
                    <Text>Id beneficiar:</Text> {row.gainerUuid}
                  </Group>
                </Stack>

                <ButtonsAction gainerUuid={row.gainerUuid} />
              </Group>
              <Group>
                <Text fw={500}>Gen:</Text> {row.gender}
              </Group>
              <Group>
                <Text>Data nașterii:</Text>
                {moment(row.dateOfBirth).format('L')}
              </Group>

              <Group>
                <Text>Nr. telefon:</Text>
                {row.phoneNumberGainer}
              </Group>
              <Group>
                <Text>Adresă:</Text>
                {row.adress},{row.cityGainer}
              </Group>
            </Flex>
            <Stack spacing={0} my={5}>
              <Text>Descriere:</Text>
              <Text lineClamp={2}>{row.description}</Text>
            </Stack>

            <Group>
              <Text>Tipul de ajutor:</Text>
              {row.nameHelpType}
            </Group>
          </td>
        </tr>
      ) : isLaptopS ? (
        <tr key={row.gainerUuid}>
          <td>{row.gainerUuid}</td>
          <td>
            <Flex direction={'column'}>
              <b>{row.nameGainer}</b>
              <Text>{moment(row.dateOfBirth).format('L')}</Text>
              <Text>{row.gender}</Text>
              <Text>{row.phoneNumberGainer}</Text>
            </Flex>
          </td>
          <td>
            {row.adress},{row.cityGainer}
          </td>

          <td>
            <Text lineClamp={2}>{row.description}</Text>
          </td>
          <td>{row.nameHelpType}</td>
          <td>
            <ButtonsAction gainerUuid={row.gainerUuid} />
          </td>
        </tr>
      ) : (
        <tr key={row.gainerUuid}>
          <td>{row.gainerUuid}</td>
          <td>{row.nameGainer}</td>
          <td>{moment(row.dateOfBirth).format('L')}</td>
          <td width={'2rem'}>{row.gender}</td>
          <td>{row.phoneNumberGainer}</td>
          <td>
            {row.adress},{row.cityGainer}
          </td>
          <td>
            <Text lineClamp={2}>{row.description}</Text>
          </td>
          <td>{row.nameHelpType}</td>
          <td>
            <ButtonsAction gainerUuid={row.gainerUuid} />
          </td>
        </tr>
      ),
    )

  return (
    <>
      <TextInput
        w="100%"
        placeholder="Căutare în tabelă "
        radius={'md'}
        mt={15}
        px={20}
        icon={<IconSearch size="0.9rem" stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
      />
      <ScrollArea px={20}>
        <Table
          horizontalSpacing="md"
          sx={{ tableLayout: 'fixed' }}
          width="max-content"
          highlightOnHover
        >
          <thead>
            {isMobile ? (
              <tr>
                <Th
                  sorted={sortBy === 'nameGainer'}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting('nameGainer')}
                >
                  Beneficiar
                </Th>
              </tr>
            ) : isLaptopS ? (
              <tr>
                <th style={{ fontWeight: 500, color: 'black', width: '4rem' }}>Id </th>
                <Th
                  sorted={sortBy === 'nameGainer'}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting('nameGainer')}
                >
                  Beneficiar
                </Th>

                <Th
                  sorted={sortBy === 'cityGainer'}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting('cityGainer')}
                >
                  Adresă
                </Th>
                <th style={{ fontWeight: 500, color: 'black' }}>Descriere</th>
                <Th
                  sorted={sortBy === 'nameHelpType'}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting('nameHelpType')}
                >
                  Tip ajutor
                </Th>
                <th style={{ fontWeight: 500, color: 'black' }}>Acțiuni</th>
              </tr>
            ) : (
              <tr>
                <th style={{ fontWeight: 500, color: 'black', width: '4rem' }}>Id </th>
                <Th
                  sorted={sortBy === 'nameGainer'}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting('nameGainer')}
                >
                  Nume
                </Th>
                <Th
                  sorted={sortBy === 'dateOfBirth'}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting('dateOfBirth')}
                >
                  Data nașterii
                </Th>
                <th style={{ fontWeight: 500, color: 'black', width: '5rem' }}>Gen</th>
                <th style={{ fontWeight: 500, color: 'black' }}>Nr. de telefon</th>

                <Th
                  sorted={sortBy === 'cityGainer'}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting('cityGainer')}
                >
                  Adresă
                </Th>
                <th style={{ fontWeight: 500, color: 'black' }}>Descriere</th>
                <Th
                  sorted={sortBy === 'nameHelpType'}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting('nameHelpType')}
                >
                  Tip ajutor
                </Th>
                <th style={{ fontWeight: 500, color: 'black' }}>Acțiuni</th>
              </tr>
            )}
          </thead>
          <tbody>
            {rows ? (
              rows
            ) : (
              <tr>
                <Text weight={500} align="center" w={'80vw'} m="md">
                  Nu s-a găsit nimic
                </Text>
              </tr>
            )}
          </tbody>
        </Table>
      </ScrollArea>
    </>
  )
}
