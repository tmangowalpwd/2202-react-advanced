import {
  Avatar,
  Box,
  Center,
  Container,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useParams, Navigate } from "react-router-dom"
import { axiosInstance } from "../api"

const ProfilePage = () => {
  const authSelector = useSelector((state) => state.auth)
  const [user, setUser] = useState({})

  const params = useParams()

  const fetchUserProfile = async () => {
    try {
      const response = await axiosInstance.get("/users", {
        params: {
          username: params.username,
        },
      })

      setUser(response.data[0])
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchUserProfile()
  }, [])

  if (params.username === authSelector.username) {
    return <Navigate replace to="/me" />
  }

  return (
    <Container maxW="container.md" py="4" pb="10">
      <Box borderColor="gray.300" borderWidth="1px" p="6" borderRadius="8px">
        <HStack spacing="6">
          <Avatar
            size="2xl"
            name={user.username}
            // src="https://bit.ly/dan-abramov"
          />

          <Stack spacing="0.5">
            <Text fontSize="2xl" fontWeight="semibold">
              {user.username}
            </Text>
            <Text fontSize="lg">{user.email}</Text>
            <Text fontSize="lg" fontWeight="light">
              {user.role}
            </Text>
          </Stack>
        </HStack>
      </Box>
    </Container>
  )
}

export default ProfilePage

