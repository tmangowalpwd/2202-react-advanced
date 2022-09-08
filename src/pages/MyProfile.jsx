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
  useToast,
} from "@chakra-ui/react"
import { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { axiosInstance } from "../api"
import Post from "../components/Post"

const MyProfile = () => {
  const [posts, setPosts] = useState([])

  const authSelector = useSelector((state) => state.auth)

  const toast = useToast()

  const fetchPosts = async () => {
    try {
      const response = await axiosInstance.get("/posts", {
        params: {
          userId: authSelector.id,
          _expand: "user",
        },
      })

      setPosts(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  const deleteBtnHandler = async (id) => {
    try {
      await axiosInstance.delete(`/posts/${id}`)

      fetchPosts()
      toast({ title: "Post deleted", status: "info" })
    } catch (err) {
      console.log(err)
    }
  }

  const renderPosts = () => {
    return posts.map((val) => {
      return (
        <Post
          key={val.id.toString()}
          username={val.user.username}
          body={val.body}
          imageUrl={val.image_url}
          userId={val.userId}
          onDelete={() => deleteBtnHandler(val.id)}
          postId={val.id}
        />
      )
    })
  }

  useEffect(() => {
    fetchPosts()
  }, [])

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

      <Stack>{renderPosts()}</Stack>
    </Container>
  )
}

export default MyProfile

