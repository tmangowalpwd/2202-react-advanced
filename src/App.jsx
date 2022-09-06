import { Box, Button, HStack, Text } from "@chakra-ui/react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Routes, Route } from "react-router-dom"
import { axiosInstance } from "./api"
import HomePage from "./pages/Home"
import LoginPage from "./pages/Login"
import RegisterPage from "./pages/Register"
import { login, logout } from "./redux/features/authSlice"

const App = () => {
  const authSelector = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const keepUserLoggedIn = async () => {
    try {
      const auth_id = localStorage.getItem("auth_data")

      if (!auth_id) {
        return
      }

      const response = await axiosInstance.get(`/users/${auth_id}`)

      dispatch(login(response.data))
    } catch (err) {
      console.log(err)
    }
  }

  const logoutBtnHandler = () => {
    localStorage.removeItem("auth_data")
    dispatch(logout())
  }

  useEffect(() => {
    keepUserLoggedIn()
  }, [])

  return (
    <Box>
      <Box backgroundColor="teal" color="white" px="8" py="4">
        <HStack justifyContent="space-between">
          <Text fontSize="4xl" fontWeight="bold">
            Hello {authSelector.username}
          </Text>
          <Box>
            <Button onClick={logoutBtnHandler} colorScheme="red">
              Logout
            </Button>
          </Box>
        </HStack>
      </Box>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Box>
  )
}

export default App

