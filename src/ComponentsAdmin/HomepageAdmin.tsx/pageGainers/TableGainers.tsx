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
  Checkbox,
} from '@mantine/core'
import { keys } from '@mantine/utils'
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons-react'

const useStyles = createStyles((theme) => ({
  th: {
    padding: '0 !important',
  },

  control: {
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  icon: {
    width: rem(21),
    height: rem(21),
    borderRadius: rem(21),
  },
  rowSelected: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
}))

interface RowData {
  name: string
  description: string
  city: string
  adress: string
  numberPhone: string
  gender: string
  dateOfBirth: string
  nameHelpType: string
  helpTypeUuid: string
  gainerUuid: string
  listOfDates: string
}

interface TableSortProps {
  data: RowData[]
}

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
        <Group position="apart">
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

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim()
  return data.filter((item) => keys(data[0]).some((key) => item[key].toLowerCase().includes(query)))
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string },
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

export function TableGainers({ data }: TableSortProps) {
  const [search, setSearch] = useState('')
  const [sortedData, setSortedData] = useState(data)
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null)
  const [reverseSortDirection, setReverseSortDirection] = useState(false)

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false
    setReverseSortDirection(reversed)
    setSortBy(field)
    setSortedData(sortData(data, { sortBy: field, reversed, search }))
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    setSearch(value)
    setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }))
  }

  const [selection, setSelection] = useState(['1'])
  const toggleRow = (id: string) =>
    setSelection((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
  const toggleAll = () =>
    setSelection((current) =>
      current.length === data.length ? [] : data.map((item) => item.dateOfBirth),
    )
  // const selected = selection.includes(item.dateOfBirth)
  const rows =
    sortedData &&
    sortedData.map((row) => (
      <tr key={row.gainerUuid}>
        <td>
          <Checkbox
            checked={selection.includes(row.gainerUuid)}
            onChange={() => toggleRow(row.gainerUuid)}
            transitionDuration={0}
          />
        </td>
        <td>{row.name}</td>
        <td>{row.description}</td>
        <td>{row.nameHelpType}</td>
        <td>{row.city}</td>
        <td>{row.adress}</td>
        <td>{row.numberPhone}</td>
        <td>{row.dateOfBirth}</td>
        <td>{row.gender}</td>
      </tr>
    ))

  return (
    <>
      <TextInput
        placeholder="Cauare în tabelă"
        mt={15}
        px={20}
        icon={<IconSearch size="0.9rem" stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
      />
      <ScrollArea px={20} h={'85%'}>
        <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} sx={{ tableLayout: 'fixed' }}>
          <thead>
            <tr>
              <th style={{ width: rem(40) }}>
                <Checkbox
                  onChange={toggleAll}
                  checked={data && selection.length === data.length}
                  indeterminate={data && selection.length > 0 && selection.length !== data.length}
                  transitionDuration={0}
                />
              </th>
              <Th
                sorted={sortBy === 'name'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('name')}
              >
                Nume
              </Th>
              <th style={{ fontWeight: 500, color: 'black' }}>Descriere</th>
              <Th
                sorted={sortBy === 'nameHelpType'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('nameHelpType')}
              >
                Tip ajutor
              </Th>
              <Th
                sorted={sortBy === 'city'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('city')}
              >
                Oraș
              </Th>
              <Th
                sorted={sortBy === 'adress'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('adress')}
              >
                Adresă
              </Th>
              <th style={{ fontWeight: 500, color: 'black' }}>Nr de telefon</th>
              <Th
                sorted={sortBy === 'dateOfBirth'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('dateOfBirth')}
              >
                Data nașterii
              </Th>
              <th style={{ fontWeight: 500, color: 'black' }}>Gen</th>
            </tr>
          </thead>
          <tbody>
            {rows && rows.length > 0 ? (
              rows
            ) : (
              <tr>
                <td colSpan={data && Object.keys(data[0]).length}>
                  <Text weight={500} align="center">
                    Nu s-a găsit nimic
                  </Text>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </ScrollArea>
    </>
  )
}
