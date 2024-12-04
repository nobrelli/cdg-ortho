import { ActionIcon, Button, Collapse, Flex, Group, InputBase, SegmentedControl, Stack, Textarea, TextInput, Title, type SegmentedControlItem } from "@mantine/core";
import { DateInput, type DateValue } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconChevronLeft } from "@tabler/icons-react";
import { IMaskInput } from 'react-imask';
import { Link } from "react-router";
import patterns from "../helpers/patterns";

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
    { label: 'Old patient', value: 'old' }
]

const gender: SegmentedControlItem[] = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' }
]

export default function NewPatient() {
    const form = useForm<Fields>({
        mode: 'uncontrolled',
        initialValues: {
            patientType: 'new',
            fullName: '',
            birthdate: null,
            gender: 'male',
            phone: '',
            address: '',
            entryDate: null
        },
        validate: {
            fullName: value => value.length < 2 ? 'Full name must have at least 2 letters.' : null,
            phone: value => patterns.phone.test(value) ? null : 'Invalid format.'
        }
    })

    return (
        <Flex
            direction="column"
            align="center"
            gap="xl"
            py="xl"
        >
            <Group w={500} gap="xl">
                <ActionIcon component={Link} to="/">
                    <IconChevronLeft />
                </ActionIcon>
                <Title order={2}>Add Patient</Title>
            </Group>
            <form onSubmit={form.onSubmit(console.log)}>
                <Stack w={500}>
                    <SegmentedControl
                        data={patientTypes}
                        key={form.key('patientType')}
                        {...form.getInputProps('patientType')}
                    />
                    <Collapse in={form.getValues().patientType === 'old'}>
                        <DateInput
                            label="Date of entry"
                            placeholder="Pick a date"
                            required
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
                        key={form.key("address")}
                        {...form.getInputProps('address')}
                    />
                    <Button type="submit">Create record</Button>
                </Stack>
            </form>
        </Flex>
    )
}