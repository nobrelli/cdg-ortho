import { Button, Group, Stack, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { PageView } from '../components/PageView'

interface Fields {
  dataFolder: string
}

export default function Settings() {
  const form = useForm<Fields>({
    initialValues: {
      dataFolder: '',
    },
  })

  const handleFolderSelection = async () => {
    // @ts-ignore
    const folderPath = await window.electron.openFolderSelectorDialog()
    form.setFieldValue('dataFolder', folderPath)
  }

  return (
    <PageView title="Settings">
      <form>
        <Stack>
          <Group align="flex-end">
            <TextInput
              label="Data folder location"
              description="This is where all patient data is stored."
              placeholder="Click 'Select'"
              readOnly
              flex={1}
              key={form.key('dataFolder')}
              {...form.getInputProps('dataFolder')}
            />
            <Button onClick={handleFolderSelection}>Select</Button>
          </Group>
          <Button mt="md">Save</Button>
        </Stack>
      </form>
    </PageView>
  )
}
