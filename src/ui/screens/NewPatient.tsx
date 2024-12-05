import {
  Button,
  Collapse,
  InputBase,
  SegmentedControl,
  type SegmentedControlItem,
  Stack,
  TextInput,
  Textarea,
} from '@mantine/core'
import { DateInput, type DateValue } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { type ComponentRef, useRef } from 'react'
import { IMaskInput } from 'react-imask'
import { LoadingOverlay } from '../components/LoadingOverlay'
import { PageView } from '../components/PageView'
import patterns from '../helpers/patterns'

interface Fields {
  patientType: string
  fullName: string
  birthdate: DateValue
  gender: string
  phone: string
  address: string
  entryDate: DateValue
}

const patientTypes: SegmentedControlItem[] = [
  { label: 'New patient', value: 'new' },
  { label: 'Old patient', value: 'old' },
]

const gender: SegmentedControlItem[] = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
]

export default function NewPatient() {
  console.log('NewPatient')

  const form = useForm<Fields>({
    mode: 'uncontrolled',
    initialValues: {
      patientType: 'new',
      fullName: '',
      birthdate: null,
      gender: 'male',
      phone: '',
      address: '',
      entryDate: null,
    },
    validate: {
      fullName: (value) =>
        value.length < 2 ? 'Full name must have at least 2 letters.' : null,
      phone: (value) => (patterns.phone.test(value) ? null : 'Invalid format.'),
    },
  })
  const loadingOverlayRef = useRef<ComponentRef<typeof LoadingOverlay>>(null)

  const handleSubmit = async (values: Fields) => {
    loadingOverlayRef.current?.show()
    console.log(values)
  }

  return (
    <PageView title="Add patient" backTo="/">
      <LoadingOverlay ref={loadingOverlayRef} />
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <SegmentedControl
            data={patientTypes}
            key={form.key('patientType')}
            {...form.getInputProps('patientType')}
          />
          <Collapse in={form.getValues().patientType === 'old'}>
            <DateInput
              label="Date of entry"
              placeholder="Pick a date"
              required={form.getValues().patientType === 'old'}
              maxDate={new Date()}
              key={form.key('entryDate')}
              {...form.getInputProps('entryDate')}
            />
          </Collapse>
          <TextInput
            label="Full name"
            key={form.key('fullName')}
            required
            {...form.getInputProps('fullName')}
          />
          <DateInput
            label="Birthdate"
            placeholder="Pick a date"
            maxDate={new Date()}
            key={form.key('birthdate')}
            required
            {...form.getInputProps('birthdate')}
          />
          <SegmentedControl
            data={gender}
            key={form.key('gender')}
            {...form.getInputProps('gender')}
          />
          <InputBase
            component={IMaskInput}
            label="Phone"
            placeholder="0912 345 6789"
            key={form.key('phone')}
            mask="0000 000 0000"
            required
            {...form.getInputProps('phone')}
          />
          <Textarea
            label="Address"
            autosize
            maxRows={3}
            maxLength={200}
            required
            key={form.key('address')}
            {...form.getInputProps('address')}
          />
          <Button type="submit" mt="md">
            Create record
          </Button>
        </Stack>
      </form>
    </PageView>
  )
}
