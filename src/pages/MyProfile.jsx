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
import { useFormik } from "formik"
import { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { axiosInstance } from "../api"
import Post from "../components/Post"
import { login } from "../redux/features/authSlice"

const MyProfile = () => {
  const [posts, setPosts] = useState([])
  const [editMode, setEditMode] = useState(false)

  const authSelector = useSelector((state) => state.auth)
  const dispatch = useDispatch()

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

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      profile_picture: null,
    },
    onSubmit: async ({ username, email, profile_picture }) => {
      try {
        const userData = new FormData()

        if (username && username !== authSelector.username) {
          userData.append("username", username)
        }

        if (email && email !== authSelector.email) {
          userData.append("email", email)
        }

        if (profile_picture) {
          userData.append("profile_picture", profile_picture)
        }

        const userResponse = await axiosInstance.patch("/auth/me", userData)

        dispatch(login(userResponse.data.data))
        setEditMode(false)
        toast({ title: "Profile edited" })
      } catch (err) {
        console.log(err)
        toast({
          title: "Failed edit",
          status: "error",
          description: err.response.data.message,
        })
      }
    },
  })

  const formChangeHandler = ({ target }) => {
    const { name, value } = target

    formik.setFieldValue(name, value)
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
            src={authSelector.profile_picture_url}
          />
          {editMode ? (
            <Stack>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                  onChange={formChangeHandler}
                  name="username"
                  defaultValue={authSelector.username}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  onChange={formChangeHandler}
                  name="email"
                  defaultValue={authSelector.email}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Profile Picture</FormLabel>
                <Input
                  accept="image/*"
                  type="file"
                  onChange={(event) =>
                    formik.setFieldValue(
                      "profile_picture",
                      event.target.files[0]
                    )
                  }
                  name="profile_picture"
                />
              </FormControl>
            </Stack>
          ) : (
            <Stack spacing="0.5">
              <Text fontSize="2xl" fontWeight="semibold">
                {authSelector.username}
              </Text>
              <Text fontSize="lg">{authSelector.email}</Text>
              <Text fontSize="lg" fontWeight="light">
                {authSelector.role}
              </Text>
            </Stack>
          )}
        </HStack>

        {editMode ? (
          <Button
            mt="8"
            width="100%"
            colorScheme="green"
            onClick={formik.handleSubmit}
          >
            Save
          </Button>
        ) : (
          <Button mt="8" width="100%" onClick={() => setEditMode(true)}>
            Edit Profile
          </Button>
        )}
      </Box>

      {/* <Stack>{renderPosts()}</Stack> */}
    </Container>
  )
}

export default MyProfile

