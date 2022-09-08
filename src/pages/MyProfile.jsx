import { Avatar, Box, Container, HStack, Stack, Text } from "@chakra-ui/react"
import { useSelector } from "react-redux"

const ProfilePage = () => {
  const authSelector = useSelector((state) => state.auth)

  return (
    <Container maxW="container.md" py="4" pb="10">
      <Box borderColor="gray.300" borderWidth="1px" p="6" borderRadius="8px">
        <HStack spacing="6">
          <Avatar
            size="2xl"
            name={authSelector.username}
            // src="https://bit.ly/dan-abramov"
          />

          <Stack spacing="0.5">
            <Text fontSize="2xl" fontWeight="semibold">
              {authSelector.username}
            </Text>
            <Text fontSize="lg">{authSelector.email}</Text>
            <Text fontSize="lg" fontWeight="light">
              {authSelector.role}
            </Text>
          </Stack>
        </HStack>
      </Box>
    </Container>
  )
}

export default ProfilePage

