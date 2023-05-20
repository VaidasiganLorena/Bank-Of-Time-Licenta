import {
  Button,
  Group,
  Modal,
  TextInput,
  Flex,
  Textarea,
  Select,
  FileInput,
  rem,
  Image,
  Avatar,
  Box,
  Center,
} from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { IconCalendar, IconUpload } from '@tabler/icons-react'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { useGetInfoGainers } from '../../api/gainer/useGetGainers'
import { usePostGainer } from '../../api/gainer/usePostGainer'
import { useUpdateInfoGainer } from '../../api/gainer/useUpdateGainer'
import { cities } from '../../aseert/city'
import { IGainerUpdate } from '../../type'
import { base64ToFile, convertBase64, InitialValueDataGainers, ValidateForm } from './UtilsForm'

export const FormGainersData: FunctionComponent<{
  isOpenModal: boolean
  setOpenModal?: React.Dispatch<React.SetStateAction<boolean>>
  isModEdit: boolean
  dataGainer?: IGainerUpdate
  gainerUuid?: string
}> = (props) => {
  const { isOpenModal, setOpenModal, isModEdit, dataGainer } = props
  const succesCallBackGetGainers = () => {}
  const { refetch } = useGetInfoGainers(succesCallBackGetGainers)

  const listConverted: Date[] = []
  const dataOfListConverted = dataGainer ? dataGainer.listOfDates.split(',') : []

  const formGainerData = useForm<IGainerUpdate>({
    initialValues:
      isModEdit && dataGainer
        ? {
            nameGainer: dataGainer.nameGainer,
            dateOfBirth: dataGainer.dateOfBirth,
            phoneNumberGainer: dataGainer.phoneNumberGainer,
            adress: dataGainer.adress,
            cityGainer: dataGainer.cityGainer,
            gender: dataGainer.gender,
            photoGainer: dataGainer.photoGainer,
            listOfDates: dataGainer.listOfDates,
            description: dataGainer.description,
            helpTypeUuid: dataGainer.helpTypeUuid,
            gainerUuid: dataGainer.gainerUuid,
          }
        : InitialValueDataGainers,
    validate: ValidateForm,
  })
  const [dates, setDates] = useState<Date[]>(listConverted)
  useEffect(() => {
    if (dataGainer && isModEdit) formGainerData.setValues(dataGainer)
    dataOfListConverted.map((dateConverted) => listConverted.push(new Date(dateConverted)))
    if (dates.length === 0) {
      setDates(listConverted)
    }
  }, [dataGainer, isModEdit])

  useEffect(() => {}, [dates])
  const onCloseModal = () => {
    setOpenModal && setOpenModal(false)
    formGainerData.reset()
    formGainerData.clearErrors()
    refetch()
  }

  const successCallBack = () => {
    onCloseModal()
  }
  const errorCallBack = () => {}
  const { mutate } = usePostGainer(successCallBack, errorCallBack)
  const { mutate: mutateUpdate } = useUpdateInfoGainer(successCallBack, dataGainer?.gainerUuid)

  const onCreateGainer = () => {
    if (formGainerData.isValid()) {
      mutate({
        nameGainer: formGainerData.values.nameGainer,
        dateOfBirth: formGainerData.values.dateOfBirth,
        phoneNumberGainer: formGainerData.values.phoneNumberGainer,
        adress: formGainerData.values.adress,
        cityGainer: formGainerData.values.cityGainer,
        gender: formGainerData.values.gender,
        photoGainer: formGainerData.values.photoGainer,
        listOfDates: String(dates),
        description: formGainerData.values.description,
        helpTypeUuid: formGainerData.values.helpTypeUuid,
        gainerUuid: formGainerData.values.gainerUuid,
      })
      onCloseModal()
      formGainerData.clearErrors()
      refetch()
    }
    console.log(formGainerData.errors)
  }
  const onUpdateGainer = () => {
    if (formGainerData.isValid()) {
      mutateUpdate({
        nameGainer: formGainerData.values.nameGainer,
        dateOfBirth: formGainerData.values.dateOfBirth,
        phoneNumberGainer: formGainerData.values.phoneNumberGainer,
        adress: formGainerData.values.adress,
        cityGainer: formGainerData.values.cityGainer,
        gender: formGainerData.values.gender,
        photoGainer: formGainerData.values.photoGainer,
        listOfDates: String(dates),
        description: formGainerData.values.description,
        helpTypeUuid: formGainerData.values.helpTypeUuid,
        gainerUuid: formGainerData.values.gainerUuid,
      })
      onCloseModal()
      formGainerData.clearErrors()
      refetch()
    }
  }

  const onUploadFile = (event: File | null) => {
    convertBase64(event)
      .then((e: any) => {
        formGainerData.setFieldValue('photoGainer', e)
      })
      .catch((err) => console.log('Eroare incarcare fisier', err))
  }

  return (
    <Modal
      //size={isMobile ? 'calc(100vw - 5vw)' : isLaptopS ? '65%' : '45%'}
      opened={isOpenModal}
      onClose={() => onCloseModal()}
      title={isModEdit ? 'Editare date beneficiar' : 'Adăugare beneficiar'}
      centered
      xOffset={0}
      zIndex={2000}
      styles={{ header: { zIndex: 20 } }}
    >
      <form onSubmit={formGainerData.onSubmit(() => {})}>
        <Flex direction={'column'} gap="md">
          <Center w={'100%'}>
            <Avatar radius={'xl'} h={'10rem'} w={'10rem'} src={formGainerData.values.photoGainer} />
          </Center>
          <TextInput
            label="Nume și prenume"
            placeholder="Introduceți numele și prenumele noului beneficiar"
            variant="filled"
            size="md"
            radius={10}
            {...formGainerData.getInputProps('nameGainer')}
          />
          <Textarea
            label="Descriere"
            placeholder="Introduceți câteva detalii despre noul beneficiar.."
            variant="filled"
            size="md"
            autosize
            minRows={2}
            maxRows={4}
            radius={10}
            {...formGainerData.getInputProps('description')}
          />

          <TextInput
            type={'date'}
            placeholder="Alegeți data nașterii a beneficiarului"
            label="Data nașterii"
            variant="filled"
            size="md"
            radius={10}
            {...formGainerData.getInputProps('dateOfBirth')}
          />

          <FileInput
            label="Fotografie"
            placeholder="Încarcă fotografie cu beneficiarul"
            accept="image/png,image/jpeg"
            variant="filled"
            size="md"
            icon={<IconUpload size={rem(14)} />}
            defaultValue={
              dataGainer &&
              base64ToFile(
                dataGainer.photoGainer,
                dataGainer?.nameGainer.replace(' ', '').concat('.jpeg'),
              )
            }
            radius={10}
            onChange={(e) => onUploadFile(e)}
          />
          <Select
            data={['Feminin', 'Masculin', 'Altul']}
            label="Gen"
            placeholder="Alege genul"
            variant="filled"
            size="md"
            radius={10}
            {...formGainerData.getInputProps('gender')}
          />
          <TextInput
            label="Numărul de telefon"
            placeholder="Intruduceți numărul de telefon a beneficiarului"
            variant="filled"
            size="md"
            radius={10}
            {...formGainerData.getInputProps('phoneNumberGainer')}
          />
          <TextInput
            label="Adresa"
            placeholder="Introduceți adresa beneficiarului"
            variant="filled"
            size="md"
            radius={10}
            {...formGainerData.getInputProps('adress')}
          />
          <Select
            data={cities}
            label="Oraș"
            placeholder="Alegeți orașul"
            variant="filled"
            size="md"
            searchable
            radius={10}
            {...formGainerData.getInputProps('cityGainer')}
          />
          <DatePickerInput
            icon={<IconCalendar size="1.1rem" stroke={1.5} />}
            valueFormat="DD.MM.YYYY"
            variant="filled"
            size="md"
            radius={10}
            type="multiple"
            label="Lista de date"
            placeholder="Introduceți datele disponibile"
            value={dates}
            onChange={setDates}
          />
          {/* <MultiSelect
            label="Lista de date"
            data={listOfDates}
            defaultValue={listOfDates}
            placeholder="Introduceți datele disponibile"
            searchable
            creatable
            getCreateLabel={(query) => `+ Adaugă data de:  ${query}`}
            onCreate={(query) => {
              const item = { value: query, label: query }
              setListOfDates((oldArray: any) => [...oldArray, query])
              return item
            }}
          /> */}
          <Select
            data={[
              { value: '1', label: 'Curățenie' },
              { value: '2', label: 'Cumpăraturi' },
              { value: '3', label: 'Companie' },
              { value: '4', label: 'Îngrijire' },
            ]}
            label="Tipul de ajutor"
            placeholder="Alegeți tipul de ajutor "
            variant="filled"
            size="md"
            searchable
            radius={10}
            {...formGainerData.getInputProps('helpTypeUuid')}
          />
        </Flex>
        {isModEdit ? (
          <Group position="center" mt="md">
            <Button radius="xl" type="submit" onClick={onUpdateGainer}>
              Salvează
            </Button>
            <Button variant={'light'} radius="xl" onClick={onCloseModal}>
              Anulează
            </Button>
          </Group>
        ) : (
          <Group position="center" mt="md">
            <Button variant={'light'} radius="xl" type="submit" onClick={onCreateGainer}>
              Adaugă beneficiar
            </Button>
          </Group>
        )}
      </form>

      {/* <Notification
        radius={'lg'}
        color={'red'}
        title="A aparut o eroare"
        withCloseButton={false}
        icon={<IconX size="1.1rem" />}
      >
        {backendError}
      </Notification> */}
    </Modal>
  )
}
