import {
  ActionIcon,
  Button,
  Flex,
  Group,
  SimpleGrid,
  Title,
} from '@mantine/core'
import {
  IconChevronLeft,
  IconContract,
  IconDatabaseDollar,
  IconLibraryPhoto,
} from '@tabler/icons-react'
import { Link } from 'react-router'

export default function Profile() {
  return (
    <Flex direction="column" align="center" gap="xl">
      <Group w={500} gap="xl">
        <ActionIcon component={Link} to="/">
          <IconChevronLeft />
        </ActionIcon>
        <Title order={2}>Add Patient</Title>
      </Group>
      <SimpleGrid cols={1}>
        <Button
          component={Link}
          size="xl"
          to="/new"
          leftSection={<IconContract />}
        >
          Create contract
        </Button>
        <Button
          component={Link}
          size="xl"
          to="/new"
          leftSection={<IconDatabaseDollar />}
        >
          Transactions
        </Button>
        <Button
          component={Link}
          size="xl"
          to="/new"
          leftSection={<IconLibraryPhoto />}
        >
          Gallery
        </Button>
      </SimpleGrid>
    </Flex>
  )
}
