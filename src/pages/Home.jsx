import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react"
import { useFormik } from "formik"
import { useSelector } from "react-redux"
import { axiosInstance } from "../api"

const HomePage = () => {
  const authSelector = useSelector((state) => state.auth)

  const toast = useToast()

  const formik = useFormik({
    initialValues: {
      body: "",
      image_url: "",
    },
    onSubmit: async (values) => {
      try {
        let newPost = {
          body: values.body,
          image_url: values.image_url,
          userId: authSelector.id,
        }

        await axiosInstance.post("/posts", newPost)

        formik.setFieldValue("body", "")
        formik.setFieldValue("image_url", "")

        toast({
          position: "top-right",
          title: "Post uploaded",
          status: "success",
        })
      } catch (err) {
        console.log(err)
      }
    },
  })

  const inputChangeHandler = ({ target }) => {
    const { name, value } = target

    formik.setFieldValue(name, value)
  }

  return (
    <Container maxW="container.md" py="4">
      <Heading>Home Page</Heading>
      <Stack mt="4">
        <Textarea
          placeholder="Insert your caption here"
          value={formik.values.body}
          onChange={inputChangeHandler}
          name="body"
        />
        <HStack>
          <Input
            value={formik.values.image_url}
            onChange={inputChangeHandler}
            name="image_url"
            placeholder="Insert image URL"
          />
          <Button
            onClick={formik.handleSubmit}
            isDisabled={formik.isSubmitting}
            colorScheme="twitter"
          >
            Post
          </Button>
        </HStack>
      </Stack>
    </Container>
  )
}

export default HomePage

