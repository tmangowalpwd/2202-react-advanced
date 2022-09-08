import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react"
import { useSelector } from "react-redux"

const MyProfile = () => {
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

          {/* <Stack spacing="0.5">
            <Text fontSize="2xl" fontWeight="semibold">
              {authSelector.username}
            </Text>
            <Text fontSize="lg">{authSelector.email}</Text>
            <Text fontSize="lg" fontWeight="light">
              {authSelector.role}
            </Text>
          </Stack> */}

          <Stack>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input defaultValue={authSelector.username} />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input defaultValue={authSelector.email} />
            </FormControl>
            <FormControl>
              <FormLabel>Profile Picture</FormLabel>
              <Input defaultValue={authSelector.username} />
            </FormControl>
          </Stack>
        </HStack>
        <Button mt="8" width="100%" colorScheme="green">
          Save
        </Button>
        {/* <Button mt="8" width="100%">
          Edit Profile
        </Button> */}
      </Box>
    </Container>
  )
}

export default MyProfile

