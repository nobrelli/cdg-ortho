import { Button, Flex, Image, SimpleGrid } from "@mantine/core"
import { Link } from "react-router"
import logo from '../assets/cdg-logo.svg'
import { IconUserPlus, IconUsers } from '@tabler/icons-react'

export default function Index() {
    return (
        <Flex
            direction="column"
            align="center"
            justify="center"
            gap="xl"
            h="100vh"
        >
            <Image src={logo} w={100} />
            <SimpleGrid cols={1}>
                <Button component={Link} size="xl" to="/new" leftSection={<IconUserPlus />}>Add patient</Button>
                <Button component={Link} size="xl" to="/new" leftSection={<IconUsers />}>View patients</Button>
            </SimpleGrid>
        </Flex>
    )
}