import {
  Avatar,
  Box,
  Container,
  HStack,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useParams, Navigate } from "react-router-dom"
import { axiosInstance } from "../api"
import Post from "../components/Post"

const ProfilePage = () => {
  const authSelector = useSelector((state) => state.auth)

  const [user, setUser] = useState({})
  const [posts, setPosts] = useState([])

  const params = useParams()

  const toast = useToast()

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

  const fetchPosts = async () => {
    try {
      const response = await axiosInstance.get("/posts", {
        params: {
          userId: user.id,
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
    fetchUserProfile()
  }, [])

  useEffect(() => {
    if (user.id) {
      fetchPosts()
    }
  }, [user.id])

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
      <Stack>{renderPosts()}</Stack>
    </Container>
  )
}

export default ProfilePage

